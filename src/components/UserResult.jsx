
export default function UserResult({ result, mode }) {

  const { id, name, paid, share, net, _net, balance, total_paid } = result
  return (
    <span /*href={`/users/${id}`}*/ className="flex justify-start max-sm:justify-center items-center max-sm:flex-wrap border border-slate-200 rounded-2xl p-4 gap-4 hover:bg-teal-200 hover:shadow-md">
      <span className="material-symbols-outlined"
      style={{fontSize: '6rem'}}>account_circle</span>
      <article className=" overflow-hidden grid grid-cols-2 gap-x-2 justify-center">
        <p className="text-lg font-bold text-ellipsis whitespace-nowrap overflow-hidden col-span-2 max-sm:text-center">{name}</p>
        <p className="">Paid: </p>
        <p>{paid.toLocaleString()}</p>
        <p>Share: </p>
        <p>{share.toLocaleString()}</p>
        <p>{`${net < 0 ? 'To Receive:':'To Pay:'}`}</p>
        <p>{`${Math.abs(balance).toLocaleString()} / ${Math.abs(net).toLocaleString()}`}</p>


        {/* <p>Balance: </p>
        <p>{Math.abs(balance).toLocaleString()}</p> */}
        <p>Total Paid: </p>
        <p>{total_paid.toLocaleString()}</p>
      </article>
    </span>
  )
}
