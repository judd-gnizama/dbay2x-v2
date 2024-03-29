'use client'

import Link from "next/link";
import DarkModeSwitch from "./DarkModeSwitch";

export default function Header() {

  return (
    <div className="flex justify-center items-center text-gray-800">
      <div className="flex p-4 pt-8 items-center justify-end gap-4 w-full max-w-6xl">
        <nav className="flex justify-center items-center gap-4">
          <Link href='/'>Home</Link>
          <Link href='/about'>About</Link>
          <DarkModeSwitch/>
        </nav>
      </div>
    </div>
  )
}
