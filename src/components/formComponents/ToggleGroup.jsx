'use client'
import { useState } from "react"

export default function ToggleGroup({ options, handleToggleChange }) {

  const [ toggleSelect, setToggleSelect ] = useState(options[0]);

  const handleChange = (event) => {
    setToggleSelect(event.target.value)
  }

  return (
    <div>
      {options?.map(option => 
        <div key={option}>
          <input 
          type="radio" 
          name="radioGroup" 
          id={option} 
          value={option}
          checked={toggleSelect === option}
          onChange={handleChange}/>
          <label htmlFor={option}>{option}</label>
        </div>
      )}
    </div>
  )
}
