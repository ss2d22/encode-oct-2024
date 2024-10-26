#![no_std]
use soroban_sdk::{
    contract, contractimpl, contracttype, contracterror,
    Address, BytesN,Bytes, Env, Symbol,symbol_short, Vec,
};

#[derive(Clone, Debug, Eq, PartialEq)]
#[contracttype]
pub struct Job {
    pub id: BytesN<32>,
    pub client: Address,
    pub freelancer: Address,
    pub title: Symbol,
    pub description: Symbol,
    pub total_amount: u32,
    pub milestones: Vec<Milestone>,
    pub status: JobStatus,
    pub created_at: u64,
    pub domain: Symbol,
    pub dispute_id: BytesN<32>,
    pub deadline: u64,
    pub has_freelancer: bool,
    pub has_dispute: bool,
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
    pub submission: Symbol,
    pub has_submission: bool,
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
    pub arbitrator_stats: ArbitratorStats,
    pub has_arbitrator_stats: bool,
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
// commented out for future features/ stuff i still didn't add
// const MINIMUM_STAKE: u32 = 100;  // Minimum XLM stake for arbitrators
// const PLATFORM_FEE: u32 = 500;    // 5% platform fee (basis points)
// const MIN_REPUTATION: u32 = 50;    // Minimum reputation to become arbitrator
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
        let empty_bytes = BytesN::from_array(&env, &[0; 32]);

        // Create job
        let job = Job {
            id: job_id.clone(),
            client: client.clone(),
           // freelancer: env.current_contract_address(),
            //use same for now for testing for initial
            freelancer: client.clone(),
            title,
            description,
            total_amount,
            milestones,
            status: JobStatus::Open,
            created_at: env.ledger().timestamp(),
            domain,
            dispute_id: empty_bytes,
            deadline,
            has_freelancer: false,
            has_dispute: false,
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
            (symbol_short!("job_new"), job_id.clone()),
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
        job.freelancer = freelancer.clone();
        job.has_freelancer = true;
        job.status = JobStatus::InProgress;

        // Store updated job
        env.storage().instance().set(&DataKey::Job(job_id.clone()), &job);
        env.storage().instance().extend_ttl(100, 100);

        // Emit event
        env.events().publish(
            (symbol_short!("accepted"), job_id),
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

        if !job.has_freelancer || job.freelancer != freelancer {
            return Err(Error::Unauthorized);
        }

        // Convert to vec to modify
        let mut milestones = job.milestones.clone();
        let mut found = false;
        let n = milestones.len();

        for i in 0..n {
            let mut milestone = milestones.get(i).unwrap();
            if milestone.id == milestone_id {
                milestone.status = MilestoneStatus::UnderReview;
                milestone.submission = submission.clone();
                milestone.has_submission = true;
                milestones.set(i, milestone);
                found = true;
                break;
            }
        }

        if !found {
            return Err(Error::JobNotFound);
        }

        job.milestones = milestones;
        env.storage().instance().set(&DataKey::Job(job_id.clone()), &job);
        env.storage().instance().extend_ttl(100, 100);

        env.events().publish(
            (symbol_short!("m_submit"), milestone_id),
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

        if job.client != client {
            return Err(Error::Unauthorized);
        }

        let mut milestones = job.milestones.clone();
        let mut milestone_amount = 0;
        let mut all_completed = true;
        let n = milestones.len();

        for i in 0..n {
            let milestone = milestones.get(i).unwrap();
            // Check if this is the milestone we're approving
            if milestone.id == milestone_id {
                if milestone.status != MilestoneStatus::UnderReview {
                    return Err(Error::InvalidState);
                }
                let mut updated_milestone = milestone.clone();
                updated_milestone.status = MilestoneStatus::Completed;
                milestone_amount = updated_milestone.amount;
                milestones.set(i, updated_milestone);
            }
            // Check completion status
            let status = milestones.get(i).unwrap().status;
            if status != MilestoneStatus::Completed {
                all_completed = false;
            }
        }

        job.milestones = milestones;

        if all_completed {
            job.status = JobStatus::Completed;
        }

        env.storage().instance().set(&DataKey::Job(job_id.clone()), &job);
        env.storage().instance().extend_ttl(100, 100);

        env.events().publish(
            (symbol_short!("m_done"), milestone_id),
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
        if initiator != job.client && (!job.has_freelancer || initiator != job.freelancer) {
            return Err(Error::Unauthorized);
        }

        // Ensure no existing dispute
        if job.has_dispute {
            return Err(Error::DisputeAlreadyExists);
        }

        // Create dispute
        let dispute_id = Self::generate_id(&env);
        let dispute = Dispute {
            id: dispute_id.clone(),
            job_id: job_id.clone(),
            initiator: initiator.clone(),
            respondent: if initiator == job.client {
                if !job.has_freelancer {
                    return Err(Error::InvalidState);
                }
                job.freelancer.clone()
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
        job.dispute_id = dispute_id.clone();
        job.has_dispute = true;

        // Store dispute and updated job
        env.storage().instance().set(&DataKey::Dispute(dispute_id.clone()), &dispute);
        env.storage().instance().set(&DataKey::Job(job_id.clone()), &job);
        env.storage().instance().extend_ttl(100, 100);

        // Emit event
        env.events().publish(
            (symbol_short!("dispute"), dispute_id.clone()),
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
        let empty_stats = ArbitratorStats {
            cases_resolved: 0,
            successful_resolutions: 0,
            avg_resolution_time: 0,
            stake_amount: 0,
            domains: Vec::new(&env),
        };

        let profile = UserProfile {
            address: address.clone(),
            reputation_score: 100,
            completed_jobs: 0,
            reviews: Vec::new(&env),
            skills: Vec::new(&env),
            is_arbitrator: false,
            arbitrator_stats: empty_stats,
            has_arbitrator_stats: false,
            joined_date: env.ledger().timestamp(),
        };

        // Store profile
        env.storage().instance().set(&DataKey::UserProfile(address.clone()), &profile);
        env.storage().instance().extend_ttl(100, 100);

        // Emit event
        env.events().publish(
            (symbol_short!("user_new"), address.clone()),
            profile
        );

        Ok(())
    }

    // ==================== Helper Functions ====================

    /// Generate a unique ID using env data
    fn generate_id(env: &Env) -> BytesN<32> {
        let mut seed = [0u8; 32];
        let timestamp = env.ledger().timestamp();
        let sequence = env.ledger().sequence();

        // Convert timestamp and sequence to bytes and copy to seed
        seed[0..8].copy_from_slice(&timestamp.to_be_bytes());
        seed[8..16].copy_from_slice(&sequence.to_be_bytes());

        // Get network ID and copy remaining bytes
        let network_id = env.ledger().network_id();
        seed[16..32].copy_from_slice(&network_id.to_array()[0..16]);

        // Convert seed to Soroban Bytes
        let seed_bytes = Bytes::from_array(env, &seed);

        // Hash and convert to BytesN
        let hash = env.crypto().sha256(&seed_bytes);
        BytesN::from_array(env, &hash.to_array())
    }
}

mod test;