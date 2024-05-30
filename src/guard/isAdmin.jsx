import { useContext } from "react";
import { Navigate } from "react-router-dom";
import LoginContext from "../store/loginContext";
import ROUTES from "../routes/ROUTES";

const IsAdmin = ({ children }) => {
  const { login } = useContext(LoginContext);
  if (login && login.isAdmin) {
    return children;
  } else {
    return <Navigate to={ROUTES.LOGIN} />;
  }
};
export default IsAdmin;
