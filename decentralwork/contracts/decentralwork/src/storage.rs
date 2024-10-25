use soroban_sdk::{Symbol, BytesN, Address};

pub enum DataKey {
    Job(BytesN<32>),             // Job ID -> Job
    JobList,                     // List of all job IDs
    UserProfile(Address),        // User address -> UserProfile
    Dispute(BytesN<32>),        // Dispute ID -> Dispute
    DisputeList,                // List of all dispute IDs
    ArbitratorList,             // List of arbitrator addresses
    Config,                     // Global configuration
}