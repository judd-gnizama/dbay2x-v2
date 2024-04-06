'use client'

import { useEffect, useRef, useState } from "react";

export default function EditableDiv( { editableText, setEditableText, editing, setEditing, handleEditable } ) {

  const divRef = useRef(null);

  const handleEnterPress = (event) => {
    if(event.key === 'Enter' && divRef.current) {
      divRef.current.blur();
    }
  }

  useEffect(() => {
    const div = divRef.current; 
    if(div) {
      div.addEventListener('keydown', handleEnterPress)
    }

    return () => {
      if(div) {
        div.removeEventListener('keydown', handleEnterPress)
      }
    }
  }, [divRef])


  return (
    <div className="flex text-wrap break-all max-w-sm">
      <div className={`text-3xl font-bold flex items-center min-w-10 z-8 relative ${ editing && 'bg-gray-100 border-2 border-neutral-500 rounded-lg p-2' }`}
      ref={divRef}
      contentEditable={editing}
      suppressContentEditableWarning={true}
      onBlur={handleEditable}>
        {editableText}   
      </div>
        <button className="material-symbols-outlined p-2 z-9" 
        style={{fontSize: '1.5rem'}}
        onClick={() => setEditing(true)}>edit</button>
    </div>
  )
}
