import { getCurrencyCodes } from "@/functions/InterfaceFunc";
import { sortItems } from "./Results";

export default function CurrencyComp() {

  const currencyCodes = sortItems({itemList: getCurrencyCodes(), type: 'name'});

  return (
    <div className="border">
      <select name="currency" id="currency">
        {currencyCodes?.map(currency => 
          <option className=" bg-gray-100" key={currency.code} value={currency.code}>{currency.name}</option>
        )}
      </select>
    </div>
  )
}
