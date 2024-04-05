import Link from "next/link";

export default function Brand({ size }) {
  return (
    <div className="flex justify-center items-center">
      <Link href='/' className={`font-bold text-teal-400 ${size ? size : 'text-5xl'}`}>Dbay2x</Link>
    </div>
  )
}
 