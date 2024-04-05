'use client'
import { useEffect, useState } from "react"

export default function ToggleGroup({ options, onToggleChange, icon, initial }) {
  const [ toggleSelect, setToggleSelect ] = useState(initial ? initial : options[0]);
  const handleChange = (event) => {
    setToggleSelect(event.target.value)
    onToggleChange(event.target.value)
  }

  return (
    <div className="grid border-2"
    style={{gridTemplateColumns: 'repeat(auto-fit, minmax(5rem, 1fr))'}}>
      {options?.map(option => 
        <div className={`flex flex-1 items-center justify-center ${toggleSelect === option ? 'bg-teal-300' : 'bg-inherit'}`} key={option}>
          <input 
          type="radio" 
          name="radioGroup" 
          id={option} 
          value={option}
          checked={toggleSelect === option}
          onChange={handleChange}
          hidden={true}/>
          <label 
          className="p-2 w-full text-center cursor-pointer font-bold"
          htmlFor={option}>
            {icon ? 
            <span className="material-symbols-outlined align-middle">{option}</span>
            :option}
            </label>
        </div>
      )}
    </div>
  )
}
