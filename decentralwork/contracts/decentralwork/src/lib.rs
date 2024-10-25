#![no_std]
use soroban_sdk::{
    contract, contractimpl, contracttype, contracterror,
    Address, BytesN, Env, Symbol, Vec,
};

#[derive(Clone, Debug, Eq, PartialEq)]
#[contracttype]
pub struct Job {
    pub id: BytesN<32>,
    pub client: Address,
    pub freelancer: Option<Address>,
    pub title: Symbol,
    pub description: Symbol,
    pub total_amount: u32,
    pub milestones: Vec<Milestone>,
    pub status: JobStatus,
    pub created_at: u64,
    pub domain: Symbol,
    pub dispute_id: Option<BytesN<32>>,
    pub deadline: u64,
}

#[derive(Clone, Debug, Eq, PartialEq)]
#[contracttype]
pub enum JobStatus {
    Open,
    InProgress,
    UnderDispute,
    Completed,
    Cancelled
}

#[derive(Clone, Debug, Eq, PartialEq)]
#[contracttype]
pub struct Milestone {
    pub id: BytesN<32>,
    pub amount: u32,
    pub description: Symbol,
    pub status: MilestoneStatus,
    pub deadline: u64,
    pub submission: Option<Symbol>,
}

#[derive(Clone, Debug, Eq, PartialEq)]
#[contracttype]
pub enum MilestoneStatus {
    Pending,
    InProgress,
    UnderReview,
    Completed,
    Disputed
}

#[derive(Clone, Debug, Eq, PartialEq)]
#[contracttype]
pub struct Dispute {
    pub id: BytesN<32>,
    pub job_id: BytesN<32>,
    pub initiator: Address,
    pub respondent: Address,
    pub reason: Symbol,
    pub evidence: Vec<Evidence>,
    pub arbitrators: Vec<Address>,
    pub votes: Vec<Vote>,
    pub status: DisputeStatus,
    pub created_at: u64,
    pub resolution_deadline: u64,
}

#[derive(Clone, Debug, Eq, PartialEq)]
#[contracttype]
pub struct Evidence {
    pub submitter: Address,
    pub description: Symbol,
    pub hash: BytesN<32>,
    pub timestamp: u64,
}

#[derive(Clone, Debug, Eq, PartialEq)]
#[contracttype]
pub struct Vote {
    pub arbitrator: Address,
    pub decision: VoteDecision,
    pub reason: Symbol,
    pub timestamp: u64,
}

#[derive(Clone, Debug, Eq, PartialEq)]
#[contracttype]
pub enum DisputeStatus {
    Opened,
    ArbitratorsAssigned,
    EvidenceGathering,
    Voting,
    Resolved,
    Cancelled
}

#[derive(Clone, Debug, Eq, PartialEq)]
#[contracttype]
pub enum VoteDecision {
    InFavorOfClient,
    InFavorOfFreelancer,
    Split
}

#[derive(Clone, Debug, Eq, PartialEq)]
#[contracttype]
pub struct UserProfile {
    pub address: Address,
    pub reputation_score: u32,
    pub completed_jobs: u32,
    pub reviews: Vec<Review>,
    pub skills: Vec<Symbol>,
    pub is_arbitrator: bool,
    pub arbitrator_stats: Option<ArbitratorStats>,
    pub joined_date: u64,
}

#[derive(Clone, Debug, Eq, PartialEq)]
#[contracttype]
pub struct Review {
    pub reviewer: Address,
    pub job_id: BytesN<32>,
    pub rating: u32,
    pub comment: Symbol,
    pub timestamp: u64,
}

#[derive(Clone, Debug, Eq, PartialEq)]
#[contracttype]
pub struct ArbitratorStats {
    pub cases_resolved: u32,
    pub successful_resolutions: u32,
    pub avg_resolution_time: u64,
    pub stake_amount: u32,
    pub domains: Vec<Symbol>,
}

#[contracterror]
#[derive(Copy, Clone, Debug, Eq, PartialEq)]
#[repr(u32)]
pub enum Error {
    JobNotFound = 1,
    JobAlreadyExists = 2,
    InvalidJobStatus = 3,
    UserNotFound = 4,
    UserAlreadyExists = 5,
    InsufficientReputation = 6,
    DisputeNotFound = 7,
    DisputeAlreadyExists = 8,
    NotEligibleArbitrator = 9,
    InsufficientFunds = 10,
    PaymentFailed = 11,
    Unauthorized = 12,
    NotJobOwner = 13,
    NotFreelancer = 14,
    InvalidAmount = 15,
    InvalidState = 16,
    OperationNotAllowed = 17,
}

