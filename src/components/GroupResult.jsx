import { setCurrentGroupId } from "@/functions/LocalStorageFunc";
import Link from "next/link"
import { useRouter } from "next/navigation";
import { computeTotalSpent } from "./GroupDetails";

export default function GroupResult({ result, mode }) {
  const { id, name, users, transactions, reimbursements } = result
  const hasReimbursements = reimbursements && reimbursements.length !== 0
  const hasTransactions = transactions && transactions.length !== 0
  const router = useRouter();

  const totalSpent = computeTotalSpent(result)

  const handleGoTo = () => {
    setCurrentGroupId({groupId: id})
    router.push(`/groups/${id}`);
  }

  return (
    <button onClick={handleGoTo} className="flex flex-col justify-center flex-1 text-left items-center bg-gray-300 rounded-2xl p-4 gap-4 cursor-pointer hover:bg-teal-300">
      <span className="material-symbols-outlined"
      style={{fontSize: '4rem'}}>group</span>
      <article className="text-center">
        <p className="w-48 text-lg font-bold overflow-ellipsis whitespace-nowrap overflow-hidden">{name}</p>
        <p>{`${users.length} members`}</p>
        <p>{`Total: ${totalSpent}`}</p>
        {!hasTransactions && <p className="font-bold text-gray-600">No Transactions</p>}
        {hasTransactions && !hasReimbursements && <p className="font-bold text-green-600">All Settled</p>}
        {hasTransactions && hasReimbursements && <p className="font-bold text-teal-600">Settle Up</p>}

      </article>
    </button>
  )
}
