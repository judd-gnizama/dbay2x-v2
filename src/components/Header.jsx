'use client'

import Link from "next/link";
import DarkModeSwitch from "./DarkModeSwitch";
import Brand from "./Brand";

export default function Header() {

  
  return (
    <div className="flex justify-center gap-4 items-center text-gray-800 p-4">
      <Brand/>
      <div className="flex items-center justify-end gap-4 w-full max-w-6xl">
        <nav className="flex justify-center items-center gap-4">
          <Link className='hover:text-teal-400' href={'/users'}>Users</Link>
          <Link className='hover:text-teal-400' href={'/transactions'}>Transactions</Link>
          <Link className='hover:text-teal-400' href={'/settlements'}>Settlements</Link>
          {/* <Link href='/'>Home</Link>
          <Link href='/about'>About</Link> */}
          <DarkModeSwitch/>
        </nav>
      </div>
    </div>
  )
}
