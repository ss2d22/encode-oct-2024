"use client";

import "./App.css";
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Navbar } from "./components/navbar";
import { Footer } from "./components/footer";
import Home from "./pages/home";
import DashboardUser from "./pages/dashboard_user";


function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard-user" element={<DashboardUser />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;