import { appendNewGroup, getAllUniqueUserIds } from "./LocalStorageFunc";


// Add New Group
export function createNewGroup() {

  const userIds = getAllUniqueUserIds();
  console.log(userIds)
  const newUserId = Math.max(...userIds) + 1;
  const tempGroupName = `NewGroup#000${newUserId}`

  const newGroup = {
    id: newUserId,
    name: tempGroupName,
    description: "This is a Group Description",
    transactions: [],
    users: [],
  }
  appendNewGroup({newGroup: newGroup})
  return newGroup;
}