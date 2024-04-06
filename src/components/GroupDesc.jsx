'use client'

import { changeGroupProp } from "@/functions/LocalStorageFunc";
import { useEffect, useRef, useState } from "react";

export default function GroupDesc({group}) {

  const { id, name, description } = group;
  const [ newDesc, setNewDesc ] = useState(description ? description: "No description");
  const [ editing, setEditing ] = useState(false);
  const groupDescDivRef = useRef(null);

  const handleSaveDesc = (event) => {
    setEditing(false)
    const description = event.target.textContent;
    if(description.trim() !== "") {
      setNewDesc(description)
      changeGroupProp({ groupId: id, key:'description', value: description })
    }
  }

  const handleEnterPress = (event) => {
    if(event.key === 'Enter' && groupDescDivRef.current) {
      groupDescDivRef.current.blur();
    }
  }

  useEffect(() => {
    const div = groupDescDivRef.current;
    if(div) {
      div.addEventListener('keydown', handleEnterPress)
    }

    return () => {
      if(div) {
        div.removeEventListener('keydown', handleEnterPress)
      }
    }
  }, [groupDescDivRef])


  return (
    <div className="flex text-wrap break-all max-w-lg">
      <div className={`text-lg flex items-cente min-w-10 z-8 relative ${ editing && 'bg-gray-100 border-2 border-neutral-500 rounded-lg p-2' }`}
      ref={groupDescDivRef}
      contentEditable={editing}
      suppressContentEditableWarning={true}
      onBlur={handleSaveDesc}
      >
        {newDesc}   
      </div>
        <button className="material-symbols-outlined z-9" 
        style={{fontSize: '1.25rem'}}
        onClick={() => setEditing(true)}>edit</button>
    </div>
  )
}
