'use client'

import EditableDiv from "@/components/EditableDiv";
import ToggleGroup from "@/components/formComponents/ToggleGroup";
import { isStrictlyNumeric } from "@/functions/InterfaceFunc";
import { getCurrentGroup, getTransactionFromGroup, getUserInGroup } from "@/functions/LocalStorageFunc";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function TransactionPage({ params }) {

  const transactionId = parseInt(params.transactionId);
  const currentGroup = getCurrentGroup();
  const transaction = getTransactionFromGroup({groupId: currentGroup.id, transactionId: transactionId})

  // For Description
  const [ editableText, setEditableText ] = useState(transaction.description);
  const [ editing, setEditing ] = useState(false);
  const handleChangeEditable = (event) => {
    const description = event.target.textContent;
    setEditing(false);
    setEditableText(description);
    // save description to Transaction
  }

  // For Transaction Type
  const typeOptions = ['Expense', 'Transfer'];
  const [ selectType, setSelectType ] = useState(typeOptions[0]);
  const onToggleChange = (value) => {
    setSelectType(value)
  }

  // For Date
  const [ transactionDate, setTransactionDate ] = useState();
  const handleChangeDate = (event) => {
    setTransactionDate(event.target.value)
  }

  // For Amount
  const [ transactionAmount, setTransactionAmount ] = useState(0);
  const handleChangeAmount = (event) => {
    const value = event.target.value
    if (value) {
      setTransactionAmount(value)
    }
  }

  // For Icon
  const iconList = ['airport_shuttle', 'restaurant', 'cake', 'sports_soccer', 'sports_tennis', 'shopping_cart', 'monitoring']
  const [ selectIcon, setSelectIcon ] = useState(iconList[0]);
  const handleChangeIcon = (value) => {
    setSelectIcon(value)
  }

  // For Payor
  const payorOptions = currentGroup.users
  const [ selectPayor, setSelectPayor ] = useState();
  const handleChangePayor = (event) => {
    setSelectPayor(event.target.value)
  }

  // For Payee
  const payeeOptions = currentGroup.users
  const [ selectPayee, setSelectPayee ] = useState();
  const handleChangePayee = (event) => {
    setSelectPayee(event.target.value)
  }
  // For Split Mode
  const splitOptions = ['Evenly', 'Specific'];
  const [ selectSplit, setSelectSplit ] = useState(splitOptions[0]);
  const handleChangeSplit = (value) => {
    setSelectSplit(value)
  }

  // For Split Details
  const initializeSplitMembers = (users) => {
    return users.map(user => ({
      id: user.id,
      name: user.name,
      share: 0,
    }))
  }

  const splitMemberOptions = initializeSplitMembers(currentGroup.users);
  const [ splitMembers, setSplitMembers ] = useState(splitMemberOptions);
  const [ totalShare, setTotalShare ] = useState(0);

  const handleChangeSplitMembers = (value) => {
    const newMember = {id: value, share: 0};
    const index = splitMembers.findIndex(member => member.id === newMember.id)
    if (index !== -1) {
      setSplitMembers(splitMembers.filter(member => member.id !== value))
    } else {
      setSplitMembers([...splitMembers, newMember])
    }
    computeTotal(splitMembers)
  }



  const handleSelectAll = () => {
    setSplitMembers(splitMemberOptions)
  }
  const handleUnselectAll = () => {
    setSplitMembers([]);
    computeTotal([])
  }
  const handleChangeWeight = (event) => {
    const splitMemberId = parseInt(event.target.id.split('-')[1]);
    if (splitMembers.findIndex(member => member.id === splitMemberId) === -1) return;
    if(isStrictlyNumeric(event.target.value))
    {
      const weight = parseInt(event.target.value);
      const newSplitMembers = splitMembers.map(member => member.id === splitMemberId ? {...member, share: weight} : member)
      setSplitMembers(newSplitMembers);
      computeTotal(newSplitMembers)
    }
  }

  const computeTotal = (newSplitMembers) => {
    if (!newSplitMembers || newSplitMembers.length === 0) return 0;
    let total = 0
    newSplitMembers.forEach(member => total+=member.share)
    setTotalShare(total)
  }

  const computePercentage = (id) => {
    if (totalShare === 0) return 'N/A'
    const user = splitMembers.filter(member=>member.id === id)[0]
    if (!user) return 0
    return user.share/totalShare
  }



  useEffect(()=> {
    computeTotal(splitMembers)

  },[splitMembers])

  








  const handleSubmit = (event) => {
    event.preventDefault();
  }


  return (
    <div className="grid gap-4"
    style={{gridTemplateRows: 'auto auto 1fr'}}>
      <Link 
      href={`/groups/${currentGroup.id}`}
      className='w-fit flex items-center gap-2'
      >
        <span className="material-symbols-outlined">arrow_back_ios_new</span>
        Go back to <strong>{currentGroup.name}</strong>
      </Link>
      <EditableDiv editableText={editableText} setEditableText={setEditableText} editing={editing} setEditing={setEditing} handleEditable={handleChangeEditable} required/>
      <form onSubmit={handleSubmit} className="border p-4 rounded-lg grid  items-center h-fit gap-2 sm:grid-cols-[auto_1fr]"
      >
        
        <span>Type: </span>
        <ToggleGroup options={typeOptions} onToggleChange={onToggleChange}/>
        
        <label htmlFor="transactionDate">Date: </label>
        <input type="date" name="date" id="transactionDate" 
        className="p-2 pl-4 border-2 bg-gray-200 rounded-full" onChange={handleChangeDate}/>
        
        <label htmlFor="transactionAmount">Amount: </label>
        <input className="p-2 pl-4 border-2 bg-gray-200 rounded-full" type="number" name="amount" id="transactionAmount" onChange={handleChangeAmount}/>

        <span>Icon: </span>
        <ToggleGroup options={iconList} onToggleChange={handleChangeIcon} icon={true}/>
        
        <label htmlFor="transactionPayor">Payor: </label>
        <select id="transactionPayor" className="p-2 border-2" onChange={handleChangePayor}>
          {payorOptions?.map((user, index) => <option key={index} value={user.id}>{user.name}</option>)}
        </select>

        <label htmlFor="transactionPayee">Payee: </label>
        <select id="transactionPayor" className="p-2 border-2" onChange={handleChangePayee}>
          {payeeOptions?.map((user, index) => <option key={index} value={user.id}>{user.name}</option>)}
        </select>
       
        <span>Split Mode: </span>
        <ToggleGroup options={splitOptions} onToggleChange={handleChangeSplit}/>

        <span>Split Details: </span>
        <div className="">
          <div className="flex gap-2">
            <button onClick={handleSelectAll} className="border-2 p-1 rounded-md bg-gray-200">Select All</button>
            <button onClick={handleUnselectAll} className="border-2 p-1 rounded-md bg-gray-200">Unselect All</button>
          </div>
          <div className="flex flex-col gap-2">
            {splitMembers.length}
            {splitMemberOptions?.map((user, index) => 
              <label key={index} className="border p-2 px-4 flex gap-2 items-center" htmlFor={`checkbox-${user.id}`}>
                <input 
                type="checkbox" 
                name="share" 
                id={`checkbox-${user.id}`} 
                value={user.id}
                checked={splitMembers.findIndex(member => member.id === user.id) !== -1}
                onChange={(e) => handleChangeSplitMembers(parseInt(e.target.value))}/>
                {user.name}
                <label htmlFor={`weight-${user.id}`}>Share:</label>
                <input className="p-2 pl-4 border-2 bg-gray-200 rounded-full" type="number" name="weight" id={`weight-${user.id}`} onChange={handleChangeWeight}/>

                <span>{computePercentage(user.id)}</span>
                <span>{totalShare}</span>

              </label>
              )}
          </div>

        </div>
        <button>Save</button>
        <button>Cancel</button>
      </form>

    </div>
  )
}
