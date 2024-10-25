#[contracterror]
#[derive(Copy, Clone, Debug, Eq, PartialEq)]
#[repr(u32)]
pub enum Error {
    // Job related errors
    JobNotFound = 1,
    JobAlreadyExists = 2,
    InvalidJobStatus = 3,

    // User related errors
    UserNotFound = 4,
    UserAlreadyExists = 5,
    InsufficientReputation = 6,

    // Dispute related errors
    DisputeNotFound = 7,
    DisputeAlreadyExists = 8,
    NotEligibleArbitrator = 9,

    // Payment related errors
    InsufficientFunds = 10,
    PaymentFailed = 11,

    // Authorization errors
    Unauthorized = 12,
    NotJobOwner = 13,
    NotFreelancer = 14,

    // General errors
    InvalidAmount = 15,
    InvalidState = 16,
    OperationNotAllowed = 17,
}