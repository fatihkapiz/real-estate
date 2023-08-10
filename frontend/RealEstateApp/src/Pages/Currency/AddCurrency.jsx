import { useRef, useState } from "react";
import { addCurrency } from "../../Services/CurrencyService";

export default function AddCurrency () {
  const responses = {
    Ok: 0,
    empty: 1,
    badRequest: 2,
    initial: 3
  }

  const [symbol, setSymbol] = useState("");
  const [error, setError] = useState(responses.initial);
  const inputRef = useRef(0);

  const handler = async(e) => {
    e.preventDefault();
    if (symbol === '') {
      setError(responses.empty);
    }
    try {
      let response = await addCurrency(symbol);
      console.log(response);
      if (response.statusText === "OK") {
        setError(responses.Ok);
        console.log("symbol successfully added");
      } 
      else {
        setError(responses.badRequest);
        console.log("symbol could not be added, bad request.");
      }  
    }
    catch(error) {
      console.log(error);
    }
    inputRef.current.value = "";
  }

  return(
    <div className="outer">
      <h1>Add Currency</h1>
      <form onSubmit={handler}>
        <input
          id="currencyName"
          name="currency"
          placeholder="Enter currency symbol"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          ref={inputRef}
        />
        <button type="submit">Add currency</button>
        {(error === responses.empty) && <div>Empty currency name.</div>}
        {(error === responses.badRequest) && <div>Request failed.</div>}
        {(error === responses.Ok) && <div>Currency successfully created.</div>}
      </form>
    </div>
  )
}