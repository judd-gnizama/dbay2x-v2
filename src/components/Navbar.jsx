import Link from "next/link";
import Brand from "./Brand";

export default function Navbar() {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <Brand/>
      <div className="flex justify-center items-center gap-4">
        <Link className='p-3 bg-slate-300' href={'/users'}>Users</Link>
        <Link className='p-3 bg-slate-300' href={'/groups'}>Groups</Link>
        <Link className='p-3 bg-slate-300' href={'/transactions'}>Transactions</Link>
      </div>
    </div>
  )
}
