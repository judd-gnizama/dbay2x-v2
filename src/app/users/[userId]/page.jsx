'use client'
import EditableDiv from '@/components/EditableDiv';
import { getCurrentGroupId, getUserInGroup} from '@/functions/LocalStorageFunc';
import React, { useState } from 'react'

export default function UserPage( { params }) {

  const userId = parseInt(params.userId);
  const currentGroupId = getCurrentGroupId();
  const userInGroup = getUserInGroup({ groupId: currentGroupId, userId: userId})
  const [ editableText, setEditableText ] = useState(userInGroup.name);
  const [ editing, setEditing ] = useState(false);
  const [ user, setUser ] = useState(userInGroup);

  const handleSubmit = (event) => {
    setEditing(false);
    const userName = event.target.textContent;
    if (userName.trim() !== "") {
      setEditableText(userName)
    }
  }

  return (
    <div>
      <h1>User Profile Page</h1>
      <div className='grid gap-4'
      style={{gridTemplateRows: 'auto auto 1fr'}}>
        <EditableDiv editableText={editableText} setEditableText={setEditableText} editing={editing} setEditing={setEditing} handleSubmitFcn={handleSubmit}/>
        <div>
          <span>Details</span>
          <div className='grid grid-cols-2 w-fit gap-x-4 list-none place-items-end'>
            <li>Total Share: </li>
            <li>{user.share}</li>
            <li>Total Paid: </li>
            <li>-{user.paid}</li>
            <li>Total Net: </li>
            <li>{user.net}</li>
          </div>
        </div>
      </div>
    </div>
  )
}
