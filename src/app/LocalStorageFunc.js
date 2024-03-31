'use client'

const key = 'myDataKey'


// Get Methods

export function getKey() {
  return key
}

export function getRawData() {
  const storedData = localStorage.getItem(key);
  return storedData;
}

export function getCurrentGroupId() {
  const data = getRawData();
  return data.currentGroupId;
}

export function getGroups() {
  const JSONData = getRawData();
  const groups = JSON.parse(JSONData).groups;
  return groups  
}

export function getGroupById({ groupId }) {
  const groups = getGroups();
  return groups.filter(group => parseInt(group.id) === parseInt(groupId))[0]
}

export function getCurrentGroup() {
  const currentGroupId = getCurrentGroupId();
  return getGroupById({groupId: currentGroupId});
}

export function getUsersFromGroup({ groupId }){
  const group = getGroupById({ groupId: groupId })
  return group.users
}

export function getUsersFromAllGroups(){
  const groups = getGroups();
  let usersOutput = []
  groups.forEach(group => {
    group.users.forEach(user => usersOutput.push(user))
  })
  return usersOutput
}

export function getAllUniqueUserIds() {
  const users = getUsersFromAllGroups();
  const userIds = users.map(user=>user.id);
  return [... new Set(userIds)]
}

export function getOverallStatsByUser( {userId} ) {
  const usersFromGroups = getUsersFromAllGroups();
  let userPaid = 0;
  let userShare = 0;
  let userNet = 0;
  usersFromGroups.forEach(user => {
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
  userIds.forEach(id => users.push(getOverallStatsByUser({userId: id})))
  return users
}

// Set Methods

export function setRawData(data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function setCurrentGroupId({groupId})  {
  var data = getRawData();
  data.currentGroupId = groupId;
  setRawData(data);
}

// Remove Methods

export function removeRawData() {
  localStorage.removeItem(key)  
}