import { useContext } from "react";
import { Navigate } from "react-router-dom";
import LoginContext from "../store/loginContext";
import ROUTES from "../routes/ROUTES";

const BizGuard = ({ children }) => {
  const { login } = useContext(LoginContext);
  if ((login && login.isBusiness) || login.isAdmin) {
    return children;
  } else {
    return <Navigate to={ROUTES.HOME} />;
  }
};

export default BizGuard;
