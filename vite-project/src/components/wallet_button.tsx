import { useEffect, useState } from 'react';
import {createButton, fetchAddress} from "@/utils/walletService.ts";

const WalletConnectButton = () => {
  const [, setWalletAddress] = useState<string | null>(null);
  useEffect(() => {
    const getAddress = async () => {
      const Waddress = await fetchAddress();
      setWalletAddress(Waddress as string);
    }
    getAddress()
    createButton("#walletC", setWalletAddress)
   }, []);

    return (
      <div id="walletC">
      </div>
  );
};

export default WalletConnectButton;
