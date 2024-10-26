"use client";

import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Footer } from "./components/footer";
import Dashboard from "./pages/dashboard_user";
import Explore from "./pages/explore";
import Details from "./pages/detail";
import {useEffect} from "react";
import {fetchAddress} from "@/utils/walletService.ts";
import {HomePageComponent} from "@/components/home-page.tsx";
import ComponentsNavbar from "@/components/components-navbar.tsx";

const App = () => {
    useEffect(() => {
        fetchAddress()
    },[])

  return (
    <div>
      <ComponentsNavbar />
      <Routes>
        <Route path="/" element={<HomePageComponent />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/details" element={<Details />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
