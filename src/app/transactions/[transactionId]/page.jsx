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
    setTransactionAmount(value)
  }

  const handleBlurAmount = (event) => {
    if (!event.target.value) {
      setTransactionAmount(0);
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
  const [ selectPayor, setSelectPayor ] = useState(payorOptions[0].id);
  const handleChangePayor = (event) => {
    setSelectPayor(parseInt(event.target.value))
  }
  
  // For Payee
  const payeeOptions = currentGroup.users
  const [ selectPayee, setSelectPayee ] = useState(payorOptions[0].id);
  const handleChangePayee = (event) => {
    setSelectPayee(parseInt(event.target.value))
  }
  // For Split Mode
  const splitOptions = ['Evenly', 'Specific'];
  const [ selectSplit, setSelectSplit ] = useState(splitOptions[0]);
  const handleChangeSplit = (value) => {
    setSelectSplit(value)
  }

  // For Split Details
  const initializeMembers = (members) => {
    return members.map(member => ({
      id: member.id,
      name: member.name,
      share: 0, 
      split: false
    }))
  }

  const memberOptions = initializeMembers(currentGroup.users)
  const [ splitMembers, setSplitMembers ] = useState(memberOptions);
  const [ totalShare, setTotalShare ] = useState(0);

  const handleChangeSplitMembers = (value) => {
    const newMembers = splitMembers.map(member=>member.id === value ? 
      {
        ...member, 
        split: member.split ? false : true, 
        share: 0
      } : member)
    setSplitMembers(newMembers)
    computeTotal(newMembers)
  }
  const handleSelectAll = (event) => {
    event.preventDefault();
    const newMembers = splitMembers.map(member => ({...member, split: true}))
    setSplitMembers(newMembers)
    computeTotal(newMembers)
  }
  const handleUnselectAll = (event) => {
    event.preventDefault()
    const newMembers = splitMembers.map(member => ({...member, share: 0, split: false}))
    setSplitMembers(newMembers)
    computeTotal(newMembers);
  }
  const handleChangeWeight = (event) => {

    const splitMemberId = parseInt(event.target.id.split('-')[1]);
    const splitMember = splitMembers.filter(member => member.id === splitMemberId)[0];
    if (splitMember.split) {
      let value = event.target.value;
      const weight = parseInt(value);
      const newSplitMembers = splitMembers.map(member => member.id === splitMemberId ? {...member, share: weight} : member)
      setSplitMembers(newSplitMembers);  
      computeTotal(newSplitMembers)
    }  
  }
  const handleBlurWeight = (event) => {
    const splitMemberId = parseInt(event.target.id.split('-')[1]);
    const splitMember = splitMembers.filter(member => member.id === splitMemberId)[0];
    if (splitMember.split) {
      const value = event.target.value;
      if (!value || value < 0) {
        const newSplitMembers = splitMembers.map(member => member.id === splitMemberId ? {...member, share: 0 } : member)
        setSplitMembers(newSplitMembers);  
        computeTotal(newSplitMembers)
      }
    }  

  }

  const computeTotal = (newMembers) => {
    let total = 0;
    newMembers.forEach(member => total+=member.share)
    setTotalShare(total);
  }
  const computePercentage = (share, total) => {
    if(total === 0) return 0
    return (share/total * 100).toFixed(2)
  }
  const computeShare = (share, total, amount) => {
    const per = (share/total)
    return total ? (per * amount) : 0
  }


  const handleSubmit = (event) => {
    event.preventDefault();

    if (!editableText) {
      return;
    }

    if (selectSplit === 'Specific') {
      var split_members = splitMembers.filter(member => member.split)
    } else {
      var split_members = splitMembers.map(member => ({
        id: member.id,
        name: member.name,
        share: 1,
        split: true
      }))
    }

    if (selectPayor === selectPayee) return;

    const newTransaction = {
      id: transactionId,
      description: editableText,
      type: selectType,
      date: transactionDate,
      icon: selectType === 'Transfer' ? 'receipt_long' : selectIcon,
      amount: transactionAmount ? transactionAmount : 0,
      payer: selectPayor,
      recipient: selectType === 'Expense' ? 0 : selectPayee,
      split_mode: selectSplit,
      split_members: split_members
    }
    console.log(newTransaction)




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
      <EditableDiv editableText={editableText} setEditableText={setEditableText} editing={editing} setEditing={setEditing} handleEditable={handleChangeEditable}/>

      <form className="border p-4 rounded-lg grid  items-center h-fit gap-2 sm:grid-cols-[auto_1fr]"
      >
        <span>Type: </span>
        <ToggleGroup options={typeOptions} onToggleChange={onToggleChange}/>

        <label htmlFor="transactionDate">Date: </label>
        <input type="date" name="date" id="transactionDate" 
        className="p-2 pl-4 border-2 bg-gray-200 rounded-full" onChange={handleChangeDate}/>
        
        {selectType === 'Expense' &&
         <>
          <span>Icon: </span>
          <ToggleGroup options={iconList} onToggleChange={handleChangeIcon} icon={true}/>
        </>
        }

        <label htmlFor="transactionAmount">Amount: </label>
        <input className="p-2 pl-4 border-2 bg-gray-200 rounded-full" type="number" name="amount" id="transactionAmount" value={transactionAmount} onChange={handleChangeAmount} onBlur={handleBlurAmount}/>
        
        <label htmlFor="transactionPayor">Payor: </label>
        <select id="transactionPayor" className="p-2 border-2" onChange={handleChangePayor}>
          {payorOptions?.map((user, index) => <option key={index} value={user.id}>{user.name}</option>)}
        </select>

        {selectType === 'Transfer' &&
         <>
          <label htmlFor="transactionPayee">Payee: </label>
          <select id="transactionPayor" className="p-2 border-2" onChange={handleChangePayee}>
            {payeeOptions?.map((user, index) => <option key={index} value={user.id}>{user.name}</option>)}
          </select>
         </>
        }
        
        <span>Split Mode: </span>
        <ToggleGroup options={splitOptions} onToggleChange={handleChangeSplit}/>

        <span>Split Details: </span>
        <div>
          {selectSplit === 'Evenly' &&
          <>
            <div className="">Split among 
              <strong> {splitMembers.length}</strong> members: 
              <strong> {(transactionAmount/splitMembers.length).toLocaleString()} each</strong> 
            </div>
          </>
          }
          {selectSplit === 'Specific' &&
         <>
            <div className="">
              <div className="flex gap-2">
                <button onClick={handleSelectAll} className="border-2 p-1 rounded-md bg-gray-200">Select All</button>
                <button onClick={handleUnselectAll} className="border-2 p-1 rounded-md bg-gray-200">Unselect All</button>
              </div>
              <div className="flex flex-col gap-2">
                {splitMembers?.map((user, index) => 
                  <label key={index} className="border p-2 px-4 flex gap-2 items-center" htmlFor={`checkbox-${user.id}`}>
                    <input 
                    type="checkbox" 
                    name="share" 
                    id={`checkbox-${user.id}`} 
                    value={user.id}
                    checked={user.split}
                    onChange={(e) => handleChangeSplitMembers(parseInt(e.target.value))}/>
                    {user.name}
                    <label htmlFor={`weight-${user.id}`}>Share:</label>
                    <input className="p-2 pl-4 border-2 bg-gray-200 rounded-full" type="number" name="weight" id={`weight-${user.id}`} value={user.share.toString()} onChange={handleChangeWeight} onBlur={handleBlurWeight}/>

                    <span>{`${computePercentage(user.share, totalShare)}%`}</span>
                    <span>{computeShare(user.share, totalShare, transactionAmount).toLocaleString()}</span>

                  </label>
                  )}
              </div>

            </div>
         </>
          }

        </div>
      </form>
        <div className="flex max-sm:flex-col gap-2 justify-end">
          <button onClick={handleSubmit} className="bg-green-400 p-2 px-4 rounded-full">Update Changes</button>
          <button className="bg-red-400 p-2 px-4 rounded-full">Delete Transaction</button>
        </div>

    </div>
  )
}
