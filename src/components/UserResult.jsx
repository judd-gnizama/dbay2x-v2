import Link from "next/link"

export default function UserResult({ result, mode }) {

  const { id, name, paid, share, net } = result
  return (
    <Link href={`/users/${id}`} className="flex justify-start items-center border border-slate-200 rounded-2xl p-4 gap-4 hover:bg-teal-200 hover:shadow-md flex-wrap">
      <span className="material-symbols-outlined"
      style={{fontSize: '6rem'}}>account_circle</span>
      <article>
        <p className="text-lg font-bold">{name}</p>
        <p>{`Paid For:  ${paid}`}</p>
        <p>{`Share: ${share}`}</p>
        <p>{`Net: ${net}`}</p>
      </article>
    </Link>
  )
}
