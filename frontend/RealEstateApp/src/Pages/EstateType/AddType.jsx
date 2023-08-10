import { useRef, useState } from "react";
import { addType } from "../../Services/TypeService";

export default function AddType () {
  const responses = {
    Ok: 0,
    empty: 1,
    badRequest: 2,
    initial: 3
  }

  const [type, setType] = useState("");
  const [error, setError] = useState(responses.initial);
  const inputRef = useRef(0);

  const handler = async(e) => {
    e.preventDefault();
    if (type === '') {
      setError(responses.empty);
    }
    try {
      let response = await addType(type);
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
      <h1>Add Type</h1>
      <form onSubmit={handler}>
        <input
          id="typeName"
          name="type"
          placeholder="Enter type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          ref={inputRef}
        />
        <button type="submit">Add type</button>
        {(error === responses.empty) && <div>Empty type name.</div>}
        {(error === responses.badRequest) && <div>Request failed.</div>}
        {(error === responses.Ok) && <div>Type successfully created.</div>}
      </form>
    </div>
  )
}