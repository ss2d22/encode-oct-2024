use soroban_sdk::{contracttype, Address, BytesN, Symbol, Vec};

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
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

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Milestone {
    pub id: BytesN<32>,
    pub amount: u32,
    pub description: Symbol,
    pub status: MilestoneStatus,
    pub deadline: u64,
    pub submission: Option<Symbol>,
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub enum JobStatus {
    Open,
    InProgress,
    UnderDispute,
    Completed,
    Cancelled
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub enum MilestoneStatus {
    Pending,
    InProgress,
    UnderReview,
    Completed,
    Disputed
}