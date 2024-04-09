'use client'

import EditableDiv from "@/components/EditableDiv";
import { sortItems } from "@/components/Results";
import ToggleGroup from "@/components/formComponents/ToggleGroup";
import { confirmCancelToast, getDateToday } from "@/functions/InterfaceFunc";
import { addTransaction, getCurrentGroup, getTransactionFromGroup, removeTransaction, replaceTransaction } from "@/functions/LocalStorageFunc";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";

export default function TransactionPage({ params }) {
  // Search params
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode');
  const type = searchParams.get('type');
  const from = parseInt(searchParams.get('from'));
  const to = parseInt(searchParams.get('to'));
  const date = searchParams.get('date');
  const amount = parseFloat(searchParams.get('amount'));
  const description = searchParams.get('name');
  const groupId = parseInt(searchParams.get('groupId'));
  const transactionId = parseInt(params.transactionId);
  // 
  const currentGroup = getCurrentGroup();
  const transaction = getTransactionFromGroup({groupId: currentGroup.id, transactionId: transactionId})

  const router = useRouter();

  const initialValues = mode === 'add' ? 
    {
      id: transactionId,
      description: description ? description : '',
      type: type ? type : 'Expense',
      date: date ? date : getDateToday(), // Date today
      icon: type === 'Expense' ? "receipt_long" : "handshake",
      amount: amount ? amount : 0,
      payer: from ? from : currentGroup.users[0].id,
      recipient: to ? to : currentGroup.users[0].id,
      split_mode: "Evenly",
      split_members: []
    }
    :
    transaction;
  // For Global Edits
  const [ isMounted, setIsMounted ] = useState(false);
  const [ isChanged, setIsChanged ] = useState(false);


  // For Description
  const [ editableText, setEditableText ] = useState(initialValues.description);
  const [ editing, setEditing ] = useState(false);
  const handleChangeEditable = (event) => {
    const description = event.target.textContent;
    setEditing(false);
    setEditableText(description);
  }

  // For Transaction Type
  const typeOptions = ['Expense', 'Settlement'];
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
  const iconList = ['receipt_long', 'house', 'icecream', 'trip', 'apartment','movie', 'water_drop','electric_bolt','airport_shuttle', 'restaurant', 'cake', 'sports_soccer', 'sports_tennis', 'shopping_cart', 'monitoring']
  const [ selectIcon, setSelectIcon ] = useState(initialValues.icon);
  const handleChangeIcon = (value) => {
    setSelectIcon(value)
  }

  // For Payor
  const payorOptions = sortItems({type: 'name', itemList: currentGroup.users})
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
      weight: 0, 
      split: false
    }))
  }

  const memberOptions = sortItems({type: 'name', itemList: initializeMembers(currentGroup.users)})
  const [ splitMembers, setSplitMembers ] = useState(mode === 'add'? memberOptions : initialValues.split_members);
  const computeInitialTotal = (newMembers) => {
    let total = 0;
    newMembers.forEach(member => total+=member.weight)
    return total
  }

  const [ totalWeight, setTotalWeight ] = useState(computeInitialTotal(splitMembers));

  const handleChangeSplitMembers = (value) => {
    const newMembers = splitMembers.map(member=>member.id === value ? 
      {
        ...member, 
        split: member.split ? false : true, 
        weight: member.split ? 0 : 1
      } : member)

    setSplitMembers(sortItems({itemList: newMembers, type: 'name'}))
    computeTotal(newMembers)
  }
  const handleSelectAll = (event) => {
    event.preventDefault();
    const newMembers = splitMembers.map(member => ({...member, weight: 1, split: true}))
    setSplitMembers(newMembers)
    computeTotal(newMembers)
  }
  const handleUnselectAll = (event) => {
    event.preventDefault()
    const newMembers = splitMembers.map(member => ({...member, weight: 0, split: false}))
    setSplitMembers(newMembers)
    computeTotal(newMembers);
  }
  const handleChangeWeight = (event) => {

    const splitMemberId = parseInt(event.target.id.split('-')[1]);
    const splitMember = splitMembers.filter(member => member.id === splitMemberId)[0];
    if (splitMember.split) {
      let value = event.target.value;
      const weight = parseFloat(value);
      const newSplitMembers = splitMembers.map(member => member.id === splitMemberId ? {...member, weight: weight} : member)
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
        const newSplitMembers = splitMembers.map(member => member.id === splitMemberId ? {...member, weight: 0 } : member)
        setSplitMembers(newSplitMembers);  
        computeTotal(newSplitMembers)
      }
    }  

  }
  const computeTotal = (newMembers) => {
    let total = 0;
    newMembers.forEach(member => total+=member.weight)
    setTotalWeight(total);
  }
  const computePercentage = (weight, total) => {
    if(total === 0) return 0
    return (weight/total * 100).toFixed(2)
  }
  const computeWeight = (weight, total, amount) => {
    const per = (weight/total)
    return total ? (per * amount) : 0
  }

  // Overall 
  const handleSubmit = (event) => {
    
    event.preventDefault();
    var hasError = false;
    if (!transactionDate){
      toast.error('Invalid Date')
      hasError = true;
    } 
    if (!editableText) {
      toast.error('No Description')
      hasError = true;
    }
    if (!transactionAmount || transactionAmount <= 0) {
      toast.error('Invalid Amount')
      hasError = true;
    } 
    if (!selectPayor || currentGroup.users.findIndex(user=>user.id === selectPayor) === -1) {
      toast.error('Invalid Payor')
      hasError = true;
    }
    
    if (selectType === 'Expense') {
      if (!selectIcon) {
        toast.error('Invalid Icon')
        hasError = true;
      }
      
      if(selectSplit === 'Specific') {
        const noSplitMembers = splitMembers?.findIndex(member => member.split) === -1
        const splitButZero = splitMembers?.findIndex(member => member.split && member.weight === 0 ) !== -1
  
        if (noSplitMembers || splitButZero) {
          toast.error('Invalid Split Details')
          hasError = true;
        }
      }

    } else if (selectType === 'Settlement') {
      if (!selectSplit) {
        toast.error('Invalid Split Mode')
        hasError = true;
      }
      if (!selectPayee || currentGroup.users.findIndex(user=>user.id === selectPayee) === -1) {
        toast.error('Invalid Recipient')
        hasError = true;
      }
      
      if (selectPayor === selectPayee) {
        toast.error('Payor and Recipient must not be the same')
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
      icon: selectType === 'Settlement' ? 'handshake' : selectIcon,
      amount: transactionAmount ? parseFloat(transactionAmount) : 0,
      payer: selectPayor,
      recipient: selectType === 'Expense' ? 0 : selectPayee,
      split_mode: selectSplit || 'Evenly',
      split_members: selectSplit === 'Specific' ? splitMembers
      : splitMembers.map(member => ({
        id: member.id,
        name: member.name,
        weight: selectType === 'Expense' ? 1 : 0,
        split: selectType === 'Expense' ? true : false
      }))
    }
    if (mode === 'add') {
      addTransaction({ groupId: groupId, newTransaction: newTransaction})
      toast.success(`Transaction: ${newTransaction.description} added`)
    } else if (mode === 'edit') {
      replaceTransaction({groupId: currentGroup.id, updatedTransaction: newTransaction})
      toast.success(`Transaction: ${newTransaction.description} updated`)
    }
    goBackToGroup();
  }

  const handleGoBack = () => {
    confirmCancelToast({message: 'Discard Changes? ', confirmFn: handleBeforeGo})
  }

  const handleBeforeGo = () => {
    toast.dismiss();
    toast.info('Changes Discarded')
    goBackToGroup();
  }

  const goBackToGroup = () => {
    router.push(`/groups/${currentGroup.id}`)
  }
  const handleCancel = () => {
    toast.info('Transaction Cancelled')
    goBackToGroup();
  }
  const handleDiscard = () => {
    goBackToGroup();
  }
  const handleDelete = () => {
    const toastId = toast(
      <div className="flex gap-2 items-center">
      <p>Delete Transaction? </p>
      <button className="border-2 p-1 px-4 rounded-full" onClick={()=>{
        removeTransaction({groupId: groupId, transactionId: transactionId})
        toast.success("Transaction Deleted")
        goBackToGroup();
        toast.dismiss();

      }}>Confirm</button>  
      <button className="bg-teal-400 p-1 px-4 rounded-full" onClick={()=> toast.dismiss(toastId)}>Cancel</button>  
    </div>)
  }

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(()=> {
    if (!isChanged && isMounted) {
      setIsChanged(true)
    }
  }, [selectType, transactionDate, transactionAmount, selectPayor, selectPayee, selectSplit, selectIcon, splitMembers, totalWeight])

  return (
    <div className="grid gap-4"
    style={{gridTemplateRows: 'auto auto 1fr'}}>
      <button 
      className='w-fit flex items-center gap-2'
      onClick={handleGoBack}
      >
      <span className="material-symbols-outlined">arrow_back_ios_new</span>
        Go back to <strong>{currentGroup.name}</strong>
      </button>
      <EditableDiv editableText={editableText} setEditableText={setEditableText} editing={editing} setEditing={setEditing} handleEditable={handleChangeEditable}/>

      <div className="border p-4 rounded-lg grid items-center h-fit gap-2 gap-x-10 sm:grid-cols-[auto_1fr]"
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

        {selectType === 'Settlement' &&
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
                    <label key={index} className={`grid max-[350px]:grid-cols-1 max-sm:grid-cols-[1fr_2fr] sm:grid-cols-[1fr_1fr_2fr] items-center p-2 px-4 gap-2 border-2 `}
                    htmlFor={`checkbox-${user.id}`}>
                      <div className="flex gap-2 max-sm:row-span-2">
                        <input 
                        type="checkbox" 
                        name="weight" 
                        id={`checkbox-${user.id}`} 
                        value={user.id}
                        checked={user.split}
                        onChange={(e) => handleChangeSplitMembers(parseInt(e.target.value))}/>
                        {user.name}
                      </div>
                      <label className={`flex flex-wrap items-center gap-2 ${user.split ? '' : 'opacity-40'}`} htmlFor={`weight-${user.id}`}>
                        Weight:
                        <input 
                        className=" max-w-32 p-2 border-2 bg-gray-200 rounded-full disabled:opacity-40" type="number" 
                        name="weight" 
                        id={`weight-${user.id}`} 
                        value={user.weight.toString()} 
                        onChange={handleChangeWeight} 
                        onBlur={handleBlurWeight}
                        disabled={!user.split}/>
                      </label>
                      <div className="flex flex-col w-fit">
                        <span>{`Percentage: ${
                          computePercentage(user.weight, totalWeight) < 1 && user.weight !== 0 ? '< 1' : computePercentage(user.weight, totalWeight)}%`}</span>
                        <span className="font-bold">{`Weight: ${computeWeight(user.weight, totalWeight, transactionAmount).toLocaleString()}`}</span>
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
          <button 
            onClick={handleSubmit} 
            className="bg-green-400 p-2 px-4 rounded-full disabled:opacity-40 disabled:pointer-events-none"
            disabled={mode === 'add' ? false : !isChanged}>
              {`${mode === 'add' ?  'Save Transaction' : 'Update Changes' }`}
          </button>
          <button 
            className="bg-red-300 p-2 px-4 rounded-full " 
            hidden={mode !== 'add'}
            onClick={handleCancel}>
              Cancel
          </button>
          <button 
            className="bg-red-300 p-2 px-4 rounded-full disabled:opacity-40 disabled:pointer-events-none"
            disabled={!isChanged}
            onClick={handleDiscard}
            hidden={mode !== 'edit'}>
              Discard Changes
          </button>
          <button 
            className="bg-gray-400 p-2 px-4 rounded-full"
            onClick={handleDelete}
            hidden={mode !== 'edit'}>
              Delete Transaction
          </button>
        </div>

    </div>
  )
}
