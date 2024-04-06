import { getUserInGroup } from "@/functions/LocalStorageFunc";
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function TransactionResult({ result, mode }) {

  const { id, date, icon, description, payer, split_members, split_mode,  type, amount, recipient } = result
  const pathname = usePathname();
  const groupId = parseInt(pathname.split('/').pop())  
  const userPayer = getUserInGroup({groupId: groupId, userId: payer})
  const userRecipient = getUserInGroup({groupId: groupId, userId: recipient})

  return (
    <Link href={`/transactions/${id}?mode=edit&groupId=${groupId}`} className="flex justify-start max-sm:justify-center items-center max-sm:flex-wrap  border border-slate-200 rounded-2xl p-4 gap-4 hover:bg-teal-200 hover:shadow-md">
      <span className="material-symbols-outlined"
      style={{fontSize: '6rem'}}>{icon}</span>
      <article className=" overflow-hidden">
        <p className="text-lg font-bold overflow-hidden text-ellipsis whitespace-nowrap max-sm:text-center">{description}</p>
        <p className="">Date: {date}</p>
        <p>{`Type: `} 
          <strong className={`font-bold ${type === 'Expense' ? 'text-red-400' : 'text-green-400'}`}>{type}</strong>
          </p>
        <p className="">Amount: {amount.toLocaleString()}</p>
        {type === 'Expense' ? 
          <>
            <p>{`Payer: ${userPayer.name}`}</p>
            {/* <p className="">Split: {split_mode}</p>
            <p>{`Members:  ${split_members.length}`}</p> */}
          </>
          :
          <>
            {/* <p>{`From: ${userPayer.name}`}</p>
            <p>{`To: ${userPayer.name}`}</p> */}
          </>
      }
      </article>
    </Link>
  )
}
