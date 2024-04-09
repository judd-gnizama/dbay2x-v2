'use client'

import { ProcessAllGroups, getCurrencyCodes } from "@/functions/InterfaceFunc";
import { addTransaction, getAllGroupIds, getAllUniqueUserIds, getCurrentGroup, getCurrentGroupId, getGroupById, getGroups, getRawData, replaceUserProp  } from "@/functions/LocalStorageFunc";
import { computeReimbursements, processGroup } from "@/functions/ProcessGroupData";
import { useState } from "react";

export default function LocalStorageManager() {

  const [ values, setValues ]  = useState(null);

  const DATA_KEY = 'myDataKey'

  const test_groups =  [
      {
      name: 'Trip to CDO', 
      description: 'Christmas Party at Lolas House',
      id: 1,
      users: [
        {
          id: 1,
          name: 'Judd',
          paid: 10000,
          share: 32340,
          net: 423420,
        },
        {
          id: 2,
          name: 'Jon',
          paid: 423420,
          share: 1000,
          net: 1000,
        },
        {
          id: 3,
          name: 'Jyll',
          paid: 423420,
          share: 3234,
          net: 1000,
        },
        {
          id: 4,
          name: 'Mom',
          paid: 3234,
          share: 423420,
          net: 1000,
        },
        {
          id: 5,
          name: 'Maverick',
          paid: 10000,
          share: 32340,
          net: 423420,
        },
        {
          id: 6,
          name: 'Myles',
          paid: 423420,
          share: 1000,
          net: 1000,
        },
        {
          id: 7,
          name: 'Mae',
          paid: 423420,
          share: 3234,
          net: 1000,
        },
        {
          id: 8,
          name: 'Julie',
          paid: 3234,
          share: 423420,
          net: 1000,
        },
      ],
      transactions: [
        {
          id: 1,
          type: 'Expense', // type: 1 - expense, type: 2 - settlement
          date: "2025-05-21",
          description: "Birthday Gift",
          icon: 'receipt_long',
          payer: 1, // user_id
          amount: 4500,
          recipient: 0, // user_id, 0 - if type 1
          split_mode: 'Specific',
          split_members: [
            {
              id: 1,
              name: 'Judd',
              weight: 32340,
              split: true,
            },
            {
              id: 2,
              name: 'Jon',
              weight: 32340,
              split: true,
            },
            {
              id: 3,
              name: 'Jyll',
              weight: 32340,
              split: true,
            },
            {
              id: 4,
              name: 'Mom',
              weight: 0,
              split: false,
            },
            {
              id: 5,
              name: 'Maverick',
              weight: 0,
              split: false,
            },
            {
              id: 6,
              name: 'Myles',
              weight: 0,
              split: false,
            },
            {
              id: 7,
              name: 'Mae',
              weight: 0,
              split: false,
            },
            {
              id: 8,
              name: 'Julie',
              weight: 0,
              split: false,
            },
          ]
        },
        {
          id: 2,
          type: 'Settlement', // type: 1 - expense, type: 2 - settlement
          date: "2025-07-07",
          description: "Basketball",
          icon: 'receipt_long',
          payer: 3, // user_id
          amount: 5660,
          recipient: 2, // user_id, 0 - if type 1
          split_mode: 'Evenly',
          split_members: [
            {
              id: 1,
              name: 'Judd',
              weight: 0,
              split: false,
            },
            {
              id: 2,
              name: 'Jon',
              weight: 0,
              split: false,
            },
            {
              id: 3,
              name: 'Jyll',
              weight: 0,
              split: false,
            },
            {
              id: 4,
              name: 'Mom',
              weight: 0,
              split: false,
            },
            {
              id: 5,
              name: 'Maverick',
              weight: 0,
              split: false,
            },
            {
              id: 6,
              name: 'Myles',
              weight: 0,
              split: false,
            },
            {
              id: 7,
              name: 'Mae',
              weight: 0,
              split: false,
            },
            {
              id: 8,
              name: 'Julie',
              weight: 0,
              split: false,
            },
          ]
        },
        {
          id: 3,
          type: 'Expense', // type: 1 - expense, type: 2 - settlement
          date: "2003-11-21",
          description: "Games",
          icon: 'receipt_long',
          payer: 6, // user_id
          amount:  12230,
          recipient: 0, // user_id, 0 - if type 1
          split_mode: 'Evenly',
          split_members: [
            {
              id: 1,
              name: 'Judd',
              weight: 1,
              split: true,
            },
            {
              id: 2,
              name: 'Jon',
              weight: 1,
              split: true,
            },
            {
              id: 3,
              name: 'Jyll',
              weight: 1,
              split: true,
            },
            {
              id: 4,
              name: 'Mom',
              weight: 1,
              split: true,
            },
            {
              id: 5,
              name: 'Maverick',
              weight: 1,
              split: true,
            },
            {
              id: 6,
              name: 'Myles',
              weight: 1,
              split: true,
            },
            {
              id: 7,
              name: 'Mae',
              weight: 1,
              split: true,
            },
            {
              id: 8,
              name: 'Julie',
              weight: 1,
              split: true,
            },
          ]
        },
        {
          id: 4,
          type: 'Settlement', // type: 1 - expense, type: 2 - settlement
          date: "2123-07-21",
          description: "Box",
          icon: 'receipt_long',
          payer: 4, // user_id
          amount:  3240,
          recipient: 1, // user_id, 0 - if type 1
          split_mode: 'Evenly',
          split_members: [
            {
              id: 1,
              name: 'Judd',
              weight: 0,
              split: false,
            },
            {
              id: 2,
              name: 'Jon',
              weight: 0,
              split: false,
            },
            {
              id: 3,
              name: 'Jyll',
              weight: 0,
              split: false,
            },
            {
              id: 4,
              name: 'Mom',
              weight: 0,
              split: false,
            },
            {
              id: 5,
              name: 'Maverick',
              weight: 0,
              split: false,
            },
            {
              id: 6,
              name: 'Myles',
              weight: 0,
              split: false,
            },
            {
              id: 7,
              name: 'Mae',
              weight: 0,
              split: false,
            },
            {
              id: 8,
              name: 'Julie',
              weight: 0,
              split: false,
            },
          ]
        },
      ],
      reimbursements: [
        // algorithm
        // 1. Get who has highest net, 2. Get who has lowest net, 3. 1 --> 2, 4. update net, 5. repeat process. 5. stop when all net are zero. 
      ]
      }, 
      {
        name: 'Boracay Vacation', 
        description: 'Christmas Party at Lolas House',
        id: 2,
        users: [
          {
            id: 1,
            name: 'Judd',
            paid: 100,
            share: 30,
            net: 4420,
          },
          {
            id: 2,
            name: 'Jon',
            paid: 4420,
            share: 1300,
            net: 1200,
          },
          {
            id: 3,
            name: 'Jyll',
            paid: 4320,
            share: 434,
            net: 130,
          },
          {
            id: 55,
            name: 'Rodney',
            paid: 4,
            share: 420,
            net: 10,
          },
          {
            id: 51,
            name: 'Niko',
            paid: 9,
            share: 40,
            net: 4220,
          },
          {
            id: 61,
            name: 'Avatar',
            paid: 42,
            share: 109,
            net: 1770,
          },
        ],
        transactions: [
          {
            id: 34,
            type: 'Expense', // type: 1 - expense, type: 2 - settlement
            date: "2021-08-11",
            description: "Weapons",
            icon: 'receipt_long',
            payer: 61, // user_id
            amount: 10000,
            recipient: 0, // user_id, 0 - if type 1
            split_mode: 'Evenly',
            split_members: [
              {
                id: 1,
                name: 'Judd',
                weight: 10,
                split: true,
              },
              {
                id: 2,
                name: 'Jon',
                weight: 10,
                split: true,
              },
              {
                id: 3,
                name: 'Jyll',
                weight: 10,
                split: true,
              },
              {
                id: 55,
                name: 'Rodney',
                weight: 10,
                split: true,
              },
              {
                id: 51,
                name: 'Niko',
                weight: 10,
                split: true,
              },
              {
                id: 61,
                name: 'Avatar',
                weight: 10,
                split: true,
              },
            ]
          },
          {
            id: 1422,
            type: 'Expense', // type: 1 - expense, type: 2 - settlement
            date: "2026-08-11",
            description: "Magic",
            icon: 'receipt_long',
            payer: 61, // user_id
            amount: 100,
            recipient: 0, // user_id, 0 - if type 1
            split_mode: 'Specific',
            split_members: [
              {
                id: 1,
                name: 'Judd',
                weight: 0,
                split: false,
              },
              {
                id: 2,
                name: 'Jon',
                weight: 0,
                split: false,
              },
              {
                id: 3,
                name: 'Jyll',
                weight: 0,
                split: false,
              },
              {
                id: 55,
                name: 'Rodney',
                weight: 0,
                split: false,
              },
              {
                id: 51,
                name: 'Niko',
                weight: 10,
                split: true,
              },
              {
                id: 61,
                name: 'Avatar',
                weight: 10,
                split: true,
              },
            ]
          },
          // {
          //   id: 2,
          //   type: 'Settlement', // type: 1 - expense, type: 2 - settlement
          //   date: "2033-11-07",
          //   description: "Badminton",
          //   icon: 'receipt_long',
          //   payer: 51, // user_id
          //   amount: 1666.66666666666666,
          //   recipient: 61, // user_id, 0 - if type 1
          //   split_mode: 'Evenly',
          //   split_members: [
          //     {
          //       id: 1,
          //       name: 'Judd',
          //       share: 0,
          //       split: false,
          //     },
          //     {
          //       id: 2,
          //       name: 'Jon',
          //       share: 0,
          //       split: false,
          //     },
          //     {
          //       id: 3,
          //       name: 'Jyll',
          //       share: 0,
          //       split: false,
          //     },
          //     {
          //       id: 55,
          //       name: 'Rodney',
          //       share: 0,
          //       split: false,
          //     },
          //     {
          //       id: 51,
          //       name: 'Niko',
          //       share: 0,
          //       split: false,
          //     },
          //     {
          //       id: 61,
          //       name: 'Avatar',
          //       share: 0,
          //       split: false,
          //     },
          //   ]
          // }
        ],
        reimbursements: [
          // algorithm
          // 1. Get who has highest net, 2. Get who has lowest net, 3. 1 --> 2, 4. update net, 5. repeat process. 5. stop when all net are zero. 
        ]
      },
  ]

  const test_db = {
    currentGroupId: 1,
    groups: test_groups
  }

  const handleLoad = () => {
    localStorage.setItem(DATA_KEY, JSON.stringify(test_db));
  }

  const handleClear = () => {
    localStorage.removeItem(DATA_KEY);
  }

  const handleShow = () => {
  setValues(JSON.stringify(getRawData()))
  }

 const handleFunction = () => {
  console.log(getCurrencyCodes())
}

  return (
    <div className="flex flex-col gap-4 item w-fit">
      <button onClick={()=> handleLoad()} className="bg-slate-300 hover:opacity-80 p-2">Load Dummy Data</button>
      <button onClick={()=> handleClear()} className="bg-slate-300 hover:opacity-80 p-2">Clear Data</button>
      <button onClick={()=> handleShow()} className="bg-slate-300 hover:opacity-80 p-2">Console Stored Data</button>
      <button onClick={()=> handleFunction()} className="bg-slate-300 hover:opacity-80 p-2">Run Custom Function</button>
      <p>{values ? values : ''}</p>
    </div>
  )
}
