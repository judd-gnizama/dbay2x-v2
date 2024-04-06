import { appendNewGroup, getAllGroupIds, getAllUniqueUserIds, getGroups, replaceGroups } from "./LocalStorageFunc";
import { ProcessGroupData, processGroup } from "./ProcessGroupData";


// Add New Group
export function createNewGroup() {

  const groupIds = getAllGroupIds();
  const newGroupId = groupIds && groupIds?.length > 0 ? Math.max(...groupIds) + 1 : 1;
  const tempGroupName = `NewGroup#000${newGroupId}`

  const newGroup = {
    id: newGroupId,
    name: tempGroupName,
    description: "No group description",
    transactions: [],
    users: [],
    reimbursements: [],
  }
  console.log(newGroup)
  appendNewGroup({newGroup: newGroup})
  return newGroup;
}


// Process all groups and Commit to local Storage

export function processTheseGroups({ groups }) { 
  return groups.map(group => processGroup(group))
}



// export function ProcessAllGroups() {
//   const groups = getGroups();
//   const processedGroups = groups.map(group => processGroup(group));
//   replaceGroups({newGroups: processedGroups});
// }

// is Strictly Number
export function isStrictlyNumeric(str) {
  // Regular expression for non-numeric characters (excluding optional dot)
  const nonNumericRegex = /[^0-9.]/g;

  // Check if the string contains any non-numeric characters, allowing optional hyphen at the beginning
  return !nonNumericRegex.test(str) && str.length > 0 && /^[-+]?\d+(?:\.\d+)?$/.test(str);
}