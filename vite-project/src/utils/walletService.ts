import {
  StellarWalletsKit,
  WalletNetwork,
  FREIGHTER_ID,
  ISupportedWallet,
  allowAllModules,
} from "@creit.tech/stellar-wallets-kit";

const kit: StellarWalletsKit = new StellarWalletsKit({
  network: WalletNetwork.TESTNET,
  selectedWalletId: FREIGHTER_ID,
  modules: allowAllModules(),
});
export const fetchAddress = async () => {
  try {
    const address = await kit.getAddress();
    console.log(address.address, "in fetch");
    return address.address;
  } catch {
    await kit.openModal({
      onWalletSelected: async (option: ISupportedWallet) => {
        kit.setWallet(option.id);
        const { address } = await kit.getAddress();
        return address;
      },
      modalTitle: "connect your wallet to de work yourself",
      notAvailableText: "not available text for now",
    });
  }
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const createButton = async (query: string, setAddress: Function) => {
  if(kit.isButtonCreated()){
    return
  }
  return await kit.createButton({
    container: document.querySelector(query) as HTMLElement,
    onConnect: ({ address }) => {
      setAddress(address);
    },
    onDisconnect: () => {
      setAddress(null);
    },
    horizonUrl: "https://horizon-testnet.stellar.org/",
    buttonText: "connect your wallet",
  });
};


export const signAndSend = async (transaction, options) => {
  console.log("signing");
  console.log(await kit.getNetwork())
  const address = await kit.getAddress();
  console.log(options, "options");
  console.log(transaction, "transaction");
  const signedTrans = await kit.signTransaction(transaction,{
    networkPassphrase:"Test SDF Network ; September 2015",
    submit: true,
    submitUrl: "https://soroban-testnet.stellar.org",
    address: address.address,
  });
  console.log(signedTrans.signerAddress);
  console.log(signedTrans.signedTxXdr, " signed");
  return signedTrans.signedTxXdr;
};

export default kit;
