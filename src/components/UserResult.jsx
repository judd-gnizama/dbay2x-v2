import Link from "next/link"

export default function UserResult({ result, mode }) {

  const { id, name, paid, share, current_balance, total_balance, total_net} = result

  const visualAdj = total_balance === 0 ? -current_balance : 0;
  const isToReceive = total_balance < 0 || current_balance > 0 && total_balance === 0
  const isSettled = share === total_net;
  const notZero = share !== 0 && total_net !== 0;

  return (
    <Link href={`/users/${id}`} className="flex  flex-col justify-start max-sm:justify-center items-center max-sm:flex-wrap border border-slate-200 rounded-2xl p-4 gap-4 hover:bg-teal-200 hover:shadow-md active:opacity-40 transition-opacity duration-300 relative">
      {isSettled && notZero && <span className="material-symbols-outlined bg-green-500 rounded-full absolute top-[1rem] right-[1rem]">check_circle</span>}
      <span className="material-symbols-outlined"
      style={{fontSize: '6rem'}}>account_circle</span>
      <article className="w-full overflow-hidden grid grid-cols-2 gap-x-2 justify-center">
        <p className="text-lg font-bold text-ellipsis whitespace-nowrap overflow-hidden col-span-2 text-center">{name}</p>
        <p>Share: </p>
        <p>{share.toLocaleString()}</p>
        <p className="">Contributed: </p>
        <p>{paid.toLocaleString()}</p>
        <p>{`${isToReceive ? 'Received:':'Paid:'}`}</p>
        <p className="flex items-center gap-2">{`${Math.abs(current_balance + visualAdj).toLocaleString()} / ${Math.abs(total_balance + visualAdj).toLocaleString()}`}</p>
        {/* <p>Total Net: </p>
        <p>{total_net.toLocaleString()}</p> */}
        {/* {share !== 0 || total_net !== 0 && 
        <p className= {`justify-self-center col-span-2 p-2 font-bold ${isSettled ? 'text-green-500' : 'text-red-400'}`}>
          {isSettled ? 'All Settled' : 'Needs Settling'}</p>} */}
      </article>
    </Link>
  )
}
