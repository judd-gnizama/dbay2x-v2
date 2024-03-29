import Link from "next/link";
import Brand from "./Brand";

export default function Navbar() {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <Brand/>
      <div className="flex justify-center items-center gap-4">
        <Link className='p-3 bg-slate-300' href={'/users/234'}>Users</Link>
        <Link className='p-3 bg-slate-300' href={'/groups/234'}>Groups</Link>
        <Link className='p-3 bg-slate-300' href={'/transactions/234'}>Transactions</Link>
        <Link className='p-3 bg-slate-300' href={'/settlements/234'}>Settlements</Link>
      </div>
    </div>
  )
}
