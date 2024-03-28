import GroupComp from "@/components/GroupComp";
import MemberComp from "@/components/MemberComp";
import SettleComp from "@/components/SettleComp";
import TransactionComp from "@/components/TransactionComp";

export default function Home() {

  const users = [
    {
      id: 1,
      name: 'Judd',
      total_paid: 0,
      total_share: 0,
      total_net: 0,
    },
    {
      id: 2,
      name: 'Jon',
      total_paid: 0,
      total_share: 0,
      total_net: 0,
    },
    {
      id: 3,
      name: 'Jyll',
      total_paid: 0,
      total_share: 0,
      total_net: 0,
    },
    {
      id: 4,
      name: 'Mom',
      total_paid: 0,
      total_share: 0,
      total_net: 0,
    },
  ]
  const groups = [
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
  ]
   
  const computeMembersList = (transactions) => {

    if (!transactions || !transactions.length) return []; //Early return empty

    var deltaMemberList = []

    transactions.forEach((transaction) => {

      const { payer, type, amount, split_members, recipient } = transaction
      
      let memberIndex = deltaMemberList.findIndex((item) => item.id === payer)
      
      if(memberIndex !== -1) {
        deltaMemberList[memberIndex].paid += amount;
      } else {
        deltaMemberList.push(
            {
              id: payer,
              paid: amount, 
              share: 0,
            }
          );
      }       
      if (type === 1 && split_members && split_members.length) {
        // solve total shares
        let total_shares = 0;
        split_members.forEach((item)=>total_shares += item.share)
        split_members.forEach((split_member) => {
          // find if split_member is already present
          let memberIndex = deltaMemberList.findIndex((item)=>item.id === split_member.id)
          if(memberIndex !== -1) {
            deltaMemberList[memberIndex].share = split_member.share / total_shares * amount
          } else {
            deltaMemberList.push({
              id: split_member.id,
              paid: 0,
              share: split_member.share / total_shares * amount,
            });
          }
        });
      } else if (type === 2) {
        let memberIndex = deltaMemberList.findIndex((item) => item.id === recipient)
        
        if(memberIndex !== -1) {
          deltaMemberList[memberIndex].paid -= amount;
        } else {
          deltaMemberList.push(
              {
                id: recipient,
                paid: -amount, 
                share: 0,
              }
            );
        }    
      }
    });
    return appendMembersNet(deltaMemberList);
  }

  const appendMembersNet = (membersList) => {
    return membersList.map((member) => ({...member, net: member.share - member.paid}))
  }

  const computeReimbursements = (membersList) => {
    if (!membersList || !membersList.length) return [];

    let reimbursements = [];
    let done = false;
    let count = 0;
    while (!done) {

      if (membersList.findIndex((member) => member.net > 0) === -1 || count === 100) {
        done = true;
        break;
      }
      // sort lowest to highest
      let sortedMembersList = membersList.sort((member1, member2) => member1.net - member2.net);
      
      // append to reimbursements
      const maxIndex = sortedMembersList.length - 1;
      reimbursements.push(
        {
          from: sortedMembersList[maxIndex].id,
          to: sortedMembersList[0].id,
          amount: sortedMembersList[maxIndex].net
        }
        )
        
        // update net list
        sortedMembersList[0].net += sortedMembersList[maxIndex].net;
        sortedMembersList[maxIndex].net = 0;
      }
      
    return reimbursements;

  }

  return (
    <div className=" bg-background">
      <GroupComp/>
      <MemberComp/>
      <TransactionComp/>
      <SettleComp/>
    </div>
  )
}
