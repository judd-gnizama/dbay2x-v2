import Link from "next/link"

export default function TransactionResult({ result, mode }) {

  const { id, date, description, payer, split_members, recipient } = result

  return (
    <Link href={`/transactions/${id}`} className="flex justify-center items-center border border-slate-200 rounded-2xl p-4 gap-4 hover:bg-teal-200 hover:shadow-md flex-wrap">
      <span className="material-symbols-outlined"
      style={{fontSize: '6rem'}}>receipt_long</span>
      <article>
        <p className="text-lg font-bold">{date}</p>
        <p className="">{description}</p>
        <p>{`Members:  ${split_members.length}`}</p>
        <p>{`Payer: ${payer}`}</p>
      </article>
    </Link>
  )
}
