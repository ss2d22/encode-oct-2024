import { Client } from "generated-bindings-dework";
import kit, { signAndSend } from "@/utils/walletService.ts";
import { xdr, Keypair, Transaction } from "@stellar/stellar-sdk";
import { Server } from "@stellar/stellar-sdk/rpc";
/**
 *
 * @author Sriram Sundar
 *
 * @type {Server}
 */
const server: Server = new Server("https://soroban-testnet.stellar.org");

/**
 * a instance of the Client class to interact with smart contracts on stellar with the bindings for
 * the DeWork contract
 * @author Sriram Sundar
 *
 * @type {Client}
 */
const deWork: Client = new Client({
  contractId: "CAOBXIWOEJ7YIJ26L3LXH35CSADV5JKGMLZUV5QYLGU4CGJ2QYCUJCVW",
  networkPassphrase: "Test SDF Network ; September 2015",
  rpcUrl: "https://soroban-testnet.stellar.org",
  signTransaction: async (xdrBase64: string, options) => {
    const envelope = xdr.TransactionEnvelope.fromXDR(xdrBase64, "base64");
    const address = (await kit.getAddress()).address;
    const publicKeyBuffer = Buffer.from(
      Keypair.fromPublicKey(address).rawPublicKey()
    );
    const sourceAccountMuxed = xdr.MuxedAccount.keyTypeEd25519(publicKeyBuffer);
    envelope.v1().tx().sourceAccount(sourceAccountMuxed);

    const account = await server.getAccount(address);
    console.log(account, "acc");
    console.log(account.sequenceNumber());
    const latestSequenceNumber = account.sequenceNumber();
    const nextSequenceNumber = (
      BigInt(latestSequenceNumber) + BigInt(1)
    ).toString();
    envelope.v1().tx().seqNum(xdr.Int64.fromString(nextSequenceNumber));

    const modifiedXdr = envelope.toXDR("base64");
    const transaction = new Transaction(
      modifiedXdr,
      "Test SDF Network ; September 2015"
    );
    const signedTransaction = await signAndSend(transaction.toXDR(), options);
    console.log(signedTransaction);
    return signedTransaction;
  },
  signAuthEntry: signAndSend,
  allowHttp: true,
});

export default deWork;
