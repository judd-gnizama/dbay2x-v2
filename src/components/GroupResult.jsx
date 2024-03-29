import Link from "next/link"

export default function GroupResult({ result, mode }) {

  const { id, name, members, transactions, reimbursements } = result

  const computeTotalSpent = (transactions) => {
    const expenseTransactions = transactions.filter((transaction) => transaction.type === 1)
    const totalSpent = expenseTransactions.reduce((acc, expense) => acc += expense.amount, 0) // 0 is the initial value of acc
    return totalSpent
  }

  return (
    <Link href={'#'} className="flex justify-start items-center border border-slate-200 rounded-2xl p-4 gap-4">
      <span className="material-symbols-outlined"
      style={{fontSize: '8rem'}}>group</span>
      <article>
        <p className="text-lg font-bold">{name}</p>
        <p>{`Members:  ${members.length}`}</p>
        <p>{`Total Spent: ${computeTotalSpent(transactions)}`}</p>
        <p>{`Settled: ${reimbursements.length !== 0}`}</p>
      </article>
    </Link>
  )
}