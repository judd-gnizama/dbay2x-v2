'use client'

import { ProcessAllGroups } from "@/functions/InterfaceFunc";
import { createNewGroup, getAllUniqueUserIds, getCurrentGroup, getGroups, getRawData, getUserById, getUserInGroup, getUserStatsFromEachGroup, replaceGroup, replaceGroups} from "@/functions/LocalStorageFunc";
import { ProcessGroupData } from "@/functions/ProcessGroupData";

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

  const legacy_test_groups = [
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
  
  const test_group = {
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
  }

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
      ]
      },
      {
        name: 'Bohol Vacation', 
        description: 'Summer Vacation',
        id: 2,
        users: [
          {
            id: 1,
            name: 'Judd',
            paid: 4300,
            share: 35340,
            net: 2352340,
          },
          {
            id: 9,
            name: 'Tan',
            paid: 43420,
            share: 1000,
            net: 1000,
          },
          {
            id: 10,
            name: 'Ronald',
            paid: 412320,
            share: 434,
            net: 1200,
          },
          {
            id: 11,
            name: 'Donald',
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
            id: 18,
            name: 'Rominna',
            paid: 9220,
            share: 124,
            net: 103,
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
            id: 76,
            date: "11-11-1995",
            description: "Birthday Gift",
            type: 1, // type: 1 - expense, type: 2 - transfer
            payer: 1, // user_id
            amount: 420,
            recipient: 0, // user_id, 0 - if type 1
            split_members: [
              {
                id: 1, //user_id
                share: 2, //float - percentage of payment to pay
              },
              {
                id: 5, //user_id
                share: 1, //float - percentage of payment to pay
              },
              {
                id: 6, //user_id
                share: 2, //float - percentage of payment to pay
              },
            
            ]
          },
          {
            id: 87,
            date: "05-12-2025",
            description: "New Game",
            type: 9, // type: 1 - expense, type: 2 - transfer
            payer: 1, // user_id
            amount: 990,
            recipient: 11, // user_id, 0 - if type 1
            split_members: []
          }
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

  const handleLegacyLoad = () => {
    localStorage.setItem(DATA_KEY, JSON.stringify({users: test_users, group: test_group}));
  }
  const handleLoad = () => {
    localStorage.setItem(DATA_KEY, JSON.stringify(test_db));
  }

  const handleClear = () => {
    localStorage.removeItem(DATA_KEY);
  }

  const handleShow = () => {
    console.log(getRawData())
  }

 const handleFunction = () => {
  ProcessAllGroups();
  }

  return (
    <div className="flex flex-col gap-4">
      <button onClick={()=> handleLegacyLoad()} className="bg-slate-300 hover:opacity-80 p-2">Load Legacy Dummy Data</button>
      <button onClick={()=> handleLoad()} className="bg-slate-300 hover:opacity-80 p-2">Load Dummy Data</button>
      <button onClick={()=> handleClear()} className="bg-slate-300 hover:opacity-80 p-2">Clear Data</button>
      <button onClick={()=> handleShow()} className="bg-slate-300 hover:opacity-80 p-2">Console Stored Data</button>
      <button onClick={()=> handleFunction()} className="bg-slate-300 hover:opacity-80 p-2">Run Custom Function</button>
    </div>
  )
}
