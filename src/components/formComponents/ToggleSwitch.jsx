'use client'
import { useState } from "react"

export default function ToggleSwitch() {

  const options = ['Option 1', 'Option 2']
  const [ selected, setSelected ] = useState('option1');

  const handleChange = (event) => {
    setSelected(event.target.id)
  }

  return (
    <div>
      <input 
      type="radio" 
      name="radioGroup" 
      id="option1" 
      value={0}
      checked={selected === 'option1'}
      onChange={handleChange} 
      />
      <label htmlFor="option1">{options[0]}</label>
      <input 
      type="radio" 
      name="radioGroup" 
      id="option2" 
      value={1}
      checked={selected === 'option2'}
      onChange={handleChange} 
      />
      <label htmlFor="option2">{options[1]}</label>


    </div>
  )
}
