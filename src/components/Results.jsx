import GroupResult from "./GroupResult"
import TransactionResult from "./TransactionResult"
import UserResult from "./UserResult"

export default function Results({ type, search, results }) {

  return (
    <div className="grid gap-4">
      {search && <span>Showing results for {search}</span>}
      {results && results.length > 0 ? 
        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map(result => {
            if (type === 'user') return <UserResult key={result.id} result={result}/>
            if (type === 'group') return <GroupResult key={result.id} result={result}/>
            if (type === 'transaction') return <TransactionResult key={result.id} result={result}/>
          })}
        </ul>
      : <span className="text-center text-xl font-bold">No results found.</span>}
    </div>
  )
}
