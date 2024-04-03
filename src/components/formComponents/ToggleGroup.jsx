'use client'
import { useState } from "react"

export default function ToggleGroup({ options, onToggleChange }) {

  const [ toggleSelect, setToggleSelect ] = useState(options[0]);

  const handleChange = (event) => {
    setToggleSelect(event.target.value)
    onToggleChange(event.target.value)
  }

  return (
    <div className="flex justify-center items-center border-2">
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
          className="p-2 w-full text-center cursor-pointer"
          htmlFor={option}>{option}</label>
        </div>
      )}
    </div>
  )
}
