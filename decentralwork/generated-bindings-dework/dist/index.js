import { Buffer } from "buffer";
import { Client as ContractClient, Spec as ContractSpec, } from '@stellar/stellar-sdk/contract';
export * from '@stellar/stellar-sdk';
export * as contract from '@stellar/stellar-sdk/contract';
export * as rpc from '@stellar/stellar-sdk/rpc';
if (typeof window !== 'undefined') {
    //@ts-ignore Buffer exists
    window.Buffer = window.Buffer || Buffer;
}
export const networks = {
    testnet: {
        networkPassphrase: "Test SDF Network ; September 2015",
        contractId: "CAOBXIWOEJ7YIJ26L3LXH35CSADV5JKGMLZUV5QYLGU4CGJ2QYCUJCVW",
    }
};
export const Errors = {
    1: { message: "InvalidInput" },
    2: { message: "Unauthorized" },
    3: { message: "LimitExceeded" },
    4: { message: "NoSuchService" },
    5: { message: "ServiceCapacityReached" },
    6: { message: "InsufficientBalance" }
};
export class Client extends ContractClient {
    options;
    constructor(options) {
        super(new ContractSpec(["AAAAAQAAAAAAAAAAAAAADlNlcnZpY2VMaXN0aW5nAAAAAAAHAAAAAAAAAAthY3RpdmVfam9icwAAAAAEAAAAAAAAAAdjb250YWN0AAAAABAAAAAAAAAACmZyZWVsYW5jZXIAAAAAABMAAAAAAAAAAmlkAAAAAAPuAAAAIAAAAAAAAAAFcHJpY2UAAAAAAAAEAAAAAAAAAAV0aXRsZQAAAAAAABEAAAAAAAAADHdlZWtseV9saW1pdAAAAAQ=",
            "AAAAAQAAAAAAAAAAAAAAA0pvYgAAAAALAAAAAAAAAAZjbGllbnQAAAAAABMAAAAAAAAACmNyZWF0ZWRfYXQAAAAAAAYAAAAAAAAACGRlYWRsaW5lAAAABgAAAAAAAAALZGVzY3JpcHRpb24AAAAAEQAAAAAAAAAGZG9tYWluAAAAAAARAAAAAAAAAApmcmVlbGFuY2VyAAAAAAATAAAAAAAAAA5oYXNfZnJlZWxhbmNlcgAAAAAAAQAAAAAAAAACaWQAAAAAA+4AAAAgAAAAAAAAAAZzdGF0dXMAAAAAB9AAAAAJSm9iU3RhdHVzAAAAAAAAAAAAAAV0aXRsZQAAAAAAABEAAAAAAAAADHRvdGFsX2Ftb3VudAAAAAQ=",
            "AAAAAgAAAAAAAAAAAAAACUpvYlN0YXR1cwAAAAAAAAQAAAAAAAAAAAAAAARPcGVuAAAAAAAAAAAAAAAKSW5Qcm9ncmVzcwAAAAAAAAAAAAAAAAAJQ29tcGxldGVkAAAAAAAAAAAAAAAAAAAJQ2FuY2VsbGVkAAAA",
            "AAAABAAAAAAAAAAAAAAABUVycm9yAAAAAAAABgAAAAAAAAAMSW52YWxpZElucHV0AAAAAQAAAAAAAAAMVW5hdXRob3JpemVkAAAAAgAAAAAAAAANTGltaXRFeGNlZWRlZAAAAAAAAAMAAAAAAAAADU5vU3VjaFNlcnZpY2UAAAAAAAAEAAAAAAAAABZTZXJ2aWNlQ2FwYWNpdHlSZWFjaGVkAAAAAAAFAAAAAAAAABNJbnN1ZmZpY2llbnRCYWxhbmNlAAAAAAY=",
            "AAAAAgAAAAAAAAAAAAAAB0RhdGFLZXkAAAAAAgAAAAEAAAAAAAAAB1NlcnZpY2UAAAAAAQAAA+4AAAAgAAAAAAAAAAAAAAALU2VydmljZUxpc3QA",
            "AAAAAAAAAAAAAAAEdGVzdAAAAAAAAAABAAAABA==",
            "AAAAAAAAAAAAAAAOY3JlYXRlX3NlcnZpY2UAAAAAAAUAAAAAAAAACmZyZWVsYW5jZXIAAAAAABMAAAAAAAAABXRpdGxlAAAAAAAAEQAAAAAAAAAFcHJpY2UAAAAAAAAEAAAAAAAAAAx3ZWVrbHlfbGltaXQAAAAEAAAAAAAAAA9jb250YWN0X2RldGFpbHMAAAAAEAAAAAEAAAPpAAAD7gAAACAAAAAD",
            "AAAAAAAAAAAAAAALZ2V0X3NlcnZpY2UAAAAAAQAAAAAAAAAKc2VydmljZV9pZAAAAAAD7gAAACAAAAABAAAD6AAAB9AAAAAOU2VydmljZUxpc3RpbmcAAA==",
            "AAAAAAAAAAAAAAAMZ2V0X3NlcnZpY2VzAAAAAAAAAAEAAAPqAAAH0AAAAA5TZXJ2aWNlTGlzdGluZwAA",
            "AAAAAAAAAAAAAAANb3JkZXJfc2VydmljZQAAAAAAAAIAAAAAAAAABmNsaWVudAAAAAAAEwAAAAAAAAAKc2VydmljZV9pZAAAAAAD7gAAACAAAAABAAAD6QAAA+0AAAAAAAAAAw==",
            "AAAAAAAAAAAAAAAOdXBkYXRlX3NlcnZpY2UAAAAAAAQAAAAAAAAACmZyZWVsYW5jZXIAAAAAABMAAAAAAAAACnNlcnZpY2VfaWQAAAAAA+4AAAAgAAAAAAAAAAVwcmljZQAAAAAAAAQAAAAAAAAADHdlZWtseV9saW1pdAAAAAQAAAABAAAD6QAAA+0AAAAAAAAAAw=="]), options);
        this.options = options;
    }
    fromJSON = {
        test: (this.txFromJSON),
        create_service: (this.txFromJSON),
        get_service: (this.txFromJSON),
        get_services: (this.txFromJSON),
        order_service: (this.txFromJSON),
        update_service: (this.txFromJSON)
    };
}
