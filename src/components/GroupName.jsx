'use client'

import { useState } from "react";

export default function GroupName({groupName}) {

  const [ newName, setNewName ] = useState(groupName);
  const [ editing, setEditing ] = useState(false);

  const handleSaveName = (event) => {
    setEditing(false)
    const name = event.target.textContent;
    const htmlName = event.target.innerText;
    if(name.trim() !== "") {
      console.log("To save", name)
      // save to local storage
    }
  }

  return (
    <div className="flex">
      <div className="text-3xl font-bold text-wrap flex relative"
      contentEditable={editing}
      suppressContentEditableWarning={true}
      onBlur={handleSaveName}>
        {newName}   
      </div>
        <button className="material-symbols-outlined" 
        style={{fontSize: '1.5rem'}}
        onClick={() => setEditing(true)}>edit</button>
    </div>
  )
}
