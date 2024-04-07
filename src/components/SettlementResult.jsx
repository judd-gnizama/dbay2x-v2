import { getAllUniqueTransactionIds, getCurrentGroup, getCurrentGroupId, getUserInGroup } from "@/functions/LocalStorageFunc"
import { useRouter } from "next/navigation";


export default function SettlementResult({ result, mode }) {

  const { from, to, amount } = result
  const currentGroupId = getCurrentGroupId();
  const fromUser = getUserInGroup({groupId: currentGroupId, userId: from})
  const toUser = getUserInGroup({groupId: currentGroupId, userId: to})

  const router = useRouter();


  const handleCreateTransaction = () => {
    const transactionIds = getAllUniqueTransactionIds();
    const newTransactionId = Math.max(...transactionIds) + 1
    router.push(`/transactions/${newTransactionId}?groupId=${currentGroupId}&mode=add&type=Settlement&name=${fromUser.name} -> ${toUser.name}&amount=${amount}&from=${from}&to=${to}`)
    
  }

  return (
    <button onClick={handleCreateTransaction} className="flex flex-col gap-2 justify-center items-center border border-slate-200 rounded-2xl p-4  hover:bg-teal-200 hover:shadow-md cursor-pointer active:opacity-40 transition-opacity duration-300">
      <div className="flex justify-center items-center gap-4 flex-wrap">
        <span className="font-bold">{fromUser.name}</span>
        <span>{`> ${amount.toLocaleString()} > `}</span>
        <span className="font-bold">{toUser.name}</span>
      </div>
      <p className="text-gray-400 text-sm leading-tight">Click to Settle</p>
    </button>
  )
}
