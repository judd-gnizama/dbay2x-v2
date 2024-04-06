'use client'
import Brand from "@/components/Brand";
import GroupResult from "@/components/GroupResult";
import LocalStorageManager from "@/components/LocalStorageManager";
import { createNewGroup } from "@/functions/InterfaceFunc";
import { getGroups, setCurrentGroupId } from "@/functions/LocalStorageFunc";
import { useRouter } from "next/navigation";

export default function Home() {

  const groups = getGroups();
  const router = useRouter();
  
  const handleCreateNew = () => {
    const group = createNewGroup();
    setCurrentGroupId({groupId: group.id})
    router.push(`/groups/${group.id}`)
  }

  return (
    <div className="flex justify-center items-center text-center">
      <div className={`gap-4 max-w-6xl h-full w-full grid grid-rows-[auto_1fr_auto] items-center place-items-center`}>
        <div>
          <Brand size={'text-6xl'}/>
          <h2>A Bill Splitting App by <strong className="font-bold">JMRTan</strong></h2>
        </div>
        <div className="">
          <div className="grid grid-cols-3 justify-center gap-2 rounded-lg p-4">
            {groups?.map(group => <GroupResult key={group.id} result={group}/>)}
          </div>
          <p>{`If no group yet, `} 
            <button 
            className="bg-teal-400 p-2 px-4 text-white rounded-full"
            onClick={handleCreateNew}>
              Create a New Group</button>
          </p>
        </div>
        <LocalStorageManager/>
      </div>
    </div>
  )
}
