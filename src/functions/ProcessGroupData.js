
export function ProcessGroupData(group) {
  
  const initializeMembers = (membersList) => {
    if (!membersList || !membersList.length) return []

    const newMembersList = membersList.map(member => ({
      id: member.id,
      name: member.name,
      paid: 0,
      share: 0,
      net: 0
    }))
    return newMembersList
  }

  const appendMembersNet = (membersList) => {
    return membersList.map((member) => ({...member, net: member.share - member.paid}))
  }

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
            deltaMemberList[memberIndex].share += split_member.share / total_shares * amount

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

  const mergeMembersList = (oldMembersList, computedMembersList) => {
    computedMembersList.forEach((newMember) => {
      const memberIndex = oldMembersList.findIndex(item => item.id === newMember.id)
      if (memberIndex !== -1) {
        oldMembersList[memberIndex] = {... oldMembersList[memberIndex], paid: newMember.paid, share: newMember.share };
      }
    })
      
    return oldMembersList;
  }

  
  const { users, transactions} = group;
    
  const initializedUsers = initializeMembers(users);
  const involvedMembersList = computeMembersList(transactions);
  const mergedMembersList = mergeMembersList(initializedUsers, involvedMembersList);
  const newMembers = appendMembersNet(mergedMembersList);
  const reimbursements = computeReimbursements(newMembers);
  const _newMembers = appendMembersNet(mergedMembersList);
  const updatedGroup = {...group,
    transactions: transactions,
    users: _newMembers,
    reimbursements: reimbursements,
  }
  return updatedGroup

}


export function processGroup(group) {
  const initializedUsers = group.users.map(user => ({
    ...user, 
    paid: 0,
    share: 0,
    net: 0,
  }))
  const computeTotalWeight = (transaction) => {
    let total_weight = 0
    transaction.split_members.forEach(split_member => total_weight += split_member.split ? split_member.weight : 0 )
    return total_weight
  }
  const updatedUsers = initializedUsers.map(user => {

    let paid_expense = 0
    let paid_settlement = 0
    let received = 0
    let share = 0

    group.transactions.forEach(transaction => {

      const total_weight = computeTotalWeight(transaction);

      paid_expense += transaction.payer === user.id && transaction.type === 'Expense' ? transaction.amount : 0
      paid_settlement += transaction.payer === user.id && transaction.type === 'Settlement' ? transaction.amount : 0
      received += transaction.recipient === user.id && transaction.type === 'Settlement' ? transaction.amount : 0
      transaction.split_members.forEach(split_member => {
        if(split_member.id === user.id && split_member.split) {
          share += split_member.weight / total_weight * transaction.amount
        }
      })
    })

    return({
      ...user, 
      total_paid: paid_expense + paid_settlement,
      paid: paid_expense,
      share: share,
      net: share - paid_expense,
      balance: share - paid_expense - paid_settlement + received,
      _net: share - paid_expense - paid_settlement + received
    })
  })

  const computeReimbursements = (membersList) => {
    if (!membersList || !membersList.length) return [];

    let reimbursements = [];
    let done = false;
    let count = 0;
    while (!done) {


      if (membersList.findIndex((member) => member._net > 0) === -1 || count === 100) {
        done = true;
        console.log('broke')
        break;
      }
      // sort lowest to highest
      let sortedMembersList = membersList.sort((member1, member2) => member1._net - member2._net);
      
      
      // append to reimbursements
      const maxIndex = sortedMembersList.length - 1;
      reimbursements.push(
        {
          from: sortedMembersList[maxIndex].id,
          to: sortedMembersList[0].id,
          amount: sortedMembersList[maxIndex]._net
        }
        )
        
        // update net list
        sortedMembersList[0]._net += sortedMembersList[maxIndex]._net;
        sortedMembersList[maxIndex]._net = 0;
      }
      
    return reimbursements;

  }

  const reimbursements = computeReimbursements(updatedUsers);

  return {...group, users: updatedUsers, reimbursements: reimbursements}

}