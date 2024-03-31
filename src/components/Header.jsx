'use client'

import Link from "next/link";
import DarkModeSwitch from "./DarkModeSwitch";
import Brand from "./Brand";

export default function Header() {

  
  return (
    <div className="flex justify-center gap-4 items-center">
      <Brand/>
      <div className="flex items-center justify-end gap-4 w-full max-w-6xl">
        
        <nav className="flex justify-center items-center gap-4">
          {/* <Link className='hover:text-teal-400' href={'/users'}>Users</Link>
          <Link className='hover:text-teal-400' href={'/transactions'}>Transactions</Link>
          <Link className='hover:text-teal-400' href={'/settlements'}>Settlements</Link> */}
          <Link href='/'>Home</Link>
          <Link href='/about'>About</Link>
          <DarkModeSwitch/>
        </nav>
        {/* <nav className="flex justify-center items-center gap-4 sm:hidden">
          <Link className='hover:text-teal-400 flex justify-center items-center' href={'/users'}>
          <span className="material-symbols-outlined">person</span>
          </Link>
          <Link className='hover:text-teal-400 flex justify-center items-center' href={'/transactions'}>
          <span className="material-symbols-outlined">receipt_long</span>
          </Link>
          <Link className='hover:text-teal-400 flex justify-center items-center' href={'/settlements'}>
          <span className="material-symbols-outlined">handshake</span>
          </Link>
          <Link href='/'>Home</Link>
          <Link href='/about'>About</Link>
          <DarkModeSwitch/>
        </nav> */}

        

      </div>
    </div>
  )
}
