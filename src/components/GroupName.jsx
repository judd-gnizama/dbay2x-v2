'use client'

import { changeGroupProp } from "@/functions/LocalStorageFunc";
import { useState } from "react";

export default function GroupName({group}) {

  const { id, name } = group;
  const [ newName, setNewName ] = useState(name);
  const [ editing, setEditing ] = useState(false);

  const handleSaveName = (event) => {
    setEditing(false)
    const name = event.target.textContent;
    if(name.trim() !== "") {
      console.log("To save", name)
      setNewName(name)
      changeGroupProp({ groupId: id, key:'name', value: name })
    }
  }

  return (
    <div className="flex text-wrap break-all max-w-4xl">
      <div className={`text-3xl font-bold flex items-cente min-w-10 z-8 relative ${ editing && 'border-4 rounded-lg' }`}
      contentEditable={editing}
      suppressContentEditableWarning={true}
      onBlur={handleSaveName}>
        {newName}   
      </div>
        <button className="material-symbols-outlined p-2 z-9" 
        style={{fontSize: '1.5rem'}}
        onClick={() => setEditing(true)}>edit</button>
    </div>
  )
}
