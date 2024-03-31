'use client'

const key = 'myDataKey'

const isObjEmpty = (obj) => {
  return Object.keys(obj).length === 0
}

const isListEmpty = (list) => {
  return list.length <= 0
}


// Get Methods

export function getKey() {
  return key
}

export function getRawData() {
  const storedData = localStorage.getItem(key);
  return storedData ? JSON.parse(storedData) : null;
}

export function getCurrentGroupId() {
  const data = getRawData();
  return !isObjEmpty(data) ? data.currentGroupId : ''
}

export function getGroups() {
  const data = getRawData()
    return data ? data.groups : []
}

export function getGroupById({ groupId }) {
  const groups = getGroups();
  const group = groups && groupId ? groups.filter(group => parseInt(group.id) === parseInt(groupId))[0] : {};
  return group
}

export function getCurrentGroup() {
  const currentGroupId = getCurrentGroupId();
  return currentGroupId ? getGroupById({groupId: currentGroupId}) : {};
}

export function getUsersFromGroup({ groupId }){
  const group = getGroupById({ groupId: groupId })
  return group ? group.users : []
}

export function getUsersFromAllGroups(){
  const groups = getGroups();
  let usersOutput = []
  groups && groups.forEach(group => {
    group.users.forEach(user => usersOutput.push(user))
  })
  return usersOutput
}

export function getAllUniqueUserIds() {
  const users = getUsersFromAllGroups();
  const userIds = users ? users.map(user=>user.id) : [];
  return userIds.length > 0 ? [... new Set(userIds)] : []
}

export function getOverallStatsByUser( {userId} ) {
  const usersFromGroups = getUsersFromAllGroups();
  let userPaid = 0;
  let userShare = 0;
  let userNet = 0;
  usersFromGroups && usersFromGroups.forEach(user => {
    if(user.id === userId) {
      userPaid += user.paid
      userShare += user.share
      userNet += user.net
    }
  });
  return {id: userId, total_paid: userPaid, total_share: userShare, total_net: userNet}
}

export function getUniqueUsers() {
  const userIds = getAllUniqueUserIds();
  let users = []
  userIds && userIds.forEach(id => users.push(getOverallStatsByUser({userId: id})))
  return users
}

export function getSettlementsByGroupId({groupId}) {
  const group = getGroupById({groupId});
  return group ? group.transactions : [];
}


// Set Methods

export function setRawData(data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function setCurrentGroupId({groupId})  {
  if (!groupId) return null;
  var data = getRawData();
  if (!isObjEmpty(data)) {
    data.currentGroupId = groupId
    setRawData(data);
  }  
}

export function replaceGroups({newGroups}) {
  console.log(newGroups, 'new groups')
  if(isObjEmpty(newGroups)) return null;
  var oldData = getRawData();
  if (!isObjEmpty(oldData)){
    oldData.groups = newGroups
    setRawData(oldData);
  }
}

export function replaceGroup({newGroup}) {
  const groupId = newGroup.id;
  const oldGroups = getGroups();
  if (isListEmpty(oldGroups)) return;
  const newGroups = oldGroups.map(group => (group.id === groupId ? newGroup : group))
  replaceGroups({newGroups: newGroups});
}

export function appendNewGroup({newGroup}) {
  if(isObjEmpty(newGroup)) return;
  const oldGroups = getGroups();
  if (isListEmpty(oldGroups)) return;
  const newGroups = [...oldGroups, newGroup]
  replaceGroups({newGroups: newGroups});
}

// Remove Methods

export function removeRawData() {
  localStorage.removeItem(key)  
}