import { useEffect, useState } from "react";
import axios from "axios";
import { config } from "../Services/AuthInfo";

function ListRealEstates() {
  const [data, setData] = useState("");

  const handler = async (e) => {
    e.preventDefault();

    await axios
      .get("http://localhost:5124/realestate/list", config())
      .then((response) => {
        console.log(data);
        setData(response.data);
        return response;
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  };

  useEffect(() => {
    handler();
  })

  return (
    <div>
      <h1>Real Estates</h1>
      <button onClick={handler}>Click</button>
    </div>
  );
}

export default ListRealEstates;
