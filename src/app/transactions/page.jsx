import AddItem from "@/components/AddItem";
import SearchBox from "@/components/SearchBox";

export default function TransactionsPage() {

  const type = 'transaction'

  return (
    <div className="flex justify-center">
      <div className="grid gap-4 w-full max-w-6xl p-4"
      style={{gridTemplateRows: "auto 1fr"}}
      >
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-3xl font-bold">Transactions</h1>
          <AddItem type={type}/>
        </div>
        <SearchBox type={type}/>
      </div>
    </div>
  )
}