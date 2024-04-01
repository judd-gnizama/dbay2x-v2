'use client'

import GroupDesc from "@/components/GroupDesc";
import GroupName from "@/components/GroupName";
import Results from "@/components/Results";
import SearchBox from "@/components/SearchBox";
import { getGroupById } from "@/functions/LocalStorageFunc";
import { useEffect, useState } from "react";

export default function GroupPage({ params }) {
  
  const groupId = params.groupId;
  const group = getGroupById({groupId: groupId});
  
  return (
    <div className="grid gap-4"
    style={{gridTemplateRows: "auto 1fr"}}>
      <div>
        <GroupName group={group}/>
        <GroupDesc group={group}/>
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
        >Settlements</h2>
        {/* <Results type='settlement' results={group.settlements}/> */}
      </section>
      
    </div>
  )
}
