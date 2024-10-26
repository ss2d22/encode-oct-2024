import { Buffer } from "buffer";
import { Address } from '@stellar/stellar-sdk';
import {
  AssembledTransaction,
  Client as ContractClient,
  ClientOptions as ContractClientOptions,
  Result,
  Spec as ContractSpec,
} from '@stellar/stellar-sdk/contract';
import type {
  u32,
  i32,
  u64,
  i64,
  u128,
  i128,
  u256,
  i256,
  Option,
  Typepoint,
  Duration,
} from '@stellar/stellar-sdk/contract';
export * from '@stellar/stellar-sdk'
export * as contract from '@stellar/stellar-sdk/contract'
export * as rpc from '@stellar/stellar-sdk/rpc'

if (typeof window !== 'undefined') {
  //@ts-ignore Buffer exists
  window.Buffer = window.Buffer || Buffer;
}


export const networks = {
  testnet: {
    networkPassphrase: "Test SDF Network ; September 2015",
    contractId: "CB433MV7BPL6QZGARM4MLCP5LZGFSFJ6LVMIHSX6D7NTHUQEHQDLHMZ7",
  }
} as const


export interface UserProfile {
  credit_score: u32;
  current_loan: u32;
  is_banned: boolean;
  missed_payments: u32;
}


export interface LoanStatus {
  amount: u32;
  due_date: u64;
  payments_made: u32;
  total_payments: u32;
}


export interface GlobalParams {
  base_interest_rate: u32;
  max_loan_amount: u32;
  max_missed_payments: u32;
  min_credit_score: u32;
  payment_period: u64;
}

export const Errors = {
  1: {message:"UserBanned"},

  2: {message:"InsufficientCreditScore"},

  3: {message:"LoanAmountTooHigh"},

  4: {message:"NoActiveLoan"},

  5: {message:"Unauthorized"},

  6: {message:"LoanDefaulted"},

  7: {message:"UserNotFound"},

  8: {message:"GlobalParamsNotSet"},

  9: {message:"ActiveLoanExists"},

  10: {message:"AdminNotSet"},

  11: {message:"AlreadyInitialized"},

  12: {message:"UserAlreadyRegistered"}
}
export type DataKey = {tag: "Admin", values: void} | {tag: "UserProfile", values: readonly [string]} | {tag: "LoanStatus", values: readonly [string]} | {tag: "GlobalParams", values: void};


