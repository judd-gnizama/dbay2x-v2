import Link from "next/link"

export default function UserResult({ result, mode }) {

  const { id, name, paid, share, current_balance, total_balance, total_net} = result
  return (
    <Link href={`/users/${id}`} className="flex  flex-col justify-start max-sm:justify-center items-center max-sm:flex-wrap border border-slate-200 rounded-2xl p-4 gap-4 hover:bg-teal-200 hover:shadow-md active:opacity-40 transition-opacity duration-300">
      <span className="material-symbols-outlined"
      style={{fontSize: '6rem'}}>account_circle</span>
      <article className="w-full overflow-hidden grid grid-cols-2 gap-x-2 justify-center">
        <p className="text-lg font-bold text-ellipsis whitespace-nowrap overflow-hidden col-span-2 text-center">{name}</p>
        <p>Share: </p>
        <p>{share.toLocaleString()}</p>
        <p className="">Contributed: </p>
        <p>{paid.toLocaleString()}</p>
        <p>{`${total_balance < 0 ? 'Received:':'Paid:'}`}</p>
        <p>{`${Math.abs(current_balance).toLocaleString()} / ${Math.abs(total_balance).toLocaleString()}`}</p>
        <p>Total Net: </p>
        <p>{total_net.toLocaleString()}</p>
      </article>
    </Link>
  )
}
