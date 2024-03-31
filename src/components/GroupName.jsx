'use client'

import { getCurrentGroup } from "@/app/LocalStorageFunc"

export default function GroupName() {
  
  const currentGroup = getCurrentGroup();

  return (
    <div className="text-2xl font-bold text-wrap">
      {currentGroup.name}   
    </div>
  )
}
