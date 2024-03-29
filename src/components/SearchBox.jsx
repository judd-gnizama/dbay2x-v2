'use client'

import { useState } from "react"
import Results from "./Results";

export default function SearchBox({ type }) {

  const [ search, setSearch ] = useState("");
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
  const results = [
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
  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={handleSubmit}>
        <div className="relative flex items-center">
          <input value={search} onChange={(e) => setSearch(e.target.value)} className="bg-slate-200 p-2 px-4 rounded-full w-full" type="text" placeholder={`Search ${type}`} 
          />
          <span 
          className="material-symbols-outlined text-slate-600 absolute right-2 rounded-full cursor-pointer hover:bg-slate-300"
          style={{visibility: search==="" ? "hidden" : "visible"}}
          onClick={() => setSearch("")}
          >close</span>
        </div>
      </form>
      <div className="">
        {results && 
          <Results type={type} search={search} results={results}/>
        }
      </div>
    </div>
  )
}
