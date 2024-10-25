use soroban_sdk::{contracttype, Address, BytesN, Symbol, Vec};

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
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

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Evidence {
    pub submitter: Address,
    pub description: Symbol,
    pub hash: BytesN<32>,
    pub timestamp: u64,
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Vote {
    pub arbitrator: Address,
    pub decision: VoteDecision,
    pub reason: Symbol,
    pub timestamp: u64,
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub enum DisputeStatus {
    Opened,
    ArbitratorsAssigned,
    EvidenceGathering,
    Voting,
    Resolved,
    Cancelled
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub enum VoteDecision {
    InFavorOfClient,
    InFavorOfFreelancer,
    Split
}