import Link from "next/link"

export default function TransactionResult({ result, mode }) {

  const { id, date, description, payer, split_members, recipient } = result

  return (
    <Link href={`/`} className="flex justify-start items-center border border-slate-200 rounded-2xl p-4 gap-4">
      <span className="material-symbols-outlined"
      style={{fontSize: '8rem'}}>receipt_long</span>
      <article>
        <p className="text-lg font-bold">{date}</p>
        <p className="">{description}</p>
        <p>{`Members:  ${split_members.length}`}</p>
        <p>{`Payer: ${payer}`}</p>
      </article>
    </Link>
  )
}
