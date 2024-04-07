
export const computeReimbursements = (membersList) => {
  if (!membersList || !membersList.length) return [];
  
  let reimbursements = [];
  let done = false;
  let count = 0;
  
  
  while (!done) {
    
    if (membersList.findIndex((member) => member._net > 0) === -1 || count === 100) {
      done = true;
      console.log('Break! Count: ', count)
      break;
    }
    
    // sort lowest to highest
    let sortedMembersList = membersList.sort((member1, member2) => member1._net - member2._net);  // (-) -> to receive, (+) -> to pay 
    
    // append to reimbursements
    const maxIndex = sortedMembersList.length - 1;

    const minValue = sortedMembersList[0]._net;
    const maxValue = sortedMembersList[maxIndex]._net;
    
    reimbursements.push(
      {
        from: sortedMembersList[maxIndex].id,
        to: sortedMembersList[0].id,
        amount: Math.min(Math.abs(minValue), Math.abs(maxValue))
      }
      )
      
      // update net list
      sortedMembersList[0] = {...sortedMembersList[0], 
        _net: minValue + maxValue < 0 ? minValue + maxValue : 0}

      sortedMembersList[maxIndex] = {...sortedMembersList[maxIndex], 
        _net: minValue + maxValue < 0 ? 0 : minValue + maxValue}
      count += 1
    }
    
    return reimbursements;
  }

export const computeTotalWeight = (transaction) => {
  let total_weight = 0
  transaction.split_members.forEach(split_member => total_weight += split_member.split ? split_member.weight : 0 )
  return total_weight
}

export function processGroup(group) {
  const initializedUsers = group.users.map(user => ({
    ...user, 
    paid: 0,
    share: 0,
    net: 0,
  }))
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
      share: share,
      paid: paid_expense,
      current_balance: paid_settlement - received,
      total_balance: share - paid_expense,
      // total_paid: paid_expense + paid_settlement,
      total_net: paid_expense + paid_settlement - received,
      _net: share - paid_expense - paid_settlement + received
    })
  })
  const reimbursements = computeReimbursements(updatedUsers);
  
  return {...group, users: updatedUsers, reimbursements: reimbursements}
    
  }