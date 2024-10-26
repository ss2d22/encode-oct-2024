import { useEffect, useState } from 'react';
import {
  StellarWalletsKit,
  WalletNetwork,
  allowAllModules,
  FREIGHTER_ID,
  xBullModule,
  FreighterModule,
  AlbedoModule,
} from '@creit.tech/stellar-wallets-kit';

const WalletConnectButton = () => {
  const [kit, setKit] = useState<StellarWalletsKit | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [buttonText, setButtonText] = useState<string>("Connect to your wallet");

  useEffect(() => {
    const initializeKit = () => {
      setKit(new StellarWalletsKit({
        network: WalletNetwork.TESTNET,
        selectedWalletId: FREIGHTER_ID,
        modules: [
          new xBullModule(),
          new FreighterModule(),
          new AlbedoModule(),
        ]
      }));
    };
    initializeKit();
  }, []);

  const createButton = () => {
    if (kit) {
      kit.createButton({
        container: document.getElementById("walletButtonContainer") as HTMLElement,
        buttonText,
        onConnect: async ({ address }) => {
          handleConnection(address)
        },
        onDisconnect: () => {
          handleDisconnect();
        },
      });
    }
  };

  useEffect(() => {
    if (kit) {
      createButton();
    }
  }, [kit]);

  const handleConnection = (address: string) => {
    setWalletAddress(address);
    console.log("Wallet connected with address:", address);
    setButtonText(address);
  }

  const handleDisconnect = () => {
    setWalletAddress(null);
    console.log("Disconnected from wallet");
  };

  return (
    <div>
      <div id="walletButtonContainer"></div>
    </div>
  );
};

export default WalletConnectButton;
