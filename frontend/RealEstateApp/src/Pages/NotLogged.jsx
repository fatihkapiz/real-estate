import { Navigate, Outlet } from "react-router-dom";
import { isLoggedIn } from "../Services/AuthInfo";

const NotLogged = () => {
  return (
    isLoggedIn() === true ? <Navigate to="/" /> : <Outlet />
  )
};

export default NotLogged;