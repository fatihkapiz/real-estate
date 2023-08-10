import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { isAdmin } from "../Services/AuthInfo";

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    function handleSubmit(e) {
      e.preventDefault(); // avoid page refresh
      axios
      .post('http://localhost:5124/api/Authenticate/login', {
          username,
          password
      })
      .then(response => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("expiration", response.data.expiration);
        console.log(isAdmin());
        navigate("/");
      })
      .catch(error => {
        setError(true);
        console.log(error);
      });
    }
    
    return (
        <div className="Login">
          {/* when form is submitted, handleSubmit will be executed */}
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                name="username"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
  
            <div>
              <input
                name="password"
                placeholder="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit">submit</button>
            {error && <div>Incorrect username or password</div>}
            {/* <input type = "submit"/> */}
          </form>
        </ div>
    );
}
