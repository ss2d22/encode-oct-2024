import kit from "./utils/walletService.ts";
import {
    ISupportedWallet
} from '@creit.tech/stellar-wallets-kit';
import {useEffect, useState} from "react";

const App = () => {
    useEffect(() => {
        const tryConnect = async () => {
            const Waddress = await kit.getAddress()
            if(Waddress) {
                setAddress(Waddress.address)
                return
            }
            await kit.openModal({
                onWalletSelected: async (option: ISupportedWallet) => {
                    kit.setWallet(option.id);
                    const walletAddress = await kit.getAddress()
                    setAddress(walletAddress.address);
                },
                modalTitle: "Your wallet is not connected or has been disconnected due to inactivity so please connect again"
            })
        }
        tryConnect()
    }, [])
   const [address , setAddress] = useState("");
    const showConnctModal = async () => {
        await kit.openModal({
            onWalletSelected: async (option: ISupportedWallet) => {
                kit.setWallet(option.id);
               const walletAddress = await kit.getAddress()
                setAddress(walletAddress.address)
            },
            modalTitle: "connect your wallet to de work yourself"
        });


    }
  return (
    <>
      <h1 className="text-6xl text-center font-bold text-pink-500">pretty test</h1>
        <div className="justify-center items-center flex-col">
            {
                !address && <button
                    className="btn btn-primary btn-lg bg-black rounded-3xl text-white flex p-6"
                    onClick={showConnctModal}>
                    pretty button
                </button>
            }

        </div>
        {address ? <>
            <h1 className="text-6xl text-center font-bold text-pink-500">
                your address is {address}
            </h1>
        </> : <>
            <h1 className="text-6xl text-center font-bold text-pink-500">
                your wallet is not connected
            </h1>

        </>}
    </>
  );
};

export default App;
