
export default function UserResult({ result, mode }) {

  const { id, name, paid, share, net } = result
  return (
    <span /*href={`/users/${id}`}*/ className="flex justify-start items-center border border-slate-200 rounded-2xl p-4 gap-4 hover:bg-teal-200 hover:shadow-md">
      <span className="material-symbols-outlined"
      style={{fontSize: '6rem'}}>account_circle</span>
      <article className=" overflow-hidden">
        <p className="text-lg font-bold text-ellipsis whitespace-nowrap overflow-hidden">{name}</p>
        <p>{`Paid For:  ${paid.toLocaleString()}`}</p>
        <p>{`Share: ${share.toLocaleString()}`}</p>
        <p>{`Net: ${net.toLocaleString()}`}</p>
      </article>
    </span>
  )
}
