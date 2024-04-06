'use client'

import { processTheseGroups } from "./InterfaceFunc";

const key = 'myDataKey'

// Get Methods

export function getKey() {
  return key
}

export function getRawData() {
  if (typeof window !== 'undefined') {
    const storedData = localStorage.getItem(key);
    if (storedData) {
      return JSON.parse(storedData)
    } else {
      return null
    }
  }
}

export function getCurrentGroupId() {
  const data = getRawData();
  return data?.currentGroupId
}

export function getGroups() {
  const data = getRawData()
  return data?.groups
}

export function getAllGroupIds() {
  const groups = getGroups();
  return groups?.map(group=>group?.id)
}

export function getGroupById({ groupId }) {
  const groups = getGroups();
  const group = groups?.filter(group => parseInt(group.id) === parseInt(groupId))[0]
  return group
}

export function getCurrentGroup() {
  const currentGroupId = getCurrentGroupId();
  return currentGroupId ? getGroupById({groupId: currentGroupId}) : null;
}

export function getUsersFromGroup({ groupId }){
  const group = getGroupById({ groupId: groupId })
  return group?.users
}

export function getUsersFromAllGroups(){
  const groups = getGroups();
  let usersOutput = []
  groups?.forEach(group => {
    group?.users.forEach(user => usersOutput.push(user))
  })
  return usersOutput
}

export function getAllUniqueUserIds() {
  const users = getUsersFromAllGroups();
  const userIds = users?.map(user=>user.id)
  return userIds?.length > 0 ? [... new Set(userIds)] : null
}

export function getUserStatsFromEachGroup({ userId }) {
  const usersFromGroups = getUsersFromAllGroups();
  return usersFromGroups?.filter(user => user.id === userId)
}

export function getUserInGroup({ groupId, userId }){
  const users = getUsersFromGroup({ groupId })
  const index = users.findIndex(user => user.id === userId)
  if (index !== -1) return users[index]
}

export function getOverallStatsUser( {userId} ) {
  const usersFromGroups = getUsersFromAllGroups();
  let userPaid = 0;
  let userShare = 0;
  let userNet = 0;
  let userName = ''
  usersFromGroups && usersFromGroups.forEach(user => {
    if(user.id === userId) {
      userPaid += user.paid
      userShare += user.share
      userNet += user.net
      userName = user.name
    }
  });
  return {id: userId, name: userName, paid: userPaid, share: userShare, net: userNet}
}

export function getUniqueUsers() {
  const userIds = getAllUniqueUserIds();
  let users = []
  userIds && userIds.forEach(id => users.push(getOverallStatsUser({userId: id})))
  return users
}

export function getSettlementsByGroupId({groupId}) {
  const group = getGroupById({groupId});
  return group ? group.transactions : [];
}

export function getGroupsWithUser({ userId }) {
  const groups = getGroups();
  return groups.filter(group => group.users.some(user=>user.id === userId))
}

export function getAllUniqueTransactionIds() {
  const groups = getGroups();
  let transactionIds = []
  groups.forEach(group => group.transactions.forEach(transaction => transactionIds.push(transaction.id))) 
  return [...new Set(transactionIds)]
}

export function getTransactionFromGroup({ groupId, transactionId }){
  const group = getGroupById({groupId: groupId})
  const index = group.transactions.findIndex(transaction => transaction.id === transactionId);
  if(index !== -1) {
    return group.transactions[index]
  }
}

// Set Methods

export function setRawData(data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function setCurrentGroupId({groupId})  {
  if (!groupId) return null;
  const data = getRawData();
  const newData = {...data, currentGroupId: groupId}
  if (newData) setRawData(newData);
}

export function replaceGroups({newGroups}) {
  const processedGroups = processTheseGroups({groups: newGroups})
  const currentGroupId = getCurrentGroupId();
  setRawData({currentGroupId: currentGroupId ? currentGroupId : processedGroups[0].id, groups: processedGroups})
}

export function replaceGroup({newGroup}) {
  const groupId = newGroup.id;
  const oldGroups = getGroups();
  if (oldGroups) {
    const newGroups = oldGroups.map(group => (group.id === groupId ? newGroup : group))
    replaceGroups({newGroups: newGroups});
  }
}

export function changeGroupProp({ groupId, key, value }) {
  const group = getGroupById({groupId: groupId});
  const changedGroup = {...group, [key]: value}
  replaceGroup({ newGroup: changedGroup });
}

export function appendNewGroup({newGroup}) {
  const oldGroups = getGroups();
  if (oldGroups) {
    const index = oldGroups.findIndex(group => group.id === newGroup.id)
    if(index === -1) {
      replaceGroups({newGroups: [...oldGroups, newGroup]})
    }
  } else {
    replaceGroups({newGroups: [newGroup]})
  }
}

export function replaceUserInGroup({ groupId, userId, newUser }) {
  const group = getGroupById({groupId: groupId})
  const newUsers = group.users.map(user => user.id === userId ? newUser : user)
  const newGroup = {...group, users: newUsers }
  replaceGroup({newGroup: newGroup})
}

export function replaceUser({ userId, newUser }) { 
  const groups = getGroups();
  const newGroups = groups.map(group => ({...group, users: group.users.map(user=>user.id === userId ? newUser : user)}
  ))
  replaceGroups({newGroups: newGroups})
}

export function replaceUserProp({ userId, key, value }) { 
  // modify props of users with the same userid across groups
  const groups = getGroups();
  const newGroups = groups.map(group => ({...group, 
    users: group.users.map(user=>user.id === userId ? {...user, [key]: value } : user)}));
  replaceGroups({newGroups: newGroups})
}

export function changeUserName({ userId, newName}) {
  const groupsWithUser = getGroupsWithUser({userId: userId});
  const modifiedGroups = groupsWithUser.map((group) => {
    group.users.find()
  })
}

export function addUserToGroup({ groupId, newUser }) {
  const group = getGroupById({groupId: groupId})
  const index = group.users.findIndex(user => user.id === newUser.id);
  if (index === -1) {
    const newGroup = {...group, users: [...group.users, newUser]}
    replaceGroup({ newGroup: newGroup})
  }
}

export function addTransaction({ groupId, newTransaction}){
  const group = getGroupById({groupId: groupId})
  const index = group.transactions.findIndex(transaction => transaction.id === newTransaction.id)
  if (index === -1) {
    const newGroup = {...group, transactions: [...group.transactions, newTransaction]}
    replaceGroup({ newGroup: newGroup})
  }
}

export function replaceTransaction({ groupId, updatedTransaction }) {
  const group = getGroupById({ groupId: groupId })
  const newTransactions = group.transactions.map(transaction => transaction.id === updatedTransaction.id ? updatedTransaction : transaction)
  const newGroup = {...group, transactions: newTransactions}
  replaceGroup({newGroup: newGroup})
}

// Remove Methods

export function removeRawData() {
  localStorage.removeItem(key)  
}

export function removeTransaction({ groupId, transactionId }){
  const group = getGroupById({groupId: groupId})
  const newTransactions = group.transactions.filter(transaction => transaction.id !== transactionId)
  const newGroup = {...group, transactions: newTransactions}
  replaceGroup({ newGroup: newGroup })
}
