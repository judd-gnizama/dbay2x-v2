'use client'

import EditableDiv from "@/components/EditableDiv";
import ToggleGroup from "@/components/formComponents/ToggleGroup";
import { getCurrentGroup, getTransactionFromGroup, getUserInGroup, replaceTransaction } from "@/functions/LocalStorageFunc";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function TransactionPage({ params }) {

  const searchParams = useSearchParams();
  const mode = searchParams.get('mode')
  const transactionId = parseInt(params.transactionId);
  const currentGroup = getCurrentGroup();
  const transaction = getTransactionFromGroup({groupId: currentGroup.id, transactionId: transactionId})

  const initialValues = mode === 'add' ? 
    {
      id: transactionId,
      description: "Description Here",
      type: 'Expense',
      date: "",
      icon: "receipt_long",
      amount: 0,
      payer: currentGroup.users[0].id,
      recipient: currentGroup.users[0].id,
      split_mode: "Evenly",
      split_members: []
    }
    :
    transaction;

  // For Description
  console.log(initialValues)
  const [ editableText, setEditableText ] = useState(initialValues.description);
  const [ editing, setEditing ] = useState(false);
  const handleChangeEditable = (event) => {
    const description = event.target.textContent;
    setEditing(false);
    setEditableText(description);
    // save description to Transaction
  }

  // For Transaction Type
  const typeOptions = ['Expense', 'Transfer'];
  const [ selectType, setSelectType ] = useState(initialValues.type);
  const onToggleChange = (value) => {
    setSelectType(value)
  }

  // For Date
  const [ transactionDate, setTransactionDate ] = useState(initialValues.date);
  const handleChangeDate = (event) => {
    setTransactionDate(event.target.value)
  }

  // For Amount
  const [ transactionAmount, setTransactionAmount ] = useState(initialValues.amount);
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
  const iconList = ['receipt_long','airport_shuttle', 'restaurant', 'cake', 'sports_soccer', 'sports_tennis', 'shopping_cart', 'monitoring']
  const [ selectIcon, setSelectIcon ] = useState(initialValues.icon);
  const handleChangeIcon = (value) => {
    setSelectIcon(value)
  }

  // For Payor
  const payorOptions = currentGroup.users
  const [ selectPayor, setSelectPayor ] = useState(initialValues.payer);
  const handleChangePayor = (event) => {
    setSelectPayor(parseInt(event.target.value))
  }
  
  // For Payee
  const payeeOptions = currentGroup.users
  const isInUsers = currentGroup.users.findIndex(user=>user.id === initialValues.recipient) !== -1
  const [ selectPayee, setSelectPayee ] = useState(isInUsers ? initialValues.recipient : payeeOptions[0].id);
  const handleChangePayee = (event) => {
    setSelectPayee(parseInt(event.target.value))
  }
  // For Split Mode
  const splitOptions = ['Evenly', 'Specific'];
  const [ selectSplit, setSelectSplit ] = useState(initialValues.split_mode);
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
  const [ splitMembers, setSplitMembers ] = useState(mode === 'add'? memberOptions : initialValues.split_members);
  const computeInitialTotal = (newMembers) => {
    let total = 0;
    newMembers.forEach(member => total+=member.share)
    return total
  }

  const [ totalShare, setTotalShare ] = useState(computeInitialTotal(splitMembers));

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

  // Overall 
  const handleSubmit = (event) => {
    
    event.preventDefault();
    var hasError = false;
    if (!transactionDate){
      console.log('Error', 'No Date')
      hasError = true;
    } 
    if (!editableText) {
      console.log('Error', 'No Description')
      hasError = true;
    }
    if (!transactionAmount) {
      console.log('Error', 'Invalid Amount')
      hasError = true;
    } 
    if (!selectPayor || currentGroup.users.findIndex(user=>user.id === selectPayor) === -1) {
      console.log('Error', "Invalid Payor")
      hasError = true;
    }
    
    if (selectType === 'Expense') {
      if (!selectIcon) {
        console.log(selectIcon)
        console.log('No Icon')
        hasError = true;
      }
    } else if (selectType === 'Transfer') {
      if (!selectSplit) {
        console.log('No Split Mode')
        hasError = true;
      }
      if (!selectPayee || currentGroup.users.findIndex(user=>user.id === selectPayee) === -1) {
        console.log('No Recipient')
        hasError = true;
      }
  
      if (selectPayor === selectPayee) {
        console.log('Payor and Recipient cannot be the same')
        hasError = true;
      }
    }
    if(hasError) return;

    // If No Errors, Process Data
    const newTransaction = {
      id: transactionId,
      description: editableText,
      type: selectType,
      date: transactionDate,
      icon: selectType === 'Transfer' ? 'receipt_long' : selectIcon,
      amount: transactionAmount ? transactionAmount : 0,
      payer: selectPayor,
      recipient: selectType === 'Expense' ? 0 : selectPayee,
      split_mode: selectType === 'Expense' ? selectSplit : "",
      split_members: selectSplit === 'Specific' ? splitMembers
      : splitMembers.map(member => ({
        id: member.id,
        name: member.name,
        share: 1,
        split: true
      }))
    }

    replaceTransaction({groupId: currentGroup.id, updatedTransaction: newTransaction})
    console.log('Success!',newTransaction)
  }


  useEffect(()=> {
    console.log(transactionDate)
    console.log(selectPayee)
  }, [transactionDate])

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

      <div className="border p-4 rounded-lg grid  items-center h-fit gap-2 sm:grid-cols-[auto_1fr]"
      >
        <span>Type: </span>
        <ToggleGroup options={typeOptions} initial={selectType} onToggleChange={onToggleChange}/>

        <label htmlFor="transactionDate">Date: </label>
        <input type="date" name="date" id="transactionDate" 
        className="p-2 pl-4 border-2 bg-gray-200 rounded-full" value={transactionDate} onChange={handleChangeDate}/>
        
        {selectType === 'Expense' &&
         <>
          <span>Icon: </span>
          <ToggleGroup options={iconList}  initial={selectIcon} onToggleChange={handleChangeIcon} icon={true}/>
        </>
        }

        <label htmlFor="transactionAmount">Amount: </label>
        <input className="p-2 pl-4 border-2 bg-gray-200 rounded-full" type="number" name="amount" id="transactionAmount" value={transactionAmount} onChange={handleChangeAmount} onBlur={handleBlurAmount}/>
        
        <label htmlFor="transactionPayor">Payor: </label>
        <select id="transactionPayor" className="p-2 border-2" value={selectPayor} onChange={handleChangePayor}>
          {payorOptions?.map((user, index) => <option key={index} value={user.id}>{user.name}</option>)}
        </select>

        {selectType === 'Transfer' &&
         <>
          <label htmlFor="transactionPayee">Recipient: </label>
          <select id="transactionPayee" className="p-2 border-2" value={selectPayee} onChange={handleChangePayee}>
            {payeeOptions?.map((user, index) => <option key={index} value={user.id}>{user.name}</option>)}
          </select>
         </>
        }
        
        {selectType === 'Expense' &&
        <>
          <span>Split Mode: </span>
          <ToggleGroup options={splitOptions}  initial={selectSplit} onToggleChange={handleChangeSplit}/>

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
              <div className="flex flex-col">
                <div className="flex p-2 gap-2">
                  <button onClick={handleSelectAll} className="border-2 p-1 rounded-md bg-gray-200">Select All</button>
                  <button onClick={handleUnselectAll} className="border-2 p-1 rounded-md bg-gray-200">Unselect All</button>
                </div>
                <div className="">
                  {splitMembers?.map((user, index) => 
                    <label key={index} className="grid max-[350px]:grid-cols-1 max-sm:grid-cols-[1fr_2fr] sm:grid-cols-[1fr_1fr_2fr] items-center p-2 px-4 gap-2" htmlFor={`checkbox-${user.id}`}>
                      <div className="flex gap-2 max-sm:row-span-2">
                        <input 
                        type="checkbox" 
                        name="share" 
                        id={`checkbox-${user.id}`} 
                        value={user.id}
                        checked={user.split}
                        onChange={(e) => handleChangeSplitMembers(parseInt(e.target.value))}/>
                        {user.name}
                      </div>
                      <label className="flex flex-wrap items-center gap-2" htmlFor={`weight-${user.id}`}>
                        Weight:
                        <input 
                        className=" max-w-32 p-2 border-2 bg-gray-200 rounded-full" type="number" 
                        name="weight" 
                        id={`weight-${user.id}`} 
                        value={user.share.toString()} 
                        onChange={handleChangeWeight} 
                        onBlur={handleBlurWeight}/>
                      </label>
                      <div className="flex flex-col w-fit">
                        <span>{`Percentage: ${
                          computePercentage(user.share, totalShare) < 1 && user.share !== 0 ? '< 1' : computePercentage(user.share, totalShare)}%`}</span>
                        <span className="font-bold">{`Share: ${computeShare(user.share, totalShare, transactionAmount).toLocaleString()}`}</span>
                      </div>

                    </label>
                    )}
                </div>

              </div>
          </>
            }
          </div>
        </>
        }
      </div>
        <div className="flex max-sm:flex-col gap-2 justify-end">
          <button onClick={handleSubmit} className="bg-green-400 p-2 px-4 rounded-full">{`${mode === 'add' ? 'Add New' : 'Update Changes'}`}</button>
          <button className="bg-red-400 p-2 px-4 rounded-full">Delete Transaction</button>
        </div>

    </div>
  )
}
