use soroban_sdk::{contracttype, Address, BytesN, Symbol, Vec};

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
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

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Review {
    pub reviewer: Address,
    pub job_id: BytesN<32>,
    pub rating: u32,
    pub comment: Symbol,
    pub timestamp: u64,
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct ArbitratorStats {
    pub cases_resolved: u32,
    pub successful_resolutions: u32,
    pub avg_resolution_time: u64,
    pub stake_amount: u32,
    pub domains: Vec<Symbol>,
}