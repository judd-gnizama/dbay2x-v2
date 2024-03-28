import GroupComp from "./GroupComp";
import UserComp from "./UserComp";

export default function Navbar() {
  return (
    <div className="absolute">
      <UserComp/>
      <GroupComp/>      
    </div>
  )
}
