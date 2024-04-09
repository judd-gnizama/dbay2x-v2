'use client'
import EditableDiv from '@/components/EditableDiv';
import { confirmCancelToast } from '@/functions/InterfaceFunc';
import { getCurrentGroup, getCurrentGroupId, getGroups, getGroupsWithUser, getOverallStatsUser, getUserInGroup, removeUserInGroup, replaceUserProp} from '@/functions/LocalStorageFunc';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { toast } from 'sonner';

export default function UserPage( { params }) {

  const userId = parseInt(params.userId);
  const currentGroupId = getCurrentGroupId();
  const userInGroup = getUserInGroup({ groupId: currentGroupId, userId: userId})
  const groupsWithUser = getGroupsWithUser({userId: userId});

  const { id, name, paid, share, current_balance, total_balance, total_net} = userInGroup
  const router = useRouter();

  const [ editableText, setEditableText ] = useState(userInGroup.name);
  const [ editing, setEditing ] = useState(false);

 
  const handleSubmit = (event) => {
    setEditing(false);
    const userName = event.target.textContent;
    setEditableText(userName)
    replaceUserProp({ userId: userId, key: 'name', value: userName })
  }

  const handleDeleteUser = () => {
    confirmCancelToast({message: 'Delete User?', 
    confirmFn: onConfirmDelete})
  }

  const onConfirmDelete = () => {
    removeUserInGroup({userId: id, groupId: currentGroupId})
    toast.dismiss()
    toast.success('User Deleted')
    router.push(`/groups/${currentGroupId}`)
  }

  return (
    <div className='grid grid-rows-[auto_1fr]'>
      <Link 
      href={`/groups/${currentGroupId}`}
      className='w-fit flex items-center gap-2'
      >
        <span className="material-symbols-outlined">arrow_back_ios_new</span>
        Go back to <strong>{getCurrentGroup({groupId: currentGroupId}).name}</strong>
      </Link>
      <div className='grid gap-4 p-4 ml-4'
      style={{gridTemplateRows: 'auto 1fr auto'}}>

        <EditableDiv editableText={editableText} setEditableText={setEditableText} editing={editing} setEditing={setEditing} handleEditable={handleSubmit}/>

        <article className="overflow-hidden grid grid-cols-2 gap-x-4 justify-center items-center">
          <p className='flex flex-col max-w-64'>Share: 
            <span className='text-gray-500 text-[0.85em]'>
              {`(the amount a user is responsible for covering)`}
            </span> 
          </p>
          <p>{share.toLocaleString()}</p>
          
          <p className='flex flex-col'>Contributed: 
            <span className='text-gray-500 text-[0.85em]'>
              {`(the amount a user has shelled out for expenses)`}
            </span> 
          </p>
          <p>{paid.toLocaleString()}</p>
          <p className='flex flex-col'>
            {`${total_balance < 0 ? 'Received:':'Paid:'}`}
            <span className='text-gray-500 text-[0.85em]'>
              {`(the adjustments to cover differences [ balance / total ])`}
            </span> 
          </p>
          <p>{`${Math.abs(current_balance).toLocaleString()} / ${Math.abs(total_balance).toLocaleString()}`}</p>
          <p className='flex flex-col'>
            Total Net: 
          <span className='text-gray-500 text-[0.85em]'>
              {`(total contributed amount less amounts received)`}
            </span> 
          </p>
          <p>{total_net.toLocaleString()}</p>
        </article>

        <div className="flex max-[350px]:flex-col place-items-center gap-2">
          <button onClick={handleDeleteUser} className="bg-gray-600 text-nowrap text-white p-2 px-4 max-w-lg rounded-full hover:opacity-80 active:opacity-40 disabled:opacity-40" disabled={total_net === 0 && share === 0 ? false : true}>Delete User</button>
          <p className='text-[0.75rem] max-w-lg'>{"Note: User cannot be deleted unless share and total net are both zero. If you want to delete this profile, remove user from all transactions."}</p>
        </div>
      </div>
    </div>
  )
}
