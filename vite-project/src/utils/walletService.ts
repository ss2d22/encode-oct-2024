import {
  StellarWalletsKit,
  WalletNetwork,
  FREIGHTER_ID,
  ISupportedWallet,
  allowAllModules,
} from "@creit.tech/stellar-wallets-kit";

/**
 * instance of StellarWalletsKit class for managing wallet operations
 * @author Sriram Sundar
 *
 * @type {StellarWalletsKit}
 */
const kit: StellarWalletsKit = new StellarWalletsKit({
  network: WalletNetwork.TESTNET,
  selectedWalletId: FREIGHTER_ID,
  modules: allowAllModules(),
});

/**
 * method to fetch the address of the wallet connected to the kit instance
 * if there is no connected wallet a modal pops up
 * @author Sriram Sundar
 *
 * @async
 * @returns {Promise<string>}
 */
export const fetchAddress = async (): Promise<string> => {
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
    return "";
  }
};

/**
 * Description placeholder
 * @author Sriram Sundar
 *
 * @async
 * @param {string} query
 * @param {(address: string | null) => void} setAddress
 * @returns {Promise<void>}
 */
export const createButton = async (
  query: string,
  setAddress: (address: string | null) => void
): Promise<void> => {
  if (kit.isButtonCreated()) {
    return;
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

/**
 * method to sign a transaction and return it
 * @author Sriram Sundar
 *
 * @async
 * @param {string} transaction
 * @param {signOptions} options
 * @returns {Promise<string>}
 */
export const signAndSend = async (
  transaction: string,
  options: signOptions
): Promise<string> => {
  console.log("signing");
  console.log(await kit.getNetwork());
  const address = await kit.getAddress();
  console.log(options, "options");
  console.log(transaction, "transaction");
  const signedTrans = await kit.signTransaction(transaction, {
    networkPassphrase: "Test SDF Network ; September 2015",
    submit: true,
    submitUrl: "https://soroban-testnet.stellar.org",
    address: address.address,
  });
  console.log(signedTrans.signerAddress);
  console.log(signedTrans.signedTxXdr, " signed");
  return signedTrans.signedTxXdr;
};

export default kit;
