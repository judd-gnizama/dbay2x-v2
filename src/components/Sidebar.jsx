'use client'
import Link from "next/link";
import { useEffect, useRef, useState } from "react"
import LocalStorageManager from "./LocalStorageManager";
import { getCurrentGroup, getCurrentGroupId, getGroups, setCurrentGroupId } from "@/functions/LocalStorageFunc";
import { usePathname, useRouter } from "next/navigation";
import { createNewGroup } from "@/functions/InterfaceFunc";
import DarkModeSwitch from "./DarkModeSwitch";
import { toast } from "sonner";

export default function Sidebar() {

  const [ showSidebar , setShowSidebar] = useState(false);
  const [ groups, setGroups ] = useState([]);
  const [ _currentGroupId, _setCurrentGroupId ] = useState(0);
  const [ links, setLinks] = useState({});
  const  sidebarRef = useRef(null);

  const router = useRouter();
  const pathname = usePathname();
  const showLinks = pathname.startsWith('/groups');

  const handleChangeGroup = (groupId) => {
    setCurrentGroupId({groupId: groupId})
    setShowSidebar(false);
    _setCurrentGroupId(groupId);
    setLinks({
      groupsLink: `/`,
      usersLink: `/groups/${groupId}/#users`,
      transactionsLink: `/groups/${groupId}/#transactions`,
      settlementsLink: `/groups/${groupId}/#settlements`
    })
  }

  const handleAddNewGroup = () => {
    const { id } = createNewGroup();
    router.push(`/groups/${id}`);
    toast.success(`Group: #${id} created successfully`)
    handleChangeGroup(id);
  }

  const handleOutsideClick = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setShowSidebar(false)
    }
  }

  useEffect(() => {
  const currentGroupIdFromDb = getCurrentGroupId();
  handleChangeGroup(currentGroupIdFromDb);
  }, [])

  useEffect(() => {
    const storedGroups = getGroups();
    if (storedGroups && storedGroups.length > 0) {
      setGroups(storedGroups);
    }
  }, [_currentGroupId, showSidebar])

  useEffect(()=> {
    const body = document.body;
    if (showSidebar) {
      body.addEventListener('click', handleOutsideClick)
    } else {
      body.removeEventListener('click', handleOutsideClick)
    }
    return () => body.removeEventListener('click', handleOutsideClick);
  }, [showSidebar])

  return (
    <div className="z-10 top-0 right-0 absolute translate-x-2 -translate-y-2"
    ref={sidebarRef}> 
    <div className={`flex flex-col p-4 justify-start items-end gap-4 max-w-xs ${showSidebar ? 'bg-slate-200': ''}`}>
      
      <span className="material-symbols-outlined w-fit p-2 cursor-pointer hover:bg-slate-300 rounded-full" style={{fontSize: '2rem'}}
      onClick={() => showSidebar === false ? setShowSidebar(true) : setShowSidebar(false)}>menu</span>
      
      {showSidebar && <div className="flex items-center gap-2 p-2 cursor-pointer hover:bg-slate-300 rounded-full z-10"
      onClick={()=>handleAddNewGroup()}>
        <p className="justify-center" hidden={!showSidebar}>Create New Group</p>
        <span className="material-symbols-outlined "
        style={{fontSize: '2rem'}}
        >group_add</span>
      </div>
      }

      {/* {showSidebar && 
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
      </div>} */}
      
      {showSidebar && <>
        <Link href={'/'} className="flex items-center gap-2 p-2 cursor-pointer hover:bg-slate-300 rounded-full z-10">
          <p hidden={!showSidebar}>Groups</p>
          <span className="material-symbols-outlined "
          style={{fontSize: '2rem'}}>group</span>
        </Link>
        <Link href={'/about'} className="flex items-center gap-2 p-2 cursor-pointer hover:bg-slate-300 rounded-full z-10">
          <p hidden={!showSidebar}>About</p>
          <span className="material-symbols-outlined "
          style={{fontSize: '2rem'}}>info</span>
        </Link>

        {/* <Link href={links.usersLink || '/'} className="flex items-center gap-2 p-2 cursor-pointer hover:bg-slate-300 rounded-full z-10">
          <p hidden={!showSidebar}>Users</p>
          <span className="material-symbols-outlined "
          style={{fontSize: '2rem'}}>person</span>
        </Link>
        <Link href={links.transactionsLink || '/'} className="flex items-center gap-2 p-2 cursor-pointer hover:bg-slate-300 rounded-full z-10">
          <p hidden={!showSidebar}>Transactions</p>
          <span className="material-symbols-outlined "
          style={{fontSize: '2rem'}}>receipt_long</span>
        </Link>
        <Link href={links.settlementsLink || '/'} className="flex items-center gap-2 p-2 cursor-pointer hover:bg-slate-300 rounded-full z-10">
          <p hidden={!showSidebar}>Settlements</p>
          <span className="material-symbols-outlined "
          style={{fontSize: '2rem'}}>handshake</span>
        </Link> */}
        {/* <button className="flex items-center gap-2 p-2 cursor-pointer hover:bg-slate-300 rounded-full z-10">
          <p hidden={!showSidebar}>Dark Mode</p>
          <DarkModeSwitch/>
        </button> */}
      </>}

      {/* {showSidebar && <LocalStorageManager/>} */}


    </div>

      

    </div>
  )
}
