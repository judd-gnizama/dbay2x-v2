'use client'

import { useState } from "react"
import Results from "./Results";

export default function SearchBox({ type }) {

  const [ search, setSearch ] = useState("");
  const results =  [
    {
      id: 1,
      name: 'Judd',
      total_paid: 10000,
      total_share: 32340,
      total_net: 423420,
    },
    {
      id: 2,
      name: 'Jon',
      total_paid: 423420,
      total_share: 1000,
      total_net: 1000,
    },
    {
      id: 3,
      name: 'Jyll',
      total_paid: 423420,
      total_share: 3234,
      total_net: 1000,
    },
    {
      id: 4,
      name: 'Mom',
      total_paid: 3234,
      total_share: 423420,
      total_net: 1000,
    },
    {
      id: 5,
      name: 'Maverick',
      total_paid: 10000,
      total_share: 32340,
      total_net: 423420,
    },
    {
      id: 6,
      name: 'Myles',
      total_paid: 423420,
      total_share: 1000,
      total_net: 1000,
    },
    {
      id: 7,
      name: 'Mae',
      total_paid: 423420,
      total_share: 3234,
      total_net: 1000,
    },
    {
      id: 8,
      name: 'Julie',
      total_paid: 3234,
      total_share: 423420,
      total_net: 1000,
    },
  ]

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={handleSubmit}>
        <div className="relative flex items-center">
          <input value={search} onChange={(e) => setSearch(e.target.value)} className="bg-slate-200 p-2 px-4 rounded-full w-full" type="text" placeholder={`Search ${type}`} 
          />
          <span 
          className="material-symbols-outlined text-slate-600 absolute right-2 rounded-full cursor-pointer hover:bg-slate-300"
          style={{visibility: search==="" ? "hidden" : "visible"}}
          onClick={() => setSearch("")}
          >close</span>
        </div>
      </form>
      <div className="">
        {results && 
          <Results type={type} search={search} results={results}/>
        }
      </div>
    </div>
  )
}
