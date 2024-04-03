'use client'
import { useState } from "react"

export default function ToggleGroup({ options, onToggleChange }) {

  const [ toggleSelect, setToggleSelect ] = useState(options[0]);

  const handleChange = (event) => {
    setToggleSelect(event.target.value)
    onToggleChange(event.target.value)
  }

  return (
    <div className="flex items-center border-2">
      {options?.map(option => 
        <div className={`p-2 ${toggleSelect === option ? 'bg-teal-300' : 'bg-inherit'}`} key={option}>
          <input 
          type="radio" 
          name="radioGroup" 
          id={option} 
          value={option}
          checked={toggleSelect === option}
          onChange={handleChange}
          hidden={true}/>
          <label 
          className="cursor-pointer"
          htmlFor={option}>{option}</label>
        </div>
      )}
    </div>
  )
}
