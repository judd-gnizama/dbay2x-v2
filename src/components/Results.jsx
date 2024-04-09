import AddItem from "./AddItem"
import SettlementResult from "./SettlementResult"
import TransactionResult from "./TransactionResult"
import UserResult from "./UserResult"


export function sortItems({type, itemList}) {
  if (type === 'name') {
    itemList.sort((a, b) => a.name.localeCompare(b.name))
  } else if (type === 'date') {
    itemList.sort((a, b) => new Date(a.date).valueOf() - new Date(b.date).valueOf())
  } else if (type === 'amount') {
    itemList.sort((a, b) => b.amount - a.amount)
  } 
  return itemList
}


export default function Results({ type, search, results }) {
  
  if (type === 'user') {
    sortItems({type: 'name', itemList: results})
  } else if (type === 'transaction') {
    sortItems({type: 'date', itemList: results})
  } else if (type === 'settlement') {
    sortItems({type: 'amount', itemList: results})
  }

  return (
    <div className="grid gap-4">
      {search && <span>Showing results for {search}</span>}
      {results && results.length > 0 ? 
        <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
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
