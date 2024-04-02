'use client'
import Link from "next/link";
import { useEffect, useState } from "react"
import LocalStorageManager from "./LocalStorageManager";
import { getCurrentGroup, getCurrentGroupId, getGroups, setCurrentGroupId } from "@/functions/LocalStorageFunc";
import { useRouter } from "next/navigation";
import { createNewGroup } from "@/functions/InterfaceFunc";

export default function Sidebar() {

  const [ showSidebar , setShowSidebar] = useState(false);
  const [ groups, setGroups ] = useState([]);
  const [ _currentGroupId, _setCurrentGroupId ] = useState(0);
  const [ links, setLinks] = useState({});
  const router = useRouter();

  const handleChangeGroup = (groupId) => {
    setCurrentGroupId({groupId: groupId})
    setShowSidebar(false);
  }

  const handleAddNewGroup = () => {
    const { id } = createNewGroup();
    router.push(`/groups/${id}`);
    _setCurrentGroupId(id);
    handleChangeGroup(id);
  }

  useEffect(() => {
  const currentGroupIdFromDb = getCurrentGroupId();
  setCurrentGroupId(currentGroupIdFromDb);
  setLinks({
    usersLink: `/groups/${currentGroupIdFromDb}/#users`,
    transactionsLink: `/groups/${currentGroupIdFromDb}/#transactions`,
    settlementsLink: `/groups/${currentGroupIdFromDb}/#settlements`
  })
  }, [])

  useEffect(() => {
    const storedGroups = getGroups();
    if (storedGroups && storedGroups.length > 0) {
      setGroups(storedGroups);
    }
  }, [_currentGroupId, showSidebar])

  return (
    <div className="bg-slate-200 dark:bg-gray-600 p-4 z-10 mr-8 absolute"
    >
      <div className="flex flex-col justify-start gap-4 max-w-xs">
        
        <span className="material-symbols-outlined p-2 w-fit cursor-pointer hover:bg-slate-300 rounded-full" style={{fontSize: '2rem'}}
        onClick={() => showSidebar === false ? setShowSidebar(true) : setShowSidebar(false)}>menu</span>
        
        <div className="flex items-center gap-2 p-2 cursor-pointer hover:bg-slate-300 rounded-full z-10"
        onClick={()=>handleAddNewGroup()}>
          <span className="material-symbols-outlined "
          style={{fontSize: '2rem'}}>group_add</span>
        <p className="justify-center" hidden={!showSidebar}>Create New Group</p>
        </div>

        {showSidebar && 
        <div className="flex flex-col gap-2 px-4 max-w-64" >
          <h2 className="font-bold">Available Groups 
          <span className="ml-1">{`[${groups.length}]`}</span></h2>
          <div className="grid gap-2 max-h-64 overflow-y-scroll">
            {groups && groups.map((group, index) => 
              <Link key={index} href={`/groups/${group.id}`} 
              className="whitespace-nowrap overflow-hidden text-nowrap text-ellipsis hover:text-teal-400"
              onClick={() => handleChangeGroup(group.id)}
              >{`- ${group.name}`}</Link>
            )}            
          </div>
        </div>}

        <Link href={links.usersLink || '/'} className="flex items-center gap-2 p-2 cursor-pointer hover:bg-slate-300 rounded-full z-10">
          <span className="material-symbols-outlined "
          style={{fontSize: '2rem'}}>person</span>
          <p hidden={!showSidebar}>Users</p>
        </Link>
        <Link href={links.transactionsLink || '/'} className="flex items-center gap-2 p-2 cursor-pointer hover:bg-slate-300 rounded-full z-10">
          <span className="material-symbols-outlined "
          style={{fontSize: '2rem'}}>receipt_long</span>
          <p hidden={!showSidebar}>Transactions</p>
        </Link>
        <Link href={links.settlementsLink || '/'} className="flex items-center gap-2 p-2 cursor-pointer hover:bg-slate-300 rounded-full z-10">
          <span className="material-symbols-outlined "
          style={{fontSize: '2rem'}}>handshake</span>
          <p hidden={!showSidebar}>Settlements</p>
        </Link>

        {showSidebar && <LocalStorageManager/>}


      </div>
      

    </div>
  )
}
