'use client'
import Brand from "@/components/Brand";
import GroupResult from "@/components/GroupResult";
import { createNewGroup } from "@/functions/InterfaceFunc";
import { getGroups, setCurrentGroupId } from "@/functions/LocalStorageFunc";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Home() {

  const [ groups, setGroups ] = useState(null);
  const router = useRouter();
  
  const handleCreateNew = () => {
    const group = createNewGroup();
    setCurrentGroupId({groupId: group.id})
    toast.success(`Group: #${group.id} created successfully`)
    router.push(`/groups/${group.id}`)
  }
  
  useEffect(()=> {
    setGroups(getGroups());
  }, [])

  return (
    <div className="flex justify-center items-center text-center">
      <div className={`gap-4 max-w-6xl w-full grid grid-rows-[auto_1fr_auto] items-center place-items-center`}>
        <div>
          <Brand size={'text-6xl'}/>
          <h2>A Bill Splitting App by <strong className="font-bold">JMRTan</strong></h2>
        </div>
        <button 
        className="bg-teal-400 p-2 px-4 text-white rounded-full hover:opacity-80 active:opacity-40 transition-opacity duration-300"
        onClick={handleCreateNew}>
          Create a New Group</button>
        {groups && groups?.length !== 0 &&
          <>
            <p>{`Existing Groups [${groups ? groups.length : 0}]:`}</p>
            <div className="flex flex-cols overflow-x-scroll w-full gap-2 p-4 rounded-lg bg-gray-200 snap-center">
              {groups?.length > 0 ? 
              <>
                {groups?.map(group => <GroupResult key={group.id} result={group}/>)}
              </>
              :
              <div>No groups found</div>
              }
            </div>
          </> 
        }
      </div>
    </div>
  )
}