#[derive(Clone)]
#[contracttype]
pub enum DataKey {
    Job(BytesN<32>),
    JobList,
    UserProfile(Address),
    Dispute(BytesN<32>),
    DisputeList,
    ArbitratorList,
    Config,
}

const MINIMUM_STAKE: u32 = 1000;  // Minimum XLM stake for arbitrators
const PLATFORM_FEE: u32 = 500;    // 5% platform fee (basis points)
const MIN_REPUTATION: u32 = 50;    // Minimum reputation to become arbitrator
const DISPUTE_TIMEOUT: u64 = 604800; // 7 days in seconds

#[contract]
pub struct DecentralWork;

#[contractimpl]
impl DecentralWork {
    // ==================== Job Management ====================

    /// Creates a new job listing
    pub fn create_job(
        env: Env,
        client: Address,
        title: Symbol,
        description: Symbol,
        total_amount: u32,
        milestones: Vec<Milestone>,
        domain: Symbol,
        deadline: u64,
    ) -> Result<BytesN<32>, Error> {
        // Verify authorization
        client.require_auth();

        // Validate inputs
        if total_amount == 0 || milestones.len() == 0 {
            return Err(Error::InvalidAmount);
        }

        // Generate unique job ID
        let job_id = Self::generate_id(&env);

        // Create job
        let job = Job {
            id: job_id.clone(),
            client: client.clone(),
            freelancer: None,
            title,
            description,
            total_amount,
            milestones,
            status: JobStatus::Open,
            created_at: env.ledger().timestamp(),
            domain,
            dispute_id: None,
            deadline,
        };

        // Store job
        env.storage().instance().set(&DataKey::Job(job_id.clone()), &job);

        // Update job list
        let mut job_list: Vec<BytesN<32>> = env
            .storage()
            .instance()
            .get(&DataKey::JobList)
            .unwrap_or(Vec::new(&env));
        job_list.push_back(job_id.clone());
        env.storage().instance().set(&DataKey::JobList, &job_list);

        // Extend storage TTL
        env.storage().instance().extend_ttl(100, 100);

        // Emit event
        env.events().publish(
            (Symbol::short("job_created"), job_id.clone()),
            job
        );

        Ok(job_id)
    }

    /// Allows a freelancer to accept a job
    pub fn accept_job(
        env: Env,
        freelancer: Address,
        job_id: BytesN<32>,
    ) -> Result<(), Error> {
        freelancer.require_auth();

        let mut job: Job = env
            .storage()
            .instance()
            .get(&DataKey::Job(job_id.clone()))
            .ok_or(Error::JobNotFound)?;

        // Validate job state
        if job.status != JobStatus::Open {
            return Err(Error::InvalidJobStatus);
        }

        // Update job
        job.freelancer = Some(freelancer.clone());
        job.status = JobStatus::InProgress;

        // Store updated job
        env.storage().instance().set(&DataKey::Job(job_id.clone()), &job);
        env.storage().instance().extend_ttl(100, 100);

        // Emit event
        env.events().publish(
            (Symbol::short("job_accepted"), job_id),
            (freelancer, job)
        );

        Ok(())
    }

    /// Submit milestone completion
    pub fn submit_milestone(
        env: Env,
        freelancer: Address,
        job_id: BytesN<32>,
        milestone_id: BytesN<32>,
        submission: Symbol,
    ) -> Result<(), Error> {
        freelancer.require_auth();

        let mut job: Job = env
            .storage()
            .instance()
            .get(&DataKey::Job(job_id.clone()))
            .ok_or(Error::JobNotFound)?;

        // Validate freelancer
        if job.freelancer != Some(freelancer.clone()) {
            return Err(Error::Unauthorized);
        }

        // Find and update milestone
        let mut milestone_found = false;
        for milestone in job.milestones.iter_mut() {
            if milestone.id == milestone_id {
                milestone.status = MilestoneStatus::UnderReview;
                milestone.submission = Some(submission.clone());
                milestone_found = true;
                break;
            }
        }

        if !milestone_found {
            return Err(Error::JobNotFound);
        }

        // Store updated job
        env.storage().instance().set(&DataKey::Job(job_id.clone()), &job);
        env.storage().instance().extend_ttl(100, 100);

        // Emit event
        env.events().publish(
            (Symbol::short("milestone_submitted"), milestone_id),
            (job_id, submission)
        );

        Ok(())
    }

