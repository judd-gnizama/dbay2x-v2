
export function computeTotalSpent(group) {
  let totalSpent = 0
  group.transactions.forEach(transaction => transaction.type === 'Expense' ? totalSpent+=transaction.amount: 0)
  return totalSpent
}

export default function GroupDetails({group}) {

  const noOfUsers = group?.users?.length ? group.users.length : 0
  const noOfTransactions = group?.transactions?.length ? group.transactions.length : 0
  const noOfReimbursements = group?.reimbursements?.length ? group.reimbursements.length : 0
  const totalSpent = computeTotalSpent(group);

  return (
    <div className="flex gap-x-4 py-2 flex-wrap items-center">
      {/* <p className="">
        {`Users: `}
        <strong className="font-bold">{noOfUsers}</strong>
      </p>
      <p className="">
        {`Transactions: `}
        <strong className="font-bold">{noOfTransactions}</strong>
      </p> */}
      <p>
        {`Total Spent: `} 
        <strong className="font-bold">{totalSpent.toLocaleString()}</strong>
      </p>
      {noOfTransactions !== 0 && 
        <p className={`font-bold text-white p-1 px-2 rounded-full ${noOfReimbursements === 0 ? 'bg-green-500 ' : 'bg-red-300'}`}>{`${noOfReimbursements === 0 ? 'All Settled!' : 'Needs Settling'}`}</p>
      }
    </div>
  )
}
