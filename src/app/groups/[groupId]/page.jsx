'use client'

import GroupDesc from "@/components/GroupDesc";
import GroupDetails from "@/components/GroupDetails";
import GroupName from "@/components/GroupName";
import Results from "@/components/Results";
import SearchBox from "@/components/SearchBox";
import { confirmCancelToast } from "@/functions/InterfaceFunc";
import { getGroupById, removeGroup } from "@/functions/LocalStorageFunc";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function GroupPage({ params }) {
  
  const groupId = parseInt(params.groupId);
  const group = getGroupById({groupId: groupId});
  const router = useRouter();



  const handleDeleteGroup = () => {
    confirmCancelToast({message: 'Delete Group?', 
    confirmFn: onConfirmDelete})
  }

  const onConfirmDelete = () => {
    removeGroup({groupId: groupId})
    toast.dismiss()
    toast.success('Group Deleted')
    router.push('/')
  }
  const handleExportGroup = () => {
    
  }
  
  return (
    <div className="grid gap-4"
    style={{gridTemplateRows: "auto 1fr"}}>
      <div>
        <GroupName group={group}/>
        <GroupDesc group={group}/>
        <GroupDetails group={group}/>
      </div>
      <section className="border-2 border-gray-300 rounded-md p-4 relative bg-inherit">
        <h2 id="users" className="text-lg font-bold bg-white text-gray-400 absolute top-0 left-2 px-1"
        style={{translate: '0 -50%'}}
        >Users</h2>
        <SearchBox type='user' groupId={groupId}/>
      </section>
      <section className="border-2 border-gray-300 rounded-md p-4 relative bg-inherit">
        <h2 id="transactions" className="text-lg font-bold bg-white text-gray-400 absolute top-0 left-2 px-1"
        style={{translate: '0 -50%'}}
        >Transactions</h2>
        <SearchBox type='transaction' groupId={groupId}/>
      </section>
      <section className="border-2 border-gray-300 rounded-md p-4 relative bg-inherit">
        <h2 id="settlements" className="text-lg font-bold bg-white text-gray-400 absolute top-0 left-2 px-1"
        style={{translate: '0 -50%'}}
        >Recommended Settlements</h2>
        <Results type='settlement' results={group?.reimbursements}/>
      </section>
      <div className="justify-self-end flex gap-2">
        <button disabled={true} className="bg-gray-300 p-2 px-4 rounded-full disabled:bg-gray-400 disabled:opacity-40">Export Group Data</button>
        <button onClick={handleDeleteGroup} className="bg-gray-600 text-white p-2 px-4 rounded-full hover:opacity-80 active:opacity-40">Delete Group</button>
      </div>
      
    </div>
  )
}
