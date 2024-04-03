import { createContext } from "react";

export default FormContext()  =  createContext({

  // this is an object that will hold the state of the whole form
  // must include all state values and handleChanges
  selectedRadio: '', 
  handleRadioChange: () => {},

})