export interface Client {
  /**
   * Construct and simulate a initialize transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  initialize: ({admin}: {admin: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Result<void>>>

  /**
   * Construct and simulate a register_user transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  register_user: ({user}: {user: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Result<void>>>

  /**
   * Construct and simulate a request_loan transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  request_loan: ({user, amount}: {user: string, amount: u32}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Result<void>>>

  /**
   * Construct and simulate a make_payment transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  make_payment: ({user}: {user: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Result<void>>>

  /**
   * Construct and simulate a check_loan_status transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  check_loan_status: ({user}: {user: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Result<void>>>

  /**
   * Construct and simulate a get_user_profile transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_user_profile: ({user}: {user: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Result<UserProfile>>>

  /**
   * Construct and simulate a update_global_params transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  update_global_params: ({admin, new_params}: {admin: string, new_params: GlobalParams}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Result<void>>>

  /**
   * Construct and simulate a ban_user transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  ban_user: ({admin, user}: {admin: string, user: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Result<void>>>

}
export class Client extends ContractClient {
  constructor(public readonly options: ContractClientOptions) {
    super(
      new ContractSpec([ "AAAAAQAAAAAAAAAAAAAAC1VzZXJQcm9maWxlAAAAAAQAAAAAAAAADGNyZWRpdF9zY29yZQAAAAQAAAAAAAAADGN1cnJlbnRfbG9hbgAAAAQAAAAAAAAACWlzX2Jhbm5lZAAAAAAAAAEAAAAAAAAAD21pc3NlZF9wYXltZW50cwAAAAAE",
        "AAAAAQAAAAAAAAAAAAAACkxvYW5TdGF0dXMAAAAAAAQAAAAAAAAABmFtb3VudAAAAAAABAAAAAAAAAAIZHVlX2RhdGUAAAAGAAAAAAAAAA1wYXltZW50c19tYWRlAAAAAAAABAAAAAAAAAAOdG90YWxfcGF5bWVudHMAAAAAAAQ=",
        "AAAAAQAAAAAAAAAAAAAADEdsb2JhbFBhcmFtcwAAAAUAAAAAAAAAEmJhc2VfaW50ZXJlc3RfcmF0ZQAAAAAABAAAAAAAAAAPbWF4X2xvYW5fYW1vdW50AAAAAAQAAAAAAAAAE21heF9taXNzZWRfcGF5bWVudHMAAAAABAAAAAAAAAAQbWluX2NyZWRpdF9zY29yZQAAAAQAAAAAAAAADnBheW1lbnRfcGVyaW9kAAAAAAAG",
        "AAAABAAAAAAAAAAAAAAABUVycm9yAAAAAAAADAAAAAAAAAAKVXNlckJhbm5lZAAAAAAAAQAAAAAAAAAXSW5zdWZmaWNpZW50Q3JlZGl0U2NvcmUAAAAAAgAAAAAAAAARTG9hbkFtb3VudFRvb0hpZ2gAAAAAAAADAAAAAAAAAAxOb0FjdGl2ZUxvYW4AAAAEAAAAAAAAAAxVbmF1dGhvcml6ZWQAAAAFAAAAAAAAAA1Mb2FuRGVmYXVsdGVkAAAAAAAABgAAAAAAAAAMVXNlck5vdEZvdW5kAAAABwAAAAAAAAASR2xvYmFsUGFyYW1zTm90U2V0AAAAAAAIAAAAAAAAABBBY3RpdmVMb2FuRXhpc3RzAAAACQAAAAAAAAALQWRtaW5Ob3RTZXQAAAAACgAAAAAAAAASQWxyZWFkeUluaXRpYWxpemVkAAAAAAALAAAAAAAAABVVc2VyQWxyZWFkeVJlZ2lzdGVyZWQAAAAAAAAM",
        "AAAAAgAAAAAAAAAAAAAAB0RhdGFLZXkAAAAABAAAAAAAAAAAAAAABUFkbWluAAAAAAAAAQAAAAAAAAALVXNlclByb2ZpbGUAAAAAAQAAABMAAAABAAAAAAAAAApMb2FuU3RhdHVzAAAAAAABAAAAEwAAAAAAAAAAAAAADEdsb2JhbFBhcmFtcw==",
        "AAAAAAAAAAAAAAAKaW5pdGlhbGl6ZQAAAAAAAQAAAAAAAAAFYWRtaW4AAAAAAAATAAAAAQAAA+kAAAPtAAAAAAAAAAM=",
        "AAAAAAAAAAAAAAANcmVnaXN0ZXJfdXNlcgAAAAAAAAEAAAAAAAAABHVzZXIAAAATAAAAAQAAA+kAAAPtAAAAAAAAAAM=",
        "AAAAAAAAAAAAAAAMcmVxdWVzdF9sb2FuAAAAAgAAAAAAAAAEdXNlcgAAABMAAAAAAAAABmFtb3VudAAAAAAABAAAAAEAAAPpAAAD7QAAAAAAAAAD",
        "AAAAAAAAAAAAAAAMbWFrZV9wYXltZW50AAAAAQAAAAAAAAAEdXNlcgAAABMAAAABAAAD6QAAA+0AAAAAAAAAAw==",
        "AAAAAAAAAAAAAAARY2hlY2tfbG9hbl9zdGF0dXMAAAAAAAABAAAAAAAAAAR1c2VyAAAAEwAAAAEAAAPpAAAD7QAAAAAAAAAD",
        "AAAAAAAAAAAAAAAQZ2V0X3VzZXJfcHJvZmlsZQAAAAEAAAAAAAAABHVzZXIAAAATAAAAAQAAA+kAAAfQAAAAC1VzZXJQcm9maWxlAAAAAAM=",
        "AAAAAAAAAAAAAAAUdXBkYXRlX2dsb2JhbF9wYXJhbXMAAAACAAAAAAAAAAVhZG1pbgAAAAAAABMAAAAAAAAACm5ld19wYXJhbXMAAAAAB9AAAAAMR2xvYmFsUGFyYW1zAAAAAQAAA+kAAAPtAAAAAAAAAAM=",
        "AAAAAAAAAAAAAAAIYmFuX3VzZXIAAAACAAAAAAAAAAVhZG1pbgAAAAAAABMAAAAAAAAABHVzZXIAAAATAAAAAQAAA+kAAAPtAAAAAAAAAAM=" ]),
      options
    )
  }
  public readonly fromJSON = {
    initialize: this.txFromJSON<Result<void>>,
        register_user: this.txFromJSON<Result<void>>,
        request_loan: this.txFromJSON<Result<void>>,
        make_payment: this.txFromJSON<Result<void>>,
        check_loan_status: this.txFromJSON<Result<void>>,
        get_user_profile: this.txFromJSON<Result<UserProfile>>,
        update_global_params: this.txFromJSON<Result<void>>,
        ban_user: this.txFromJSON<Result<void>>
  }
}