import Link from "next/link";
import CurrencyComp from "./CurrencyComp";

export default function Footer() {
  return (
    <div className="flex flex-col gap-4 justify-center items-center p-4 bg-background">
      <div className="text-center ">
        <p>Dbay2x by <Link href={`/dev`}>JMRTan</Link></p>
        <p>All Rights Reserved &copy; 2024</p>
      </div>
    </div>
  )
}
