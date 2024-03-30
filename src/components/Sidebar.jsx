'use client'
import Link from "next/link";
import { useState } from "react"
import LocalStorageManager from "./LocalStorageManager";

export default function Sidebar() {

  const [ showSidebar , setShowSidebar] = useState(false);
  const groups = [
    'Travel to Bohol',
    'Christmas Vacation at CDO',
    'Trip to Taiwan', 
    'Staycation at IT Park',
    'Christmas Vaceawfeafeafe ef awef awef wefawef awef awef awef eation at CDO',
    'Trip to Taiwan', 
    'Staycation at IT Park',
    'Christmas Vacation at CDO',
    'Trip to Taiwan', 
    'Staycation at IT Park',
    'Christmas Vacation at CDO',
    'Trip to Taiwan', 
    'Staycation at IT Park',
    'Christmas Vacation at CDO',
    'Trip to Taiwan', 
    'Staycation at IT Park',
    'Christmas Vacation at CDO',
    'Trip to Taiwan', 
    'Staycation at IT Park',
    'Christmas Vacation at CDO',
    'Trip to Taiwan', 
    'Staycation at IT Park',
    'Christmas Vacation at CDO',
    'Trip to Taiwan', 
    'Staycation at IT Park',
    'Christmas Vacation at CDO',
    'Trip to Taiwan', 
    'Staycation at IT Park'
  ]

  return (
    <div className="bg-slate-200 dark:bg-gray-600 p-4 max-w-7xl z-10 h-full mr-8 transition-all duration-300"
    style={{position: 'absolute'}}
    >
      <div className="flex flex-col justify-start gap-4">
        
        <span className="material-symbols-outlined p-2 w-fit cursor-pointer hover:bg-slate-300 rounded-full" style={{fontSize: '2rem'}}
        onClick={() => showSidebar === false ? setShowSidebar(true) : setShowSidebar(false)}>menu</span>
        
        <div className="flex items-center w-fit gap-2 p-2 cursor-pointer hover:bg-slate-300 rounded-full z-10">
          <span className="material-symbols-outlined "
          style={{fontSize: '2rem'}}>group_add</span>
          <p hidden={!showSidebar}>Create Group</p>
        </div>

        {showSidebar && 
        <div className="flex flex-col gap-2 pl-2" >
          <h2 className="font-bold">Available Groups</h2>
          <div className="grid gap-2 max-h-64 overflow-y-scroll">
            {groups && groups.map((group, index) => 
              <Link key={index} href="/" 
              className="whitespace-nowrap overflow-hidden text-nowrap text-ellipsis hover:text-teal-400"
              >{`> ${group}`}</Link>
            )}            
          </div>
          
          <LocalStorageManager/>

        </div>}
      </div>
      

    </div>
  )
}
