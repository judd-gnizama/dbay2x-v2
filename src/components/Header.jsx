'use client'

import Link from "next/link";
import DarkModeSwitch from "./DarkModeSwitch";
import Brand from "./Brand";
import Sidebar from "./Sidebar";

export default function Header() {

  
  return (
    <div className="grid place-items-center gap-4">
      {/* <Link href='/' className="material-symbols-outlined text-teal-400" style={{fontSize: '4rem'}}>request_quote</Link> */}
      <div className="flex items-center justify-between gap-4 w-full max-w-6xl relative p-2">
        <Brand/>  
        <nav className="flex justify-center items-center gap-4">
          {/* <Link className='hover:text-teal-400' href={'/users'}>Users</Link>
          <Link className='hover:text-teal-400' href={'/transactions'}>Transactions</Link>
          <Link className='hover:text-teal-400' href={'/settlements'}>Settlements</Link> */}
          {/* <Link href='/'>Home</Link>
          <Link href='/about'>About</Link> */}
        </nav>
        <Sidebar/>
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
