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
    contractId: "CAOBXIWOEJ7YIJ26L3LXH35CSADV5JKGMLZUV5QYLGU4CGJ2QYCUJCVW",
  }
} as const


export interface ServiceListing {
  active_jobs: u32;
  contact: string;
  freelancer: string;
  id: Buffer;
  price: u32;
  title: string;
  weekly_limit: u32;
}


export interface Job {
  client: string;
  created_at: u64;
  deadline: u64;
  description: string;
  domain: string;
  freelancer: string;
  has_freelancer: boolean;
  id: Buffer;
  status: JobStatus;
  title: string;
  total_amount: u32;
}

export type JobStatus = {tag: "Open", values: void} | {tag: "InProgress", values: void} | {tag: "Completed", values: void} | {tag: "Cancelled", values: void};

export const Errors = {
  1: {message:"InvalidInput"},

  2: {message:"Unauthorized"},

  3: {message:"LimitExceeded"},

  4: {message:"NoSuchService"},

  5: {message:"ServiceCapacityReached"},

  6: {message:"InsufficientBalance"}
}
export type DataKey = {tag: "Service", values: readonly [Buffer]} | {tag: "ServiceList", values: void};


export interface Client {
  /**
   * Construct and simulate a test transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  test: (options?: {
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
  }) => Promise<AssembledTransaction<u32>>

  /**
   * Construct and simulate a create_service transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  create_service: ({freelancer, title, price, weekly_limit, contact_details}: {freelancer: string, title: string, price: u32, weekly_limit: u32, contact_details: string}, options?: {
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
  }, sourceAccount?: string) => Promise<AssembledTransaction<Result<Buffer>>>

  /**
   * Construct and simulate a get_service transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_service: ({service_id}: {service_id: Buffer}, options?: {
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
  }) => Promise<AssembledTransaction<Option<ServiceListing>>>

  /**
   * Construct and simulate a get_services transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_services: (options?: {
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
  }) => Promise<AssembledTransaction<Array<ServiceListing>>>

  /**
   * Construct and simulate a order_service transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  order_service: ({client, service_id}: {client: string, service_id: Buffer}, options?: {
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
   * Construct and simulate a update_service transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  update_service: ({freelancer, service_id, price, weekly_limit}: {freelancer: string, service_id: Buffer, price: u32, weekly_limit: u32}, options?: {
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
      new ContractSpec([ "AAAAAQAAAAAAAAAAAAAADlNlcnZpY2VMaXN0aW5nAAAAAAAHAAAAAAAAAAthY3RpdmVfam9icwAAAAAEAAAAAAAAAAdjb250YWN0AAAAABAAAAAAAAAACmZyZWVsYW5jZXIAAAAAABMAAAAAAAAAAmlkAAAAAAPuAAAAIAAAAAAAAAAFcHJpY2UAAAAAAAAEAAAAAAAAAAV0aXRsZQAAAAAAABEAAAAAAAAADHdlZWtseV9saW1pdAAAAAQ=",
        "AAAAAQAAAAAAAAAAAAAAA0pvYgAAAAALAAAAAAAAAAZjbGllbnQAAAAAABMAAAAAAAAACmNyZWF0ZWRfYXQAAAAAAAYAAAAAAAAACGRlYWRsaW5lAAAABgAAAAAAAAALZGVzY3JpcHRpb24AAAAAEQAAAAAAAAAGZG9tYWluAAAAAAARAAAAAAAAAApmcmVlbGFuY2VyAAAAAAATAAAAAAAAAA5oYXNfZnJlZWxhbmNlcgAAAAAAAQAAAAAAAAACaWQAAAAAA+4AAAAgAAAAAAAAAAZzdGF0dXMAAAAAB9AAAAAJSm9iU3RhdHVzAAAAAAAAAAAAAAV0aXRsZQAAAAAAABEAAAAAAAAADHRvdGFsX2Ftb3VudAAAAAQ=",
        "AAAAAgAAAAAAAAAAAAAACUpvYlN0YXR1cwAAAAAAAAQAAAAAAAAAAAAAAARPcGVuAAAAAAAAAAAAAAAKSW5Qcm9ncmVzcwAAAAAAAAAAAAAAAAAJQ29tcGxldGVkAAAAAAAAAAAAAAAAAAAJQ2FuY2VsbGVkAAAA",
        "AAAABAAAAAAAAAAAAAAABUVycm9yAAAAAAAABgAAAAAAAAAMSW52YWxpZElucHV0AAAAAQAAAAAAAAAMVW5hdXRob3JpemVkAAAAAgAAAAAAAAANTGltaXRFeGNlZWRlZAAAAAAAAAMAAAAAAAAADU5vU3VjaFNlcnZpY2UAAAAAAAAEAAAAAAAAABZTZXJ2aWNlQ2FwYWNpdHlSZWFjaGVkAAAAAAAFAAAAAAAAABNJbnN1ZmZpY2llbnRCYWxhbmNlAAAAAAY=",
        "AAAAAgAAAAAAAAAAAAAAB0RhdGFLZXkAAAAAAgAAAAEAAAAAAAAAB1NlcnZpY2UAAAAAAQAAA+4AAAAgAAAAAAAAAAAAAAALU2VydmljZUxpc3QA",
        "AAAAAAAAAAAAAAAEdGVzdAAAAAAAAAABAAAABA==",
        "AAAAAAAAAAAAAAAOY3JlYXRlX3NlcnZpY2UAAAAAAAUAAAAAAAAACmZyZWVsYW5jZXIAAAAAABMAAAAAAAAABXRpdGxlAAAAAAAAEQAAAAAAAAAFcHJpY2UAAAAAAAAEAAAAAAAAAAx3ZWVrbHlfbGltaXQAAAAEAAAAAAAAAA9jb250YWN0X2RldGFpbHMAAAAAEAAAAAEAAAPpAAAD7gAAACAAAAAD",
        "AAAAAAAAAAAAAAALZ2V0X3NlcnZpY2UAAAAAAQAAAAAAAAAKc2VydmljZV9pZAAAAAAD7gAAACAAAAABAAAD6AAAB9AAAAAOU2VydmljZUxpc3RpbmcAAA==",
        "AAAAAAAAAAAAAAAMZ2V0X3NlcnZpY2VzAAAAAAAAAAEAAAPqAAAH0AAAAA5TZXJ2aWNlTGlzdGluZwAA",
        "AAAAAAAAAAAAAAANb3JkZXJfc2VydmljZQAAAAAAAAIAAAAAAAAABmNsaWVudAAAAAAAEwAAAAAAAAAKc2VydmljZV9pZAAAAAAD7gAAACAAAAABAAAD6QAAA+0AAAAAAAAAAw==",
        "AAAAAAAAAAAAAAAOdXBkYXRlX3NlcnZpY2UAAAAAAAQAAAAAAAAACmZyZWVsYW5jZXIAAAAAABMAAAAAAAAACnNlcnZpY2VfaWQAAAAAA+4AAAAgAAAAAAAAAAVwcmljZQAAAAAAAAQAAAAAAAAADHdlZWtseV9saW1pdAAAAAQAAAABAAAD6QAAA+0AAAAAAAAAAw==" ]),
      options
    )
  }
  public readonly fromJSON = {
    test: this.txFromJSON<u32>,
        create_service: this.txFromJSON<Result<Buffer>>,
        get_service: this.txFromJSON<Option<ServiceListing>>,
        get_services: this.txFromJSON<Array<ServiceListing>>,
        order_service: this.txFromJSON<Result<void>>,
        update_service: this.txFromJSON<Result<void>>
  }
}