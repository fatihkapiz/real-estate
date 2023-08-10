import { Navigate, Outlet } from "react-router-dom";
import { isLoggedIn } from "../Services/AuthInfo";

const Logged = () => {
  return (
    isLoggedIn() === false ? <Navigate to="/login" /> : <Outlet />
  )
};

export default Logged;