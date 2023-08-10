import { useRef, useState } from "react";

// eslint-disable-next-line react/prop-types
export default function AddParameter ({ add, parameter }) {
  const responses = {
    Ok: 0,
    empty: 1,
    badRequest: 2,
    initial: 3
  }

  const [data, setData] = useState("");
  const [error, setError] = useState(responses.initial);
  const inputRef = useRef(0);

  const handler = async(e) => {
    e.preventDefault();
    if (data === '') {
      setError(responses.empty);
    }
    try {
      let response = await add(data);
      console.log(response);
          }
    catch(error) {
      console.log(error);
    }
    inputRef.current.value = "";
  }

  return(
    <div className="outer">
      <h1>Add {parameter}</h1>
      <form onSubmit={handler}>
        <input
          id={parameter}
          name={parameter}
          placeholder=""
          value={data}
          onChange={(e) => setData(e.target.value)}
          ref={inputRef}
        />
        <button type="submit">Add {parameter}</button>
        {(error === responses.empty) && <div>Empty ${parameter} name.</div>}
        {(error === responses.badRequest) && <div>Request failed.</div>}
        {(error === responses.Ok) && <div>${parameter} successfully created.</div>}
      </form>
    </div>
  )
}