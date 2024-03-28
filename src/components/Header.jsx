'use client'

import Link from "next/link";
import Brand from "./Brand";
import DarkModeSwitch from "./DarkModeSwitch";
import Navbar from "./Navbar";
import UserComp from "./UserComp";
import GroupComp from "./GroupComp";
import { useState } from "react";

export default function Header() {

  const [ menu, toggleMenu ] = useState('hide'); 


  return (
    <div className="flex justify-center items-center text-gray-800 bg-teal-100">
      <div className="flex p-4 items-center justify-between gap-4 w-full max-w-6xl ">
        <Brand/>
        <nav className="flex justify-center items-center gap-4">
          <Link href='#'>Home</Link>
          <Link href='#'>About</Link>
          <DarkModeSwitch/>
        </nav>
      </div>
    </div>
  )
}
