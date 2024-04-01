import { appendNewGroup, getAllGroupIds, getAllUniqueUserIds, getGroups } from "./LocalStorageFunc";


// Add New Group
export function createNewGroup() {

  const groupIds = getAllGroupIds();
  const newGroupId = Math.max(...groupIds) + 1;
  const tempGroupName = `NewGroup#000${newGroupId}`

  const newGroup = {
    id: newGroupId,
    name: tempGroupName,
    description: "This is a Group Description",
    transactions: [],
    users: [],
  }
  appendNewGroup({newGroup: newGroup})
  return newGroup;
}


// Process all groups and Commit to local Storage

export function ProcessAllGroups() {
  const groups = getGroups();
  const processedGroups = groups.map(group => ProcessGroupData(group));
  replaceGroups({newGroups: processedGroups});
}