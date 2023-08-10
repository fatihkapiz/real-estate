/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ParameterList({ list, parameter, field }) {

  const [itemList, setList] = useState([]);
  let token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (token == null) {
      alert("You must login before using this interface.");
      navigate("/login");
    }
    handler();
  }, [])

  const handler = async() => {
    try {
      const data = await list();
      setList(data);
      console.log(data);
    }
    catch(error) {
      console.log(error);
    }
  }

  const logout = () => {
    localStorage.clear();
    navigate("/");
  }

  return (
    <div className="parameterList">
      <h1>{parameter} list</h1>
      <button onClick={logout}>Logout</button>
      <ol>
        {itemList.map(function(data, i) {
          return (
            <li key={i}>{data[field]}</li>
          )
        })}
      </ol>
    </div>
  );
}