'use client'
import Link from "next/link";
import { useEffect, useState } from "react"
import LocalStorageManager from "./LocalStorageManager";
import { getCurrentGroup, getGroups, setCurrentGroupId } from "@/functions/LocalStorageFunc";

export default function Sidebar() {

  const [ showSidebar , setShowSidebar] = useState(false);
  const [ groups, setGroups ] = useState([]);

  const handleChangeGroup = (groupId) => {
    setCurrentGroupId({groupId: groupId})
    console.log(getCurrentGroup());
    setShowSidebar(false);
  }

  useEffect(() => {
    const storedGroups = getGroups();
    if (storedGroups && storedGroups.length > 0) {
      setGroups(storedGroups);
    }
  }, [])

  return (
    <div className="bg-slate-200 dark:bg-gray-600 p-4 max-w-7xl z-10 mr-8 min-h-full"
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
              <Link key={index} href={`/groups/${group.id}`} 
              className="whitespace-nowrap overflow-hidden text-nowrap text-ellipsis hover:text-teal-400"
              onClick={() => handleChangeGroup(group.id)}
              >{`> ${group.name}`}</Link>
            )}            
          </div>
          
          <LocalStorageManager/>

        </div>}
      </div>
      

    </div>
  )
}
