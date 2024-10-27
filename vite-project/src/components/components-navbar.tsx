import React from 'react'
import WalletConnectButton from "@/components/wallet_button.tsx";

const Navbar: React.FC = () => {
  return (
    <nav className="flex items-center justify-between p-6 bg-black text-white">
      <a href="/" className="text-3xl font-bold text-[#B9B9B9] hover:text-[#F3F3F3]" style={{ fontFamily: "'Orbitron', sans-serif" }}>
        dework
      </a>
      <div className="flex space-x-6">
        <a
          className="text-[#B9B9B9] hover:text-[#F3F3F3] transition-colors"
          href="/"
        >
          Home
        </a>
        <a
          className="text-[#B9B9B9] hover:text-[#F3F3F3] transition-colors"
          href="/explore"
        >
          Explore
        </a>
        <a
          className="text-[#B9B9B9] hover:text-[#F3F3F3] transition-colors"
          href="/dashboard"
        >
          Dashboard
        </a>
      </div>
      <WalletConnectButton />
    </nav>
  )
}

export default Navbar