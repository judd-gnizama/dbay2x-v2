import AddItem from "./AddItem"
import SettlementResult from "./SettlementResult"
import TransactionResult from "./TransactionResult"
import UserResult from "./UserResult"

export default function Results({ type, search, results }) {

  return (
    <div className="grid gap-4">
      {search && <span>Showing results for {search}</span>}
      {results && results.length > 0 ? 
        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
          {results.map((result, index) => {
            if (type === 'user') return <UserResult key={result.id} result={result}/>
            if (type === 'transaction') return <TransactionResult key={result.id} result={result}/>
            if (type === 'settlement') 
            {
              return <SettlementResult key={index} result={result}/>
            }
          })}
        </ul>
      : 
      <>
        <span className="text-sm">No {type}s found. </span>
      </>
      }
    </div>
  )
}
