"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"; // Adjust the import path based on your project structure
import { SettingsIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { isConnected } from "@stellar/freighter-api";
import getPublicKey from "@stellar/freighter-api";
import WalletConnectButton from "./wallet_button";


export function Navbar() {

  return (
    <nav className="bg-[#171717] shadow-md">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <a href="/" className="text-xl font-bold text-[#E7E7E7]">
                The Logo
              </a>
            </div>
            <div className="hidden ml-10 sm:flex sm:space-x-10">
              <a
                className="text-[#B9B9B9] mt-5 hover:text-[#F3F3F3] transition-colors"
                href="/"
              >
                Home
              </a>
              <a
                className="text-[#B9B9B9] mt-5 hover:text-[#F3F3F3] transition-colors"
                href="/"
              >
                Explore
              </a>
              <a
                className="text-[#B9B9B9] mt-5 hover:text-[#F3F3F3] transition-colors"
                href="/dashboard-user"
              >
                Dashboard
              </a>
            </div>
          </div>
          <div className="mt-4"><WalletConnectButton /></div>
          <div className="flex items-center sm:hidden">
            <Button variant="ghost" size="icon" aria-label="Open menu">
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="#F3F3F3" // This is the inner color of the SVG
                viewBox="0 0 24 24"
                stroke="#F3F3F3" // This will change the stroke (outline) color
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
