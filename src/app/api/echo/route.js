import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url)

  // fixed params echo
  // const name = searchParams.get('name')
  // const instrument = searchParams.get('instrument')
  // return NextResponse.json({ name, instrument })

  // dynamic params echo
  const obj = Object.fromEntries(searchParams.entries())
  return NextResponse.json(obj)
}
