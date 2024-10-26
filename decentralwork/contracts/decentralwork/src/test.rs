#![cfg(test)]

use super::*;
use soroban_sdk::{
    testutils::{Address as _, AddressUtil, Events},
    vec,
    Env,
    Symbol,
    BytesN,
    Address,
};

#[test]
fn test_create_job() {
    // Setup environment and contract
    let env = Env::default();
    let contract_id = env.register_contract(None, DecentralWork);
    let client = DecentralWorkClient::new(&env, &contract_id);

    // Prepare test data
    let client_address = Address::random(&env);
    let title = Symbol::new(&env, "TestJob");
    let description = Symbol::new(&env, "JobDescription");
    let total_amount = 1000u32;
    let domain = Symbol::new(&env, "IT");
    let deadline = env.ledger().timestamp() + 10000;

    // Create a milestone
    let milestone_id = BytesN::from_array(&env, &[0; 32]);
    let milestone = Milestone {
        id: milestone_id.clone(),
        amount: 500u32,
        description: Symbol::new(&env, "Milestone1"),
        status: MilestoneStatus::Pending,
        deadline: env.ledger().timestamp() + 5000,
        submission: Symbol::new(&env, ""),
        has_submission: false,
    };
    let milestones = vec![&env, milestone];

    // Simulate client authorization
    env.set_invoker(client_address.clone());

    // Call create_job
    let job_id = client.create_job(
        &client_address,
        &title,
        &description,
        &total_amount,
        &milestones,
        &domain,
        &deadline,
    );

    // Retrieve the job from storage
    let job: Job = env
        .storage()
        .instance()
        .get(&DataKey::Job(job_id.clone()))
        .expect("Job not found");

    // Assert job properties
    assert_eq!(job.client, client_address);
    assert_eq!(job.title, title);
    assert_eq!(job.description, description);
    assert_eq!(job.total_amount, total_amount);
    assert_eq!(job.status, JobStatus::Open);

    // Optionally, check events
    let events = env.events().all();
    assert_eq!(events.len(), 1); // Should have one event
    let event = events.get(0).unwrap();
    let (event_contract_id, _event_topics, _event_data) = event;

    assert_eq!(event_contract_id, &contract_id);
    // Further assertions on event_topics and event_data can be added
}

#[test]
fn test_accept_job() {
    // Setup environment and contract
    let env = Env::default();
    let contract_id = env.register_contract(None, DecentralWork);
    let client = DecentralWorkClient::new(&env, &contract_id);

    // Prepare test data
    let client_address = Address::random(&env);
    let freelancer_address = Address::random(&env);
    let title = Symbol::new(&env, "TestJob");
    let description = Symbol::new(&env, "JobDescription");
    let total_amount = 1000u32;
    let domain = Symbol::new(&env, "IT");
    let deadline = env.ledger().timestamp() + 10000;

    // Create a milestone
    let milestone_id = BytesN::from_array(&env, &[0; 32]);
    let milestone = Milestone {
        id: milestone_id.clone(),
        amount: 500u32,
        description: Symbol::new(&env, "Milestone1"),
        status: MilestoneStatus::Pending,
        deadline: env.ledger().timestamp() + 5000,
        submission: Symbol::new(&env, ""),
        has_submission: false,
    };
    let milestones = vec![&env, milestone];

    // Simulate client authorization to create job
    env.set_invoker(client_address.clone());

    // Create job
    let job_id = client.create_job(
        &client_address,
        &title,
        &description,
        &total_amount,
        &milestones,
        &domain,
        &deadline,
    );

    // Simulate freelancer authorization to accept job
    env.set_invoker(freelancer_address.clone());

    // Accept job
    client.accept_job(&freelancer_address, &job_id);

    // Retrieve and assert job state
    let job: Job = env
        .storage()
        .instance()
        .get(&DataKey::Job(job_id))
        .expect("Job not found");

    assert_eq!(job.freelancer, freelancer_address);
    assert!(job.has_freelancer);
    assert_eq!(job.status, JobStatus::InProgress);
}

#[test]
fn test_register_user() {
    // Setup environment and contract
    let env = Env::default();
    let contract_id = env.register_contract(None, DecentralWork);
    let client = DecentralWorkClient::new(&env, &contract_id);

    // Prepare user address
    let user_address = Address::random(&env);

    // Simulate user authorization
    env.set_invoker(user_address.clone());

    // Register user
    client.register_user(&user_address);

    // Retrieve and assert user profile
    let profile: UserProfile = env
        .storage()
        .instance()
        .get(&DataKey::UserProfile(user_address.clone()))
        .expect("User profile not found");

    assert_eq!(profile.address, user_address);
    assert_eq!(profile.reputation_score, 100);
    assert_eq!(profile.completed_jobs, 0);
    assert!(!profile.is_arbitrator);
}
