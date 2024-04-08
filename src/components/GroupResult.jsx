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
    <button onClick={handleGoTo} className="flex flex-col justify-center text-left items-center bg-gray-300 rounded-2xl p-4 gap-4 cursor-pointer hover:bg-teal-300">
      <span className="material-symbols-outlined"
      style={{fontSize: '4rem'}}>group</span>
      <article className="text-center">
        <p className="text-lg font-bold">{name}</p>
        <p>{`${users.length} members`}</p>
        <p>{`Total: ${totalSpent}`}</p>
        {hasTransactions && !hasReimbursements && <p className="font-bold text-green-600">All Settled</p>}
        {hasTransactions && hasReimbursements && <p className="font-bold text-teal-600">Settle Up</p>}

      </article>
    </button>
  )
}
