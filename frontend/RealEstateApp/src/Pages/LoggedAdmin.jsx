import { Navigate, Outlet } from "react-router-dom";
import { isAdmin } from "../Services/AuthInfo";

const LoggedAdmin = () => {
  return (
    isAdmin() === false ? <Navigate to="/" /> : <Outlet />
  )
};

export default LoggedAdmin;