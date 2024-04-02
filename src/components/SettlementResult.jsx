import { getCurrentGroup, getCurrentGroupId, getUserInGroup } from "@/functions/LocalStorageFunc"
import Link from "next/link"

export default function SettlementResult({ result, mode }) {

  const { from, to, amount } = result
  const currentGroupId = getCurrentGroupId();
  const fromUser = getUserInGroup({groupId: currentGroupId, userId: from})
  const toUser = getUserInGroup({groupId: currentGroupId, userId: to})

  return (
    <div className="flex justify-center items-center border border-slate-200 rounded-2xl p-4 gap-4 hover:bg-teal-200 hover:shadow-md flex-wrap cursor-pointer">
      <span className="font-bold">{fromUser.name}</span>
      <span>{`> ${amount} > `}</span>
      <span className="font-bold">{toUser.name}</span>
    </div>
  )
}
