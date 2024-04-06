'use client'
import Brand from "@/components/Brand";
import GroupResult from "@/components/GroupResult";
import { createNewGroup } from "@/functions/InterfaceFunc";
import { getGroups, setCurrentGroupId } from "@/functions/LocalStorageFunc";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {

  const [ groups, setGroups ] = useState(null);
  const router = useRouter();
  
  const handleCreateNew = () => {
    const group = createNewGroup();
    setCurrentGroupId({groupId: group.id})
    router.push(`/groups/${group.id}`)
  }
  
  useEffect(()=> {
    setGroups(getGroups());
  }, [])

  return (
    <div className="flex justify-center items-center text-center">
      <div className={`gap-4 max-w-6xl h-full w-full grid grid-rows-[auto_1fr_auto] items-center place-items-center`}>
        <div>
          <Brand size={'text-6xl'}/>
          <h2>A Bill Splitting App by <strong className="font-bold">JMRTan</strong></h2>
        </div>
        <button 
        className="bg-teal-400 p-2 px-4 text-white rounded-full"
        onClick={handleCreateNew}>
          Create a New Group</button>
        <p>Recent Groups:</p>
        <div className="border p-4 max-w-6xl w-full rounded-lg bg-gray-200">
          {groups?.length > 0 ? <div className="grid gap-2 rounded-lg max-h-80 overflow-y-scroll"
          style={{gridTemplateColumns: 'repeat(auto-fit,minmax(15rem, 1fr))'}}>
            {groups?.map(group => <GroupResult key={group.id} result={group}/>)}
          </div>
          :
          <div>No groups found</div>
        }
        </div>
        {/* <LocalStorageManager/> */}
      </div>
    </div>
  )
}
