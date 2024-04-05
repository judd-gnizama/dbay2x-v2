'use client'
import Brand from "@/components/Brand";
import GroupResult from "@/components/GroupResult";
import { createNewGroup } from "@/functions/InterfaceFunc";
import { getGroups, setCurrentGroupId } from "@/functions/LocalStorageFunc";
import { useRouter } from "next/navigation";

export default function Home() {

  const groups = getGroups();
  const isEmpty = groups === undefined;
  const router = useRouter();
  
  const handleCreateNew = () => {
    const group = createNewGroup();
    console.log(group)
    setCurrentGroupId({groupId: group.id})
    router.push(`/groups/${group.id}`)
  }

  return (
    <div className="flex justify-center items-center text-center">
      <div className={`p-4 max-w-6xl h-full w-full grid grid-rows-[auto_1fr] items-center`}>
        <div>
          <Brand size={'text-6xl'}/>
          <h2>A Bill Splitting App by <strong className="font-bold">JMRTan</strong></h2>
        </div>
        <div className="">
          <p hidden={!isEmpty ? false: true}>Browse from existing groups</p>
          <div hidden={!isEmpty ? false: true} className="flex justify-center gap-2 rounded-lg p-4">
            {groups?.map(group => <GroupResult result={group}/>)}
          </div>
          <p>{`${isEmpty ? 'To get started, ' : 'Or you can, '}`} 
            <button 
            className="bg-teal-400 p-2 px-4 text-white rounded-full"
            onClick={handleCreateNew}>
              Create a New Group</button>
          </p>
        </div>
      </div>
    </div>
  )
}
