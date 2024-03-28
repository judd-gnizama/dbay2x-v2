import Link from "next/link";
import Brand from "./Brand";
import DarkModeSwitch from "./DarkModeSwitch";

export default function Header() {
  return (
    <div className="flex justify-center items-center text-gray-800">
      <div className="flex p-4 items-center justify-between gap-4 w-full max-w-6xl bg-teal-100">
        <Brand/>
        <nav className="flex justify-center items-center gap-4">
          <Link href='#'>Home</Link>
          <Link href='#'>About</Link>
          <DarkModeSwitch/>
        </nav>
      </div>
    </div>
  )
}
