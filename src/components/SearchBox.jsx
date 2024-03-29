'use client'

import { useEffect, useState } from "react"
import Results from "./Results";

export default function SearchBox({ type }) {

  const [ search, setSearch ] = useState("");
  const [ isMounted, setIsMounted ] = useState(false);
  const [ data, setData ] = useState([]);
  const [ results, setResults ] = useState([]);


  const handleSearch = (searchTerm, type) => {
    if (!data) setResults([]);
    if (!searchTerm) setResults([]);
    if (type === 'user') {
      setResults(data.users.filter((user) => user.name === searchTerm))
    } else if (type === 'group') {
      setResults(data.groups.filter((group)=> group.name === searchTerm))
    } else {
      setResults([]);
    }
  }

  useEffect(() => {
    setIsMounted(true);
    const storedData = localStorage.getItem('myDataKey');
    if (storedData) {
      setData(JSON.parse(storedData));
    }
    return () => setIsMounted(false);
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(search, type)
  }

  return (
    <div className="flex flex-col gap-4">
      {
        isMounted && <>
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
        </>
      }
    </div>
  )
}
