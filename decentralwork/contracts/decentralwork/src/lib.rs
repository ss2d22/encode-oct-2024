#![no_std]
use soroban_sdk::{
    contract, contractimpl, contracttype, contracterror,
    Address, BytesN, Bytes, Env, Symbol, symbol_short, Vec,
};

#[derive(Clone, Debug, Eq, PartialEq)]
#[contracttype]
pub struct ServiceListing {
    pub id: BytesN<32>,
    pub freelancer: Address,
    pub title: Symbol,
    pub price: u32,
    pub weekly_limit: u32,
    pub active_jobs: u32,
}

#[contracterror]
#[derive(Copy, Clone, Debug, Eq, PartialEq)]
#[repr(u32)]
pub enum Error {
    InvalidInput = 1,
    Unauthorized = 2,
    LimitExceeded = 3,
}

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
    ) -> Result<BytesN<32>, Error> {
        freelancer.require_auth();

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
}

#[cfg(test)]
mod test {
    use super::*;
    use soroban_sdk::{testutils::{Address as _, Events}, vec, Env};

    #[test]
    fn test_create_service() {
        let env = Env::default();
        let contract_id = env.register_contract(None, DecentralWork);
        let client = DecentralWorkClient::new(&env, &contract_id);

        let freelancer = Address::generate(&env);
        let title = symbol_short!("test");

        let result = client.try_create_service(
            &freelancer,
            &title,
            &100,
            &5,
        );

        assert!(result.is_ok());

        // Verify event
        let events = env.events().all();
        assert_eq!(events.len(), 1);
    }
}