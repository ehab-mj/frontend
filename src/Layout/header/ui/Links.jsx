import NavLinkComponent from "../../NavLinkComponent";
import { useContext } from "react";
import LoginContext from "../../../store/loginContext";
import { Box } from "@mui/material";
import {
  alwaysLinks,
  loggedInLinks,
  loggedOutLinks,
  bizLinks,
  adminLinks,
} from "../../myLinks";
const Links = () => {
  const { login } = useContext(LoginContext);
  const loggedIn = login;
  return (
    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
      {alwaysLinks.map((myItem, index) => (
        <NavLinkComponent to={myItem.to} key={"linksnav" + index}>
          {myItem.title}
        </NavLinkComponent>
      ))}
      {loggedIn &&
        loggedInLinks.map((myItem, index) => (
          <NavLinkComponent to={myItem.to} key={"linksnav2" + index}>
            {myItem.title}
          </NavLinkComponent>
        ))}
      {loggedIn &&
        loggedIn.isBusiness &&
        bizLinks.map((myItem, index) => (
          <NavLinkComponent to={myItem.to} key={"linksnav3" + index}>
            {myItem.title}
          </NavLinkComponent>
        ))}
      {loggedIn &&
        loggedIn.isAdmin &&
        adminLinks.map((myItem, index) => (
          <NavLinkComponent to={myItem.to} key={"linksnav4" + index}>
            {myItem.title}
          </NavLinkComponent>
        ))}
      {!loggedIn &&
        loggedOutLinks.map((myItem, index) => (
          <NavLinkComponent to={myItem.to} key={"linksnav5" + index}>
            {myItem.title}
          </NavLinkComponent>
        ))}
    </Box>
  );
};

export default Links;
