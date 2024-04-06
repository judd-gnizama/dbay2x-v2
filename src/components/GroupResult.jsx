import { setCurrentGroupId } from "@/functions/LocalStorageFunc";
import Link from "next/link"
import { useRouter } from "next/navigation";
import { computeTotalSpent } from "./GroupDetails";

export default function GroupResult({ result, mode }) {
  const { id, name, users, transactions, reimbursements } = result
  const isSettled = reimbursements && reimbursements.length === 0 && users && users.length !== 0;
  const router = useRouter();

  const totalSpent = computeTotalSpent(result)

  const handleGoTo = () => {
    setCurrentGroupId({groupId: id})
    router.push(`/groups/${id}`);
  }

  return (
    <button onClick={handleGoTo} className="flex max-sm:flex-col justify-center text-left items-center border border-slate-200 rounded-2xl p-4 gap-4 cursor-pointer hover:bg-teal-300">
      <span className="material-symbols-outlined"
      style={{fontSize: '4rem'}}>group</span>
      <article>
        <p className="text-lg font-bold">{name}</p>
        <p>{`Members:  ${users.length}`}</p>
        <p>{`Total Spent: ${totalSpent}`}</p>
        <p className="font-bold"
        style={{color: isSettled ? 'green' : 'red'}}
        >{isSettled ? 'All Settled' : 'Needs Settling'}</p>
      </article>
    </button>
  )
}
