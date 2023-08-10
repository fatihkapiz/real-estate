import { useRef, useState } from "react";
import { addStatus } from "../../Services/StatusService";

export default function AddStatus () {
  const responses = {
    Ok: 0,
    empty: 1,
    badRequest: 2,
    initial: 3
  }

  const [status, setStatus] = useState("");
  const [error, setError] = useState(responses.initial);
  const inputRef = useRef(0);

  const handler = async(e) => {
    e.preventDefault();
    if (status === '') {
      setError(responses.empty);
    }
    try {
      let response = await addStatus(status);
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
      <h1>Add Status</h1>
      <form onSubmit={handler}>
        <input
          id="typeName"
          name="type"
          placeholder="Enter type"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          ref={inputRef}
        />
        <button type="submit">Add status</button>
        {(error === responses.empty) && <div>Empty status name.</div>}
        {(error === responses.badRequest) && <div>Request failed.</div>}
        {(error === responses.Ok) && <div>Status successfully created.</div>}
      </form>
    </div>
  )
}