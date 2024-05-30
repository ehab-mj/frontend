import ROUTES from "../../routes/ROUTES";
import FeedIcon from '@mui/icons-material/Feed';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import VpnKeyRoundedIcon from '@mui/icons-material/VpnKeyRounded';
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded';
import StyleRoundedIcon from '@mui/icons-material/StyleRounded';
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import { BiSolidCrown } from "react-icons/bi";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
const alwaysButtons = [
  {
    to: ROUTES.ABOUT, title: "About", icon: <FeedIcon />,
  },
];
const loggedInButtons = [
  { to: ROUTES.CART, title: "Cart", icon: <ShoppingCartIcon /> },
];

const bizButtons = [
  { to: ROUTES.MYGAMES, title: "My Games", icon: <LibraryAddIcon /> },
];

const adminButtons = [
  { to: ROUTES.SANDBOX, title: "Admin", icon: <BiSolidCrown /> },
];

const loggedOutButtons = [
  {
    to: ROUTES.REGISTER, title: "Register page", icon: <PersonAddAltRoundedIcon />,
  },
  { to: ROUTES.LOGIN, title: "Login page", icon: <VpnKeyRoundedIcon /> },
];

export {
  alwaysButtons,
  loggedInButtons,
  loggedOutButtons,
  bizButtons,
  adminButtons,
};
