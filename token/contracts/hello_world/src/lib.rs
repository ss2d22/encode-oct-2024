#![no_std]
use soroban_sdk::{contract, contracttype, contractimpl, vec, Env, String, Vec, Address, BytesN, Symbol, token::TokenInterface, token::StellarAssetClient};

#[contract]
pub struct DeWorkToken;

#[derive(Clone)]
#[contracttype]
pub struct AllowanceDataKey {
    pub from: Address,
    pub spender: Address,
}

#[contracttype]
pub struct AllowanceValue {
    pub amount: i128,
    pub expiration_ledger: u32,
}

#[derive(Clone)]
#[contracttype]
pub enum DataKey {
    Allowance(AllowanceDataKey),
    Balance(Address),
    State(Address),
    Admin,
}

#[contractimpl]
impl DeWorkToken {
    // Define constants
    const MAX_SUPPLY: i128 = 23_000_000_000_000_000_000_000_000; // 23e12 * 1e18
    //const MINTER_ROLE: [u8; 32] = Self::keccak256("MINTER_ROLE");

    pub(crate) const DAY_IN_LEDGERS: u32 = 17280;
    pub(crate) const INSTANCE_BUMP_AMOUNT: u32 = 7 * Self::DAY_IN_LEDGERS;
    pub(crate) const INSTANCE_LIFETIME_THRESHOLD: u32 = Self::INSTANCE_BUMP_AMOUNT - Self::DAY_IN_LEDGERS;

    pub(crate) const BALANCE_BUMP_AMOUNT: u32 = 30 * Self::DAY_IN_LEDGERS;
    pub(crate) const BALANCE_LIFETIME_THRESHOLD: u32 = Self::BALANCE_BUMP_AMOUNT - Self::DAY_IN_LEDGERS;

    fn check_nonnegative_amount(amount: i128) {
        if amount < 0 {
            panic!("negative amount is not allowed: {}", amount)
        }
    }

    pub fn has_administrator(e: &Env) -> bool {
        let key = DataKey::Admin;
        e.storage().instance().has(&key)
    }

    pub fn read_administrator(e: &Env) -> Address {
        let key = DataKey::Admin;
        e.storage().instance().get(&key).unwrap()
    }

    pub fn write_administrator(e: &Env, id: Address) {
        let key = DataKey::Admin;
        e.storage().instance().set(&key, &id);
    }

    pub fn set_admin(e: Env, new_admin: Address) {
        let admin = Self::read_administrator(&e);
        admin.require_auth();

        e.storage()
            .instance()
            .extend_ttl(Self::INSTANCE_LIFETIME_THRESHOLD, Self::INSTANCE_BUMP_AMOUNT);

        let client = StellarAssetClient::new(&e, &new_admin.clone());
        Self::write_administrator(&e, new_admin.clone());
        client.set_authorized(&new_admin, &true);
    }

    pub fn mint(e: Env, to: Address, amount: i128) {
        Self::check_nonnegative_amount(amount);
        let admin = Self::read_administrator(&e);
        admin.require_auth();

        e.storage()
            .instance()
            .extend_ttl(Self::INSTANCE_LIFETIME_THRESHOLD, Self::INSTANCE_BUMP_AMOUNT);

        // Check that minting does not exceed MAX_SUPPLY
        let current_total_supply = Self::total_supply(&e);
        assert!(current_total_supply + amount <= Self::MAX_SUPPLY, "Cannot exceed max supply");

        // Use StellarAssetClient for minting tokens
        let asset_client = StellarAssetClient::new(&e, &admin);
        asset_client.mint(&to, &amount);

        // Update the total supply
        Self::set_total_supply(&e, current_total_supply + amount);
    }

    // fn keccak256(input: &str) -> [u8; 32] {
    //     use sha3::{Digest, Keccak256};
    //     let mut hasher = Keccak256::new();
    //     hasher.update(input);
    //     let result = hasher.finalize();
    //     let mut output = [0u8; 32];
    //     output.copy_from_slice(&result);
    //     output
    // }

    fn max_supply(env: &Env) -> i128 {
        Self::MAX_SUPPLY
    }

    fn total_supply(env: &Env) -> i128 {
        env.storage().instance().get(&Symbol::new(env, "total_supply")).unwrap_or(0)
    }

    fn set_total_supply(env: &Env, amount: i128) {
        env.storage().instance().set(&Symbol::new(env, "total_supply"), &amount);
    }
}

#[contractimpl]
impl TokenInterface for DeWorkToken {
    fn allowance(env: Env, from: Address, spender: Address) -> i128 {
        let key = (from.clone(), spender.clone());
        env.storage().instance().get(&key).unwrap_or(0)
    }

    fn approve(env: Env, from: Address, spender: Address, amount: i128, expiration_ledger: u32) {
        from.require_auth();
        let key = (from, spender);
        env.storage().instance().set(&key, &(amount, expiration_ledger));
    }

    fn balance(env: Env, id: Address) -> i128 {
        env.storage().instance().get(&id).unwrap_or(0)
    }

    fn transfer(env: Env, from: Address, to: Address, amount: i128) {
        from.require_auth();
        let from_balance = Self::balance(env.clone(), from.clone());
        let to_balance = Self::balance(env.clone(), to.clone());

        assert!(from_balance >= amount, "Insufficient balance");

        env.storage().instance().set(&from, &(from_balance - amount));
        env.storage().instance().set(&to, &(to_balance + amount));
    }

    fn transfer_from(env: Env, spender: Address, from: Address, to: Address, amount: i128) {
        spender.require_auth();

        let allowance = Self::allowance(env.clone(), from.clone(), spender.clone());
        assert!(allowance >= amount, "Insufficient allowance");

        let from_balance = Self::balance(env.clone(), from.clone());
        let to_balance = Self::balance(env.clone(), to.clone());
        assert!(from_balance >= amount, "Insufficient balance");

        env.storage().instance().set(&from, &(from_balance - amount));
        env.storage().instance().set(&to, &(to_balance + amount));

        env.storage().instance().set(&(from.clone(), spender.clone()), &(allowance - amount));
    }

    fn burn(env: Env, from: Address, amount: i128) {
        from.require_auth();
        let balance = Self::balance(env.clone(), from.clone());
        assert!(balance >= amount, "Insufficient balance");

        // Use StellarAssetClient to clawback tokens (equivalent to burn in this context)
        let asset_client = StellarAssetClient::new(&env, &from);
        asset_client.clawback(&from, &amount);

        env.storage().instance().set(&from, &(balance - amount));
    }

    fn burn_from(env: Env, spender: Address, from: Address, amount: i128) {
        spender.require_auth();

        let allowance = Self::allowance(env.clone(), from.clone(), spender.clone());
        assert!(allowance >= amount, "Insufficient allowance");

        let balance = Self::balance(env.clone(), from.clone());
        assert!(balance >= amount, "Insufficient balance");

        // Use StellarAssetClient to clawback tokens from `from` on behalf of `spender`
        let asset_client = StellarAssetClient::new(&env, &from);
        asset_client.clawback(&from, &amount);

        env.storage().instance().set(&from, &(balance - amount));
        env.storage().instance().set(&(from.clone(), spender.clone()), &(allowance - amount));
    }

    fn decimals(_env: Env) -> u32 {
        18  // Standard decimal places for tokens
    }

    fn name(env: Env) -> soroban_sdk::String {
        soroban_sdk::String::from_str(&env, "DeWorkToken")
    }

    fn symbol(env: Env) -> soroban_sdk::String {
        soroban_sdk::String::from_str(&env, "DWT")
    }
}

//mod test;