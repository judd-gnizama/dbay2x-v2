import Link from "next/link"

export default function GroupResult({ result, mode }) {

  console.log(result)
  const { id, name, users, transactions, reimbursements } = result
  const isSettled = reimbursements && reimbursements.length !== 0;

  const computeTotalSpent = (transactions) => {
    const expenseTransactions = transactions.filter((transaction) => transaction.type === 1)
    const totalSpent = expenseTransactions.reduce((acc, expense) => acc += expense.amount, 0) // 0 is the initial value of acc
    return totalSpent
  }

  return (
    <Link href={`/groups/${id}`} className="flex justify-center items-center border border-slate-200 rounded-2xl p-4 gap-4 cursor-pointer hover:bg-teal-300">
      <span className="material-symbols-outlined"
      style={{fontSize: '4rem'}}>group</span>
      <article>
        <p className="text-lg font-bold">{name}</p>
        <p>{`Members:  ${users.length}`}</p>
        <p>{`Total Spent: ${computeTotalSpent(transactions)}`}</p>
        <p className="font-bold"
        style={{color: isSettled ? 'green' : 'red'}}
        >{isSettled ? 'All Settled' : 'Needs Settling'}</p>
      </article>
    </Link>
  )
}
