
export default function AddItem({ type }) {

  // const iconTypes = [
  //   {type: 'user', icon: 'person_add'},
  //   {type: 'group', icon: 'group_add'},
  //   {type: 'transaction', icon: 'add_notes'},
  // ]

  const iconTypes = {
    user: 'person_add',
    group: 'group_add',
    transaction: 'add_notes',
  }

  return (
    <div className="flex flex-col justify-center items-center p-4 px-6 border-2 border-dashed border-slate-300 cursor-pointer hover:bg-teal-300">
      <span className="material-symbols-outlined">{iconTypes[type]}</span>
      <p>Add</p>
    </div>
  )
}
