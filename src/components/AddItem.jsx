
export default function AddItem({ type }) {

  const types = {
    user: 'User',
    group: 'Group',
    transaction: 'Transaction',
  }

  return (
    <div className="flex justify-center items-center gap-4 p-4 border-4 border-dashed border-slate-300 cursor-pointer hover:bg-teal-200">
      <span className="material-symbols-outlined"
      style={{fontSize: '3rem'}}>add</span>
      <p className="text-lg font-bold">Add {types[type]} </p>
    </div>
  )
}
