'use client'

import { useEffect, useState } from "react"
import Results from "./Results";

export default function SearchBox({ type }) {

  const [ search, setSearch ] = useState("");
  const [ data, setData ] = useState([]);
  const [ results, setResults ] = useState([]);


  const handleSearch = (searchTerm, type) => {
    let searchResults = []
    if (!data) searchResults = [];
    if (type === 'user') {
      if(searchTerm) {
        searchResults = data.users.filter((user) => user.name.toLowerCase().includes(searchTerm.toLowerCase()))
      } else {
        searchResults = data.users
      }
    } else if (type === 'group') {
      if (searchTerm) {
        searchResults = data.groups.filter((group)=> group.name.toLowerCase().includes(searchTerm.toLowerCase()))
      } else {
        searchResults = data.groups
      }
    } else {
      searchResults = [];
    }
    setResults(searchResults);
  }

  useEffect(() => {
    const storedData = localStorage.getItem('myDataKey');
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, [])

  useEffect(() => {
    if (data){
      handleSearch(search, type)
    }
  }, [data, search, type])

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
