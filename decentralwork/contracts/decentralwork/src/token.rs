#![no_std]

use soroban_sdk::{contractimpl, Env, Address, BytesN, Symbol, String, token::TokenInterface};

pub struct DeWorkToken;

// Define constants
const MAX_SUPPLY: i128 = 23_000_000_000_000_000_000_000_000; // 23e12 * 1e18
const MINTER_ROLE: [u8; 32] = keccak256("MINTER_ROLE");

fn keccak256(input: &str) -> [u8; 32] {
    // Mock function for `keccak256` hashing in `no_std`
    // Replace this with your Soroban SDK's actual hashing function if available
    use sha3::{Digest, Keccak256};
    let mut hasher = Keccak256::new();
    hasher.update(input);
    let result = hasher.finalize();
    let mut output = [0u8; 32];
    output.copy_from_slice(&result);
    output
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

        env.storage().instance().set(&from, &(balance - amount));
    }

    fn burn_from(env: Env, spender: Address, from: Address, amount: i128) {
        spender.require_auth();

        let allowance = Self::allowance(env.clone(), from.clone(), spender.clone());
        assert!(allowance >= amount, "Insufficient allowance");

        let balance = Self::balance(env.clone(), from.clone());
        assert!(balance >= amount, "Insufficient balance");

        env.storage().instance().set(&from, &(balance - amount));
        env.storage().instance().set(&(from.clone(), spender.clone()), &(allowance - amount));
    }

    fn decimals(_env: Env) -> u32 {
        18  // Standard decimal places for tokens
    }

    fn name(_env: Env) -> String {
        "DeWorkToken".into()
    }

    fn symbol(_env: Env) -> String {
        "DWT".into()
    }
}
