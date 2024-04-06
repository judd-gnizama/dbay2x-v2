import Link from "next/link";

export default function Footer() {
  return (
    <div className="flex justify-center p-4 bg-background">
      <div className="text-center ">
        <p>Dbay2x by <Link href={`/dev`}>JMRTan</Link></p>
        <p>All Rights Reserved &copy; 2024</p>
      </div>   
    </div>
  )
}
