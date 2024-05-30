import ROUTES from "../routes/ROUTES";
import HomeIcon from '@mui/icons-material/Home';
import FeedIcon from '@mui/icons-material/Feed';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import { Tooltip } from "@mui/material";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import VpnKeyRoundedIcon from '@mui/icons-material/VpnKeyRounded';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { BiSolidCrown } from "react-icons/bi";
const alwaysLinks = [{

  to: ROUTES.HOME, title:
    <Tooltip title="Home">
      <HomeIcon
        style={{
          width: "2.2rem",
          height: "3rem",
        }}
      />
    </Tooltip>
},
{

  to: ROUTES.ABOUT, title:
    <Tooltip title="About">
      <FeedIcon
        style={{
          width: "2.2rem",
          height: "3rem",
        }}
      />
    </Tooltip>
},
];

const loggedInLinks = [
  {
    to: ROUTES.CART, title:
      <Tooltip title="Cart ">
        <ShoppingCartIcon
          style={{
            width: "2.2rem",
            height: "3rem",
          }}
        />
      </Tooltip >
  },
];

const bizLinks = [
  {
    to: ROUTES.MYGAMES, title:
      <Tooltip title="My Games">
        <LibraryAddIcon
          style={{
            width: "2.2rem",
            height: "3rem",
          }}
        />
      </Tooltip >
  },
];
const adminLinks = [
  {
    to: ROUTES.SANDBOX, title:
      <Tooltip title="sandbox">
        <BiSolidCrown
          style={{
            width: "2.2rem",
            height: "3rem",
          }}
        />
      </Tooltip>
  }
];

const loggedOutLinks = [
  {
    to: ROUTES.REGISTER, title:
      <Tooltip title="Register">
        <PersonAddAltRoundedIcon
          style={{
            width: "2.2rem",
            height: "3rem",
          }}
        />
      </Tooltip>
  },
  {
    to: ROUTES.LOGIN, title:
      <Tooltip title="Login">
        <VpnKeyRoundedIcon
          style={{
            width: "2.2rem",
            height: "3rem",
          }}
        />
      </Tooltip>
  },
];

export { alwaysLinks, loggedInLinks, loggedOutLinks, bizLinks, adminLinks };
