
import { NextResponse } from "next/server"


const getDataFromLocal = () => {
  const localStoredData = localStorage.getItem('myDataKey');
  console.log(localStoredData)
  return localStoredData
}

export async function GET() {

  const data = getDataFromLocal()

  return NextResponse.json(data)
}

// export async function POST(request) {
//   console.log(request, 'server-side')
//   const data = await request.json();
//   console.log(data, 'server-side');

//   const { name, id } = data;

//   console.log(name, id)

//   return NextResponse.json({name, id})
// }