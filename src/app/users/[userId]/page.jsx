'use client'

import UserResult from "@/components/UserResult";
import { useEffect, useState } from "react";

export default function UserPage({ params }) {

  const userId = parseInt(params.userId);
  const [ data, setData ] = useState([]);  
  const [ result, setResult ] = useState();
  const type = 'user'

  const getUser = () => {
    if (data && data.length > 0) {
      const userResult = data.filter(user => user.id === userId)[0];
      setResult(userResult);
    }
  }


  useEffect(() => {
    const storedData = localStorage.getItem('myDataKey');
    if (storedData) {
      setData(JSON.parse(storedData).users);
    }
  }, []);

  useEffect(() => {
    getUser()
  }, [data])


  return (
    <div className="p-4">
      {result && 
        <>
          <UserResult result={result} type={type}/>
          <span>List of Transactions made by {result.name}</span>
        </>
      }
    </div>
  )
}
