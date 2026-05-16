"use client";
import {Sun, Moon, User} from "lucide-react";

export default function TopNav() {
  return ( 
    <nav className="flex items-center justify-between bg-white p-4 border-b border-blue-400 h-[7vh] min-h-10 overflow-hidden">
      {/* Logo */}
      <div className="flex items-center gap-3 bg-blue-300">
        <img src="/favicon.ico" alt="Logo" className="h-10 w-auto" />
        Draftly
      </div>
      {/* Navigation Links */}
      <div className="flex items-center gap-4 bg-green-300">
        <a href="#">History</a>
        <a href="#">Projects</a>
        <a href="#">Pricing</a>
        <Sun size={20}/>
        <User size={20}/>
      </div>
    </nav>
  )
}