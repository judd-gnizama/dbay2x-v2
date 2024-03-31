'use client'

import GroupName from "@/components/GroupName";
import SearchBox from "@/components/SearchBox";
import { getGroupById } from "@/functions/LocalStorageFunc";

export default function GroupPage({ params }) {
  
  const groupId = params.groupId;
  const group = getGroupById({groupId: groupId});
  const groupName = group && Object.keys(group).length !== 0 ? group.name : null;
  const type = 'user'

  return (
    <div className="flex justify-center w-full">
      <div className="grid gap-4 w-full"
      style={{gridTemplateRows: "auto 1fr"}}
      >
        <div className="flex items-center justify-between gap-4 ">
          <div>
            <GroupName groupName={groupName ? groupName : 'Undefined Group'}/>
            <h1 className=" text-xl">Users</h1>
          </div>
        </div>
        <SearchBox type={type}/>
      </div>
    </div>
  )
}