    /// Approve milestone and release payment
    pub fn approve_milestone(
        env: Env,
        client: Address,
        job_id: BytesN<32>,
        milestone_id: BytesN<32>,
    ) -> Result<(), Error> {
        client.require_auth();

        let mut job: Job = env
            .storage()
            .instance()
            .get(&DataKey::Job(job_id.clone()))
            .ok_or(Error::JobNotFound)?;

        // Validate client
        if job.client != client {
            return Err(Error::Unauthorized);
        }

        // Find and update milestone
        let mut milestone_amount = 0;
        let mut all_completed = true;
        for milestone in job.milestones.iter_mut() {
            if milestone.id == milestone_id {
                if milestone.status != MilestoneStatus::UnderReview {
                    return Err(Error::InvalidState);
                }
                milestone.status = MilestoneStatus::Completed;
                milestone_amount = milestone.amount;
            }
            if milestone.status != MilestoneStatus::Completed {
                all_completed = false;
            }
        }

        // Release payment
        if milestone_amount > 0 {
            //moneygram or pay to wallet then moneygram here pls no time in train
        }

        // Update job status if all milestones completed
        if all_completed {
            job.status = JobStatus::Completed;
        }

        // Store updated job
        env.storage().instance().set(&DataKey::Job(job_id.clone()), &job);
        env.storage().instance().extend_ttl(100, 100);

        // Emit event
        env.events().publish(
            (Symbol::short("milestone_approved"), milestone_id),
            (job_id, milestone_amount)
        );

        Ok(())
    }

    // ==================== Dispute Management ====================

    /// Initiate a dispute
    pub fn initiate_dispute(
        env: Env,
        initiator: Address,
        job_id: BytesN<32>,
        reason: Symbol,
    ) -> Result<BytesN<32>, Error> {
        initiator.require_auth();

        let mut job: Job = env
            .storage()
            .instance()
            .get(&DataKey::Job(job_id.clone()))
            .ok_or(Error::JobNotFound)?;

        // Validate initiator is involved in job
        if initiator != job.client && Some(initiator.clone()) != job.freelancer {
            return Err(Error::Unauthorized);
        }

        // Ensure no existing dispute
        if job.dispute_id.is_some() {
            return Err(Error::DisputeAlreadyExists);
        }

        // Create dispute
        let dispute_id = Self::generate_id(&env);
        let dispute = Dispute {
            id: dispute_id.clone(),
            job_id: job_id.clone(),
            initiator: initiator.clone(),
            respondent: if initiator == job.client {
                job.freelancer.clone().unwrap()
            } else {
                job.client.clone()
            },
            reason,
            evidence: Vec::new(&env),
            arbitrators: Vec::new(&env),
            votes: Vec::new(&env),
            status: DisputeStatus::Opened,
            created_at: env.ledger().timestamp(),
            resolution_deadline: env.ledger().timestamp() + DISPUTE_TIMEOUT,
        };

        // Update job status
        job.status = JobStatus::UnderDispute;
        job.dispute_id = Some(dispute_id.clone());

        // Store dispute and updated job
        env.storage().instance().set(&DataKey::Dispute(dispute_id.clone()), &dispute);
        env.storage().instance().set(&DataKey::Job(job_id.clone()), &job);
        env.storage().instance().extend_ttl(100, 100);

        // Emit event
        env.events().publish(
            (Symbol::short("dispute_created"), dispute_id.clone()),
            dispute
        );

        Ok(dispute_id)
    }

    // ==================== User Management ====================

    /// Register a new user profile
    pub fn register_user(
        env: Env,
        address: Address,
    ) -> Result<(), Error> {
        address.require_auth();

        // Check if user already exists
        if env.storage().instance().has(&DataKey::UserProfile(address.clone())) {
            return Err(Error::UserAlreadyExists);
        }

        // Create new profile
        let profile = UserProfile {
            address: address.clone(),
            reputation_score: 100, // Starting reputation
            completed_jobs: 0,
            reviews: Vec::new(&env),
            skills: Vec::new(&env),
            is_arbitrator: false,
            arbitrator_stats: None,
            joined_date: env.ledger().timestamp(),
        };

        // Store profile
        env.storage().instance().set(&DataKey::UserProfile(address.clone()), &profile);
        env.storage().instance().extend_ttl(100, 100);

        // Emit event
        env.events().publish(
            (Symbol::short("user_registered"), address.clone()),
            profile
        );

        Ok(())
    }

    // ==================== Helper Functions ====================

    /// Generate a unique ID using env data
    fn generate_id(env: &Env) -> BytesN<32> {
        let mut seed = [0u8; 32];
        seed[0..8].copy_from_slice(&env.ledger().timestamp().to_be_bytes());
        seed[8..16].copy_from_slice(&env.ledger().sequence().to_be_bytes());
        let network_id = env.ledger().network_id().to_array();
        seed[16..32].copy_from_slice(&network_id[0..16]);

        let hash = env.crypto().sha256(&seed);
        BytesN::from_array(env, &hash.to_array())
    }
}

#[cfg(test)]
mod test;