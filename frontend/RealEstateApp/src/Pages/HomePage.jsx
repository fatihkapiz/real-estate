import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAdmin } from '../Services/AuthInfo';

const HomePage = () => {
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    setAdmin(isAdmin());
  }, []);

  const navigate = useNavigate();
  const signout = () => {
    localStorage.clear();
    navigate("/login");
  }

  if (admin) {
    return (
      <div>
        <h1>HomePage</h1>
        <div className='container'></div>
        <a href="/admin/param">Admin Board</a>
        <a href="/realestate">Real Estates</a>
        <button onClick={signout}>Logout</button>
      </div>
    )
  }
  else {
    return(
      <div>
        <h1>HomePage</h1>
        <a href="/realestate">Real Estates</a>
        <button onClick={signout}>Logout</button>
      </div>
    )
  }
}

export default HomePage;