'use client'
import { useState } from "react"

export default function Sidebar({ show }) {

  const [ showSidebar , setShowSidebar] = useState(false);

  return (
    <div className="bg-slate-100">
      <div className="p-4">
        <span class="material-symbols-outlined size-12 text-center place-content-center cursor-pointer" style={{fontSize: '2rem'}}
        onClick={() => showSidebar === false ? setShowSidebar(true) : setShowSidebar(false)}>menu</span>
      </div>
      
      {showSidebar && 
      <div className="px-4 w-48">
        <button>Create Group</button>
        <ul>
          <li>Group 1</li>
          <li>Group 2</li>
          <li>Group 3</li>
        </ul>
      </div>}

    </div>
  )
}
