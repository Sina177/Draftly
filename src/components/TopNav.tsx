"use client";
import {Sun, Moon, User} from "lucide-react";


export default function TopNav() {
  return ( 
    <nav className="flex items-center justify-between bg-white p-4 border-b border-blue-400 h-[7vh] min-h-10 overflow-hidden">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <img src="draftly-logo.svg" alt="Logo" className="h-10 w-auto" />
      </div>
      {/* Navigation Links */}
      <div className="flex items-center gap-4">
        <a href="#">History</a>
        <a href="#">Projects</a>
        <a href="#">Pricing</a>
        <Sun size={20}/>
        <User size={20}/>
      </div>
    </nav>
  )
}