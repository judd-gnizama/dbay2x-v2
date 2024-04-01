'use client'
import EditableDiv from '@/components/EditableDiv';
import { getCurrentGroupId, getGroups, getGroupsWithUser, getOverallStatsUser, getUserInGroup} from '@/functions/LocalStorageFunc';
import React, { useState } from 'react'

export default function UserPage( { params }) {

  const userId = parseInt(params.userId);
  const currentGroupId = getCurrentGroupId();
  const userInGroup = getUserInGroup({ groupId: currentGroupId, userId: userId})
  const groupsWithUser = getGroupsWithUser({userId: userId});

  const [ editableText, setEditableText ] = useState(userInGroup.name);
  const [ editing, setEditing ] = useState(false);
  const [ user, setUser ] = useState(userInGroup);
  const [ selectedGroup, setSelectedGroup ] = useState(currentGroupId);

  const handleSubmit = (event) => {
    setEditing(false);
    const userName = event.target.textContent;
    if (userName.trim() !== "") {
      setEditableText(userName)
    }
  }


  const handleOnChangeDropDown = (event) => {
    const selectedGroupId = event.target.value
    setSelectedGroup(selectedGroupId)
    if (selectedGroupId > 0) {
      const newUser = getUserInGroup({ groupId: selectedGroupId, userId: userId})
      setUser(newUser);
    } else {
      const newUser = getOverallStatsUser({ userId: userId })
      setUser(newUser);
    }
    
  }


  return (
    <div>
      <h1>User Profile Page</h1>
      <div className='grid gap-4'
      style={{gridTemplateRows: 'auto auto 1fr'}}>
        <EditableDiv editableText={editableText} setEditableText={setEditableText} editing={editing} setEditing={setEditing} handleSubmitFcn={handleSubmit}/>
        <div className='p-4 border-2 rounded-lg w-fit'>
          <div className='flex items-center gap-2'>
            Details for: 
            <select className='p-1 bg-teal-100 rounded-lg'
            value={selectedGroup}
            onChange={handleOnChangeDropDown}
            >
              <option value="-1">All Involved Groups</option>
              {groupsWithUser?.map(group => <option key={group.id} value={group.id}>{group.name}</option>)}
            </select>
          </div>
          <div className='grid grid-cols-2 w-fit gap-x-4 list-none place-items-end'>
            <li>Total Share: </li>
            <li>{user.share || 0}</li>
            <li>Total Paid: </li>
            <li>{user.paid ? -user.paid : 0}</li>
            <li>Total Net: </li>
            <li className={`font-bold  ${user.net < 0 ? 'text-red-400' : 'text-green-400'}`}>{user.net || 0}</li>
          </div>
        </div>
      </div>
    </div>
  )
}
