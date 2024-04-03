'use client'

import EditableDiv from "@/components/EditableDiv";
import ToggleGroup from "@/components/formComponents/ToggleGroup";
import { getCurrentGroup, getTransactionFromGroup } from "@/functions/LocalStorageFunc";
import Link from "next/link";
import { useState } from "react";

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
  const options = ['Expense', 'Transfer'];
  const [ selectType, setSelectType ] = useState(options[0]);
  const onToggleChange = (value) => {
    setSelectType(value)
  }


  const iconList = ['airport_shuttle', 'restaurant', 'cake', 'sports_soccer', 'sports_tennis', 'shopping_cart', 'monitoring']


  const handleSubmit = (event) => {
    event.preventDefault();
  }


  return (
    <div className="grid gap-4"
    style={{gridTemplateRows: 'auto 1fr'}}>
      <Link 
      href={`/groups/${currentGroup.id}`}
      className='w-fit flex items-center gap-2'
      >
        <span className="material-symbols-outlined">arrow_back_ios_new</span>
        Go back to <strong>{currentGroup.name}</strong>
      </Link>

      <form onSubmit={handleSubmit} className="border p-4 rounded-lg grid">
        <EditableDiv editableText={editableText} setEditableText={setEditableText} editing={editing} setEditing={setEditing} handleEditable={handleChangeEditable} required/>
        <div className="flex items-center gap-2">
          <span>Transaction Type: </span>
          <ToggleGroup options={options} onToggleChange={onToggleChange}/>
        </div>
        <p>{selectType}</p>
        {/* <div>
          <label htmlFor="transactionDate">Date: </label>
          <input type="date" name="date" id="transactionDate" required/>
        </div>
        <div>
          <span>Icon: </span>
          {iconList?.map((icon, index) => (
            <div key={index}>
              <input type="radio" name="transactionIcon" id={index} value="airport_shuttle" />
              <label htmlFor={index}>
                <span className="material-symbols-outlined">{icon}</span>
              </label>
            </div>
          ))}
        </div>
        <div>
          <label htmlFor="transactionAmount">Amount Spent: </label>
          <input type="number" name="amount" id="transactionAmount" />
        </div>
        <div>
          <label htmlFor="transactionPayor">Payor: </label>
          <select id="transactionPayor">
            {currentGroup.users?.map((user, index) => <option key={index} value={user.id}>{user.name}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="transactionPayee">Payee: </label>
          <select id="transactionPayee">
            {currentGroup.users?.map((user, index) => <option key={index} value={user.id}>{user.name}</option>)}
          </select>
        </div>
        
        <div>
          <label htmlFor="transactionSplit">Share:</label>
          <select name="type" id="transactionSplit">
            <option value="1">Evenly</option>
            <option value="2">Specific</option>
          </select>
        </div>
        <div>
          <button>Select All</button>
          <button>UnSelect All</button>
        </div>
        {currentGroup.users?.map((user, index) => 
          <div key={index}>
            <input type="checkbox" name="share" id={`checkbox-${user.id}`} />
            <label htmlFor={`checkbox-${user.id}`}>{user.name}</label>
            
            <label htmlFor={`weight-${user.id}`}>Weight</label>
            <input type="text" name="weight" id={`weight-${user.id}`} />

            <span >50%</span>
            <span >10000</span>

          </div>
        )}
        <button>Save</button>
        <button>Cancel</button> */}
      </form>

    </div>
  )
}
