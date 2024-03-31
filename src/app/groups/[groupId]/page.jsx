import GroupName from "@/components/GroupName";
import SearchBox from "@/components/SearchBox";

export default function GroupPage() {

  const type = 'user'

  return (
    <div className="flex justify-center w-full">
      <div className="grid gap-4 w-full"
      style={{gridTemplateRows: "auto 1fr"}}
      >
        <div className="flex items-center justify-between gap-4 ">
          <div>
            <GroupName/>
            <h1 className=" text-xl">Users</h1>
          </div>
        </div>
        <SearchBox type={type}/>
      </div>
    </div>
  )
}
