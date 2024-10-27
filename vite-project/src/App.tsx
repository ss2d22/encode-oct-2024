"use client";

import "./App.css";
import {Navigate, Route, Routes} from "react-router-dom";
import {Footer} from "./components/footer";
import Dashboard from "./pages/dashboard_user";
import Explore from "./pages/explore";
import Details from "./pages/detail";
import {ReactNode, useState} from "react";
import {fetchAddress} from "@/utils/walletService.ts";
import {HomePageComponent} from "@/components/home-page.tsx";
import ComponentsNavbar from "@/components/components-navbar.tsx";
import {useEffectAsync} from "@/hooks/useEffectAsync.tsx";




const App = () => {
    const [address, setAddress] = useState<string | null>(null);

    useEffectAsync(async () => {
        const Faddess = async () => {
            const Waddress = await fetchAddress()
            setAddress(Waddress as string);
            console.log(Waddress)
        }
        if(!address){
            console.log("fetching address")
            await Faddess()
        }
        console.log(address)
    }, [])



    return(
        <div>
            <ComponentsNavbar/>
            <Routes>
                <Route path="/" element={<HomePageComponent/>}/>
                <Route path="/dashboard" element={

                    <Dashboard/>
               }/>
                <Route path="/explore" element={
                    <Explore/>
                }/>
                <Route path="/details" element={
                    <Details/>

                }/>
            </Routes>
            <Footer/>
        </div>
    );
}

export default App;
