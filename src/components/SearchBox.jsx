'use client'

import { useState } from "react"
import Results from "./Results";

export default function SearchBox({ type }) {

  const [ search, setSearch ] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div className="">
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
        {search && 
          <Results type={type} search={search}/>
        }
      </div>
    </div>
  )
}
