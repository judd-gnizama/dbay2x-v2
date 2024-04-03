import FormContext from "./FormContext";

export default function FormProvider( { children }) {

  const [ selectedRadio, setSelectRadio ] = useState('');

  const handleRadioChange = (value) => setSelectRadio(value);

  const contextValue = {
    selectedRadio,
    handleRadioChange
  }
  return <FormContext.Provider value={contextValue}>{children}</FormContext.Provider>
}
