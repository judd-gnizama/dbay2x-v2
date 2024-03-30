'use client'

import { useEffect, useState } from "react"
import GetLocalStored from "@/app/GetLocalStored"

export default function LocalStorageManager() {

  const DATA_KEY = 'myDataKey'

  const test_users =  [
    {
      id: 1,
      name: 'Judd',
      total_paid: 10000,
      total_share: 32340,
      total_net: 423420,
    },
    {
      id: 2,
      name: 'Jon',
      total_paid: 423420,
      total_share: 1000,
      total_net: 1000,
    },
    {
      id: 3,
      name: 'Jyll',
      total_paid: 423420,
      total_share: 3234,
      total_net: 1000,
    },
    {
      id: 4,
      name: 'Mom',
      total_paid: 3234,
      total_share: 423420,
      total_net: 1000,
    },
    {
      id: 5,
      name: 'Maverick',
      total_paid: 10000,
      total_share: 32340,
      total_net: 423420,
    },
    {
      id: 6,
      name: 'Myles',
      total_paid: 423420,
      total_share: 1000,
      total_net: 1000,
    },
    {
      id: 7,
      name: 'Mae',
      total_paid: 423420,
      total_share: 3234,
      total_net: 1000,
    },
    {
      id: 8,
      name: 'Julie',
      total_paid: 3234,
      total_share: 423420,
      total_net: 1000,
    },
  ]
  const test_groups = [
    {
      id: 1,
      name: 'Bohol Vacation',
      members: [
        {
          id: 1,
          paid: 5100,
          share: 1800,
          net: -3300,
        },
        {
          id: 2,
          paid: -600,
          share: 900,
          net: 1500,
        },
        {
          id: 3,
          paid: 0,
          share: 1800,
          net: 1800,
        },
      ],
      transactions: [
        {
          id: 1,
          date: "04-04-2024",
          description: "Birthday Gift",
          type: 1, // type: 1 - expense, type: 2 - transfer
          payer: 1, // user_id
          amount: 4500,
          recipient: 0, // user_id, 0 - if type 1
          split_members: [
            {
              id: 1, //user_id
              share: 2, //float - percentage of payment to pay
            },
            {
              id: 2, //user_id
              share: 1, //float - percentage of payment to pay
            },
            {
              id: 3, //user_id
              share: 2, //float - percentage of payment to pay
            },
          
          ]
        },
        {
          id: 2,
          date: "04-09-2024",
          description: "New Game",
          type: 2, // type: 1 - expense, type: 2 - transfer
          payer: 1, // user_id
          amount: 600,
          recipient: 2, // user_id, 0 - if type 1
          split_members: []
        }
      ],
      reimbursements: [
        // algorithm
        // 1. Get who has highest net, 2. Get who has lowest net, 3. 1 --> 2, 4. update net, 5. repeat process. 5. stop when all net are zero. 
        {
          id: 1,
          from: 3, 
          to: 1,
          amount: 1800,
        },
        {
          id: 2,
          from: 2, 
          to: 1,
          amount: 1500,
        },
      ]
    },
    {
      id: 2,
      name: 'Trip to CDO',
      members: [
        {
          id: 1,
          paid: 1000,
          share: 1500,
          net: 500,
        },
        {
          id: 2,
          paid: 0,
          share: 250,
          net: 250,
        },
        {
          id: 3,
          paid: 5000,
          share: 3000,
          net: -2000,
        },
        {
          id: 4,
          paid: 0,
          share: 1250,
          net: 1250,
        },
      ],
      transactions: [
        {
          id: 1,
          date: "03-10-2024",
          description: "Transportation",
          type: 1, // type: 1 - expense, type: 2 - transfer
          payer: 1, // user_id
          amount: 1000,
          recipient: 0, // user_id, 0 - if type 1
          split_members: [
            {
              id: 1, //user_id
              share: 2, //float - percentage of payment to pay
            },
            {
              id: 2, //user_id
              share: 1, //float - percentage of payment to pay
            },
            {
              id: 4, //user_id
              share: 1, //float - percentage of payment to pay
            },
          ]
        },
        {
          id: 2,
          date: "03-11-2024",
          description: "Food",
          type: 1, // type: 1 - expense, type: 2 - transfer
          payer: 3, // user_id
          amount: 5000,
          recipient: 0, // user_id, 0 - if type 1
          split_members: [
            {
              id: 1, //user_id
              share: 1, //float - percentage of payment to pay
            },
            {
              id: 3, //user_id
              share: 3, //float - percentage of payment to pay
            },
            {
              id: 4, //user_id
              share: 1, //float - percentage of payment to pay
            },
          
          ]
        }
      ],
      reimbursements: [
        {
          id: 1,
          from: 4,
          to: 3, 
          amount: 1250,
        },
        {
          id: 2,
          from: 1,
          to: 3, 
          amount: 500,
        },
        {
          id: 3,
          from: 2,
          to: 3, 
          amount: 250,
        }
      ]
    },
    {
      id: 3,
      name: 'awewfawefawfe',
      members: [
        {
          id: 1,
          paid: 0,
          share: 0,
          net: 0,
        },
        {
          id: 2,
          paid: 0,
          share: 0,
          net: 0,
        },
        {
          id: 3,
          paid: 0,
          share: 0,
          net: 0,
        },
        {
          id: 4,
          paid: 0,
          share: 0,
          net: 0,
        },
      ],
      transactions: [
        {
          id: 1,
          date: "03-10-2024",
          description: "Transportation",
          type: 1, // type: 1 - expense, type: 2 - transfer
          payer: 1, // user_id
          amount: 5000,
          recipient: 0, // user_id, 0 - if type 1
          split_members: [
            {
              id: 2, //user_id
              share: 1, //float - percentage of payment to pay
            },
            {
              id: 3, //user_id
              share: 1, //float - percentage of payment to pay
            },
            {
              id: 4, //user_id
              share: 1, //float - percentage of payment to pay
            },
          ]
        },
        {
          id: 2,
          date: "03-10-2024",
          description: "Transportation",
          type: 1, // type: 1 - expense, type: 2 - transfer
          payer: 1, // user_id
          amount: 6000,
          recipient: 0, // user_id, 0 - if type 1
          split_members: [
            {
              id: 1, //user_id
              share: 1, //float - percentage of payment to pay
            },
            {
              id: 2, //user_id
              share: 1, //float - percentage of payment to pay
            },
            {
              id: 3, //user_id
              share: 1, //float - percentage of payment to pay
            },
            {
              id: 4, //user_id
              share: 1, //float - percentage of payment to pay
            },
          ]
        },
        {
          id: 3,
          date: "03-10-2024",
          description: "Transportation",
          type: 1, // type: 1 - expense, type: 2 - transfer
          payer: 3, // user_id
          amount: 30089,
          recipient: 0, // user_id, 0 - if type 1
          split_members: [
            {
              id: 1, //user_id
              share: 1, //float - percentage of payment to pay
            },
            {
              id: 2, //user_id
              share: 1, //float - percentage of payment to pay
            },
            {
              id: 3, //user_id
              share: 1, //float - percentage of payment to pay
            },
            {
              id: 4, //user_id
              share: 1, //float - percentage of payment to pay
            },
          ]
        },
      ],
      reimbursements: [
        {
          id: 1,
          from: 4,
          to: 3, 
          amount: 1250,
        },
        {
          id: 2,
          from: 1,
          to: 3, 
          amount: 500,
        },
        {
          id: 3,
          from: 2,
          to: 3, 
          amount: 250,
        }
      ]
    },
    
    {
      id: 4,
      name: 'awewfawefawfe',
      members: [
        {
          id: 1,
          paid: 0,
          share: 0,
          net: 0,
        },
        {
          id: 2,
          paid: 0,
          share: 0,
          net: 0,
        },
        {
          id: 3,
          paid: 0,
          share: 0,
          net: 0,
        },
        {
          id: 4,
          paid: 0,
          share: 0,
          net: 0,
        },
      ],
      transactions: [
        {
          id: 1,
          date: "03-10-2024",
          description: "Transportation",
          type: 1, // type: 1 - expense, type: 2 - transfer
          payer: 1, // user_id
          amount: 12000,
          recipient: 0, // user_id, 0 - if type 1
          split_members: [
            {
              id: 2, //user_id
              share: 1, //float - percentage of payment to pay
            },
            {
              id: 3, //user_id
              share: 1, //float - percentage of payment to pay
            },
            {
              id: 4, //user_id
              share: 1, //float - percentage of payment to pay
            },
          ]
        },
        {
          id: 2,
          date: "03-10-2024",
          description: "Transportation",
          type: 1, // type: 1 - expense, type: 2 - transfer
          payer: 1, // user_id
          amount: 9990,
          recipient: 0, // user_id, 0 - if type 1
          split_members: [
            {
              id: 1, //user_id
              share: 1, //float - percentage of payment to pay
            },
            {
              id: 2, //user_id
              share: 1, //float - percentage of payment to pay
            },
            {
              id: 3, //user_id
              share: 1, //float - percentage of payment to pay
            },
            {
              id: 4, //user_id
              share: 1, //float - percentage of payment to pay
            },
          ]
        },
        {
          id: 3,
          date: "03-10-2024",
          description: "Transportation",
          type: 1, // type: 1 - expense, type: 2 - transfer
          payer: 3, // user_id
          amount: 1249,
          recipient: 0, // user_id, 0 - if type 1
          split_members: [
            {
              id: 1, //user_id
              share: 1, //float - percentage of payment to pay
            },
            {
              id: 2, //user_id
              share: 1, //float - percentage of payment to pay
            },
            {
              id: 3, //user_id
              share: 1, //float - percentage of payment to pay
            },
            {
              id: 4, //user_id
              share: 1, //float - percentage of payment to pay
            },
          ]
        },
      ],
    },
  ]  
  const test_group =  {
      transactions: [
        {
          id: 1,
          date: "04-04-2024",
          description: "Birthday Gift",
          type: 1, // type: 1 - expense, type: 2 - transfer
          payer: 1, // user_id
          amount: 4500,
          recipient: 0, // user_id, 0 - if type 1
          split_members: [
            {
              id: 1, //user_id
              share: 2, //float - percentage of payment to pay
            },
            {
              id: 2, //user_id
              share: 1, //float - percentage of payment to pay
            },
            {
              id: 3, //user_id
              share: 2, //float - percentage of payment to pay
            },
          
          ]
        },
        {
          id: 2,
          date: "04-09-2024",
          description: "New Game",
          type: 2, // type: 1 - expense, type: 2 - transfer
          payer: 1, // user_id
          amount: 600,
          recipient: 2, // user_id, 0 - if type 1
          split_members: []
        }
      ],
      reimbursements: [
        // algorithm
        // 1. Get who has highest net, 2. Get who has lowest net, 3. 1 --> 2, 4. update net, 5. repeat process. 5. stop when all net are zero. 
        {
          id: 1,
          from: 3, 
          to: 1,
          amount: 1800,
        },
        {
          id: 2,
          from: 2, 
          to: 1,
          amount: 1500,
        },
      ]
    }

  const handleLoad = () => {
    localStorage.setItem(DATA_KEY, JSON.stringify({users: test_users, group: test_group}));
  }

  const handleClear = () => {
    localStorage.removeItem(DATA_KEY);
  }

  const handleRequest = async () => {
    
    // const res = await fetch("/api/users",
    // {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'API_KEY': 'hello',
    //   },
    //   // body: JSON.stringify({
    //   //   name: 'judd', id: '23'
    //   // })
    // }
    // )
    // console.log(res, 'res - client side');
    // const data = await res.json();
    // const results = data;
    // console.log(results, 'data client side')

  }

  const handleShow = () => {
    console.log(GetLocalStored({key:DATA_KEY}))
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <button onClick={()=> handleLoad()} className="bg-slate-300 p-2">Load Dummy Data</button>
      <button onClick={()=> handleClear()} className="bg-slate-300 p-2">Clear Data</button>
      {/* <button onClick={()=> handleRequest()} className="bg-teal-100 p-2">Request Data</button> */}
      <button onClick={()=> handleShow()} className="bg-slate-300 p-2">Console Stored Data</button>
      
    </div>
  )
}
