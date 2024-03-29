import Link from "next/link"

export default function UserResult({ result, mode }) {

  const { id, name, total_paid, total_share, total_net } = result

  return (
    <Link href={'#'} className="flex justify-start items-center border border-slate-200 rounded-2xl p-4 gap-4">
      <span className="material-symbols-outlined"
      style={{fontSize: '8rem'}}>account_circle</span>
      <article>
        <p className="text-lg font-bold">{name}</p>
        <p>{`Paid For:  ${total_paid}`}</p>
        <p>{`Share: ${total_share}`}</p>
        <p>{`Receivables: ${total_net}`}</p>
      </article>
    </Link>
  )
}