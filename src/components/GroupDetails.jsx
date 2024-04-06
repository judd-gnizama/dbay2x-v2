
export default function GroupDetails({group}) {

  const noOfUsers = group?.users?.length ? group.users.length : 0
  const noOfTransactions = group?.transactions?.length ? group.transactions.length : 0
  const noOfReimbursements = group?.reimbursements?.length ? group.reimbursements.length : 0
  let totalSpent = 0
  group.transactions.forEach(transaction => transaction.type === 'Expense' ? totalSpent+=transaction.amount: 0)

  // const totalSpent = group.transactions.reduce((total, transaction) => transaction.type === 'Expense' ? total + transaction.amount : 0, 0);

  return (
    <div className="flex gap-4 py-2">
      <p className="">
        {`Users: `}
        <strong className="font-bold">{noOfUsers}</strong>
      </p>
      <p className="">
        {`Transactions: `}
        <strong className="font-bold">{noOfTransactions}</strong>
      </p>
      <p>
        {`Total Spent: `} 
        <strong className="font-bold">{totalSpent.toLocaleString()}</strong>
      </p>
      {noOfTransactions !== 0 && 
        <p className={`font-bold ${noOfReimbursements === 0 ? 'text-green-500' : 'text-red-300'}`}>{`${noOfReimbursements === 0 ? 'All Settled!' : 'Needs Settling'}`}</p>
      }
    </div>
  )
}
