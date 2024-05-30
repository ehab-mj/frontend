import { Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const NavLinkComponent = ({ to, children }) => {
  return (
    <NavLink to={to}>
      {({ isActive }) => (
        <Typography
          color={isActive ? "text.headerActive" : "text.headerColor"}
          sx={{ p: 1 }}
          fontSize={"0.8rem"}
        >
          {children}
        </Typography>
      )}
    </NavLink>
  );
};

NavLinkComponent.propTypes = {
  to: PropTypes.string.isRequired,
};

export default NavLinkComponent;
