#![no_std]

mod test;

use soroban_sdk::{contract, contractimpl, contracttype, contracterror, Address, BytesN, Bytes, Env, Symbol, symbol_short, Vec, String};

#[derive(Clone, Debug, Eq, PartialEq)]
#[contracttype]
pub struct ServiceListing {
    pub id: BytesN<32>,
    pub freelancer: Address,
    pub title: Symbol, // Valid characters are a-zA-Z0-9_ and maximum length is 32 characters.
    pub price: u32, // 32 bit unsigned integer
    pub weekly_limit: u32, // weekly limit of simultaneous services a freelancer can do
    pub active_jobs: u32, // currently active services of this type
    pub contact: String,
}

#[derive(Clone, Debug, Eq, PartialEq)]
#[contracttype]
pub struct Job {
    pub id: BytesN<32>,
    pub client: Address,
    pub freelancer: Address,
    pub title: Symbol,
    pub description: Symbol,
    pub total_amount: u32,
    pub status: JobStatus,
    pub created_at: u64,
    pub domain: Symbol,
    pub deadline: u64,
    pub has_freelancer: bool,
}

#[derive(Clone, Debug, Eq, PartialEq)]
#[contracttype]
pub enum JobStatus {
    Open,
    InProgress,
    Completed,
    Cancelled
}


#[contracterror]
#[derive(Copy, Clone, Debug, Eq, PartialEq)]
#[repr(u32)]
pub enum Error {
    InvalidInput = 1,
    Unauthorized = 2, // Unauthorized is not used though
    LimitExceeded = 3,
    NoSuchService = 4,
    ServiceCapacityReached = 5,
    InsufficientBalance = 6,
}
// we might need more error types? last time for Stellar there was like 13

#[derive(Clone)]
#[contracttype]
pub enum DataKey {
    Service(BytesN<32>),
    ServiceList,
}

#[contract]
pub struct DecentralWork;


#[contractimpl]
impl DecentralWork {
    pub fn test(env: Env) -> u32 {
        1
    }

    pub fn create_service(
        env: Env,
        freelancer: Address,
        title: Symbol,
        price: u32,
        weekly_limit: u32,
        contact_details: String,
    ) -> Result<BytesN<32>, Error> {
        //freelancer.require_auth();

        if price == 0 || weekly_limit == 0 {
            return Err(Error::InvalidInput);
        }

        let service_id = env.crypto().sha256(&Bytes::from_slice(&env, &env.ledger().timestamp().to_be_bytes()));
        let service_id = BytesN::from_array(&env, &service_id.to_array());

        let service = ServiceListing {
            id: service_id.clone(),
            freelancer: freelancer.clone(),
            title,
            price,
            weekly_limit,
            active_jobs: 0,
            contact: contact_details,
        };

        env.storage().instance().set(&DataKey::Service(service_id.clone()), &service);

        let mut service_list: Vec<BytesN<32>> = env
            .storage()
            .instance()
            .get(&DataKey::ServiceList)
            .unwrap_or(Vec::new(&env));

        service_list.push_back(service_id.clone());

        env.storage().instance().set(&DataKey::ServiceList, &service_list);

        env.storage().instance().extend_ttl(100, 100);

        env.events().publish(
            (symbol_short!("created"), service_id.clone()),
            service
        );

        Ok(service_id)
    }

    pub fn get_service(
        env: Env,
        service_id: BytesN<32>,
    ) -> Option<ServiceListing> {
        env.storage().instance().get(&DataKey::Service(service_id))
    }

    pub fn get_services(env: Env) -> Vec<ServiceListing> {
        let service_list: Vec<BytesN<32>> = env
            .storage()
            .instance()
            .get(&DataKey::ServiceList)
            .unwrap_or(Vec::new(&env));

        let mut services = Vec::new(&env);
        for id in service_list.iter() {
            if let Some(service) = env.storage().instance().get(&DataKey::Service(id)) {
                services.push_back(service);
            }
        }
        services
    }

    pub fn order_service(
        env: Env,
        client: Address,
        service_id: BytesN<32>,
    ) -> Result<(), Error> {
        //client.require_auth();

        // Verify that the service exists
        let service: core::option::Option<ServiceListing> = env.storage().instance().get(&DataKey::Service(service_id.clone()));
        if let Some(mut service_listing) = service {

            // Verify that the service weekly capacity has not been reached
            if service_listing.active_jobs < service_listing.weekly_limit {
                service_listing.active_jobs += 1;

                // Save the updated service back to storage
                env.storage()
                    .instance()
                    .set(&DataKey::Service(service_id.clone()), &service_listing);

                Ok(())
            } else {
                Err(Error::ServiceCapacityReached)
            }
        } else {
            // Return an error if the service does not exist
            Err(Error::NoSuchService)
        }
    }

    pub fn update_service(
        env: Env,
        freelancer: Address,
        service_id: BytesN<32>,
        price: u32,
        weekly_limit: u32,
    ) -> Result<(), Error> {
        //freelancer.require_auth();

        let service: core::option::Option<ServiceListing> = env.storage().instance().get(&DataKey::Service(service_id.clone()));
        if let Some(mut service_listing) = service {
            // Update `price` and `weekly_limit` fields if they have changed
            if service_listing.price != price {
                service_listing.price = price;
            }
            if service_listing.weekly_limit != weekly_limit {
                service_listing.weekly_limit = weekly_limit;
            }

            // Save the updated service back to storage
            env.storage()
                .instance()
                .set(&DataKey::Service(service_id), &service_listing);

            Ok(())
        } else {
            // Return an error if the service does not exist
            Err(Error::NoSuchService)
        }
    }
}
