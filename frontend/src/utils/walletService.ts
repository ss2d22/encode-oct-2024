import {
  StellarWalletsKit,
  WalletNetwork,
  allowAllModules,
   FREIGHTER_ID,
} from "@creit.tech/stellar-wallets-kit";

const kit: StellarWalletsKit = new StellarWalletsKit({
  network: WalletNetwork.TESTNET,
  selectedWalletId: FREIGHTER_ID,
  modules: allowAllModules(),
});

export default kit;
