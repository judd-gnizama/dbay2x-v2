'use client'

import { getCurrentGroup } from "@/functions/LocalStorageFunc"

export default function GroupName({groupName}) {
  
  // const currentGroup = getCurrentGroup();

  return (
    <div className="text-2xl font-bold text-wrap">
      {groupName}   
    </div>
  )
}
