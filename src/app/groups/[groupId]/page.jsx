'use client'

import GroupName from "@/components/GroupName";
import SearchBox from "@/components/SearchBox";
import UserSearch from "@/components/UserSearch";
import { getGroupById } from "@/functions/LocalStorageFunc";

export default function GroupPage({ params }) {
  
  const groupId = params.groupId;
  const group = getGroupById({groupId: groupId});
  const groupName = group && Object.keys(group).length !== 0 ? group.name : null;
  return (
    <div className="grid gap-4"
    style={{gridTemplateRows: "auto 1fr"}}>
      <GroupName groupName={groupName ? groupName : 'Undefined Group'}/>
      <section className="border-2 border-gray-300 rounded-md p-4 relative bg-inherit">
        <h2 className="text-lg font-bold bg-white dark:bg-black text-gray-400 absolute top-0 left-2 px-1"
        style={{translate: '0 -50%'}}
        >Users</h2>
        <SearchBox type='user'/>
      </section>
      <section className="border-2 border-gray-300 rounded-md p-4 relative bg-inherit">
        <h2 className="text-lg font-bold bg-white text-gray-400 absolute top-0 left-2 px-1"
        style={{translate: '0 -50%'}}
        >Transactions</h2>
        <SearchBox type='transaction'/>
      </section>
      
    </div>
  )
}
