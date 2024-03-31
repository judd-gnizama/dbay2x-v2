
export function ProcessGroupData(group) {

  const { members, transactions, id, name } = group[0];
  const involvedMembersList = computeMembersList(transactions);
  const mergedMembersList = mergeMembersList(members, involvedMembersList);
  const reimbursements = computeReimbursements(mergedMembersList);

  group.members = appendMembersNet(mergedMembersList);
  group.reimbursements = reimbursements;

  
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

  const mergeMembersList = (oldMembersList, computedMembersList) => {
    computedMembersList.forEach((newMember) => {
      const memberIndex = oldMembersList.findIndex(item => item.id === newMember.id)
      if (memberIndex !== -1) {
        oldMembersList[memberIndex] = newMember;
      }
    })
      
    return oldMembersList;
  }

  return group;

}