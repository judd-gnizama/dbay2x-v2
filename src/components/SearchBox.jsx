'use client'

import { useEffect, useState } from "react"
import Results from "./Results";
import { addUserToGroup, getAllUniqueUserIds, getGroupById } from "@/functions/LocalStorageFunc";

export default function SearchBox({ type, groupId }) {

  const [ search, setSearch ] = useState("");
  const [ data, setData ] = useState([]);
  const [ results, setResults ] = useState([]);
  const [ canAdd, setCanAdd ] = useState(false);

  const handleSearch = (searchTerm, type) => {
    let searchResults = []
    if (Object.keys(data).length !== 0) {
      if (type === 'user') {
        if(searchTerm) {
          searchResults = data.users.filter((user) => user.name.toLowerCase().includes(searchTerm.toLowerCase()))
          
          const index = searchResults.findIndex(user=>user.name.toLowerCase() === searchTerm.toLowerCase())

          index === -1 ? setCanAdd(true) : setCanAdd(false)

        } else {
          searchResults = data.users
          setCanAdd(false);
        }
      } else if (type === 'transaction') {
        if (searchTerm) {
          searchResults = data.transactions.filter((transaction)=> transaction.description.toLowerCase().includes(searchTerm.toLowerCase()))

          const index = searchResults.findIndex(transaction => 
            transaction.description.trim("").toLowerCase() === search.trim("").toLowerCase()) 
          
          index === -1 ? setCanAdd(true) : setCanAdd(false)
          

        } else {
          searchResults = data.transactions
          setCanAdd(false);
        }
      } else {
        searchResults = [];
      
      }
      setResults(searchResults);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === 'user') {
      if (canAdd) {
        // add new user
        const userIds = getAllUniqueUserIds();
        const newUser = {
          id: Math.max(...userIds) + 1,
          name: search,
          paid: 0,
          share: 0,
          net: 0,
        }
        addUserToGroup({ groupId: groupId, newUser: newUser})
        setSearch("")
      }
      
    } else if (type === 'transaction') {
      if (canAdd) {
        // add new transaction
        // go to page
        console.log(`Add new ${search}`)
      }
    }
  }


  useEffect(() => {
    const currentGroup = getGroupById({groupId: groupId})
    setData(currentGroup);
  }, [canAdd])

  useEffect(() => {
    if (data){
      handleSearch(search, type)
    }
  }, [data, search, type])


  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <div className="relative flex items-center flex-1">
          <input value={search} onChange={(e) => setSearch(e.target.value)} className="bg-slate-200 dark:bg-gray-500 dark:text-gray-100 p-2 px-4 rounded-full w-full" type="text" placeholder={`Search/Enter New ${type}`} 
          />
          <span 
          className="material-symbols-outlined text-slate-600 absolute right-2 rounded-full cursor-pointer hover:bg-slate-300"
          style={{visibility: search==="" ? "hidden" : "visible"}}
          onClick={() => setSearch("")}
          >close</span>
        </div>
        <button type='submit' className={`p-2 bg-teal-200 poine rounded-lg hover:opacity-80 ${canAdd ? '' : 'pointer-events-none bg-gray-400 opacity-50'}`}>Add</button>
      </form>
      <div className="">
        {results && 
          <Results type={type} search={search} results={results}/>
        }
      </div>
    </div>
  )
}
