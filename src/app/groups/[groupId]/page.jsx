'use client'

import GroupResult from "@/components/GroupResult";
import TransactionSearch from "@/components/TransactionSearch";
import { useEffect, useState } from "react";

export default function GroupPage({ params }) {

  const groupId = parseInt(params.groupId);
  const [ data, setData ] = useState([]);  
  const [ result, setResult ] = useState();
  const type = 'group'
  const filterList = {groupId: groupId}

  const getGroup = () => {
    if (data.groups && data.groups.length > 0) {
      const groupResult = data.groups.filter(group => group.id === groupId)[0];
      setResult(groupResult);
    }
  }

  const getMember = (memberId) => {
    if (data.users && data.users.length > 0) {
      const member = data.users.filter(user => user.id === memberId)[0];
      return member
  }
  } 

  useEffect(() => {
    const storedData = localStorage.getItem('myDataKey');
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    getGroup()
  }, [data.groups])


  return (
    <div className="p-4">
      {result && 
        <div className="flex flex-col gap-4 items-center">
          <GroupResult result={result} type={type}/>
            <h2 className="text-center">Members: </h2>
            <div className="flex justify-center flex-wrap gap-2">
              {result.members.map(member => 
                <ul className="border border-slate-300 rounded-lg p-4">
                  <li className="text-lg font-bold">{getMember(member.id).name}</li>
                  <li className="">{`Paid For: ${member.paid}`}</li>
                  <li className="">{`Share: ${member.share}`}</li>
                  <li className="">{`Net: ${member.net}`}</li>
                </ul>
              )}
            </div>
            <TransactionSearch filterList={filterList}/>

        </div>
      }
    </div>
  )
}
