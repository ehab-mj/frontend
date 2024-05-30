import { useContext, useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import MeetingRoomRoundedIcon from '@mui/icons-material/MeetingRoomRounded';
import Links from "./ui/Links";
import FilterComponent from "./ui/FilterComponent";
import ROUTES from "../../routes/ROUTES";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import tmc from "twin-moon-color";
import { Bounce, Flip, toast } from "react-toastify";
import LoginContext from "../../store/loginContext";
import { getToken } from "../../services/storageService";
import PropTypes from "prop-types";
import MenuItem from "@mui/material/MenuItem";
import AccountCircle from "@mui/icons-material/AccountCircle";
import usersContext from "../../store/usersContext";
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import PersonSharpIcon from '@mui/icons-material/PersonSharp';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DashboardCustomizeRoundedIcon from '@mui/icons-material/DashboardCustomizeRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Tooltip,
  Switch,
  Menu,
  Container,
  Button,
} from "@mui/material";
import LeftDrawerComponent from "./ui/LeftDrawerComponent";
import { Pages } from "@mui/icons-material";
import { Stack } from "react-bootstrap";
import './HomeImg.css';
import './ui/CssHeader/Logo.css';
import ShopContext from "../../store/ShopContext";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const themes = tmc({
  "text.headerColor": "!#323946",
  "text.headerActive": "*white",
  favActive: "*#323946",
});

const baseUrl = "https://image.tmdb.org/t/p/original";

const HeaderBackup = ({ isDarkTheme, onThemeChange, medias }) => {
  const [ishover, sethover] = useState(false);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const { login, setLogin } = useContext(LoginContext);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const darkMode = createTheme(themes.dark);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const { UserInfo, setuserInfo } = useContext(usersContext);
  const isMenuOpen = Boolean(anchorEl);
  const { library, cart } = useContext(ShopContext);


  useEffect(() => {
    const fetchUserDetails = async () => {
      if (login && login._id) {
        try {
          const { data } = await axios.get("/users/" + login._id);
          setuserInfo(data);
        } catch (error) {
          toast.error("something went wrong", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
          });
        }
      }
    };
    fetchUserDetails();
    return () => {
      setuserInfo([]);
    };
  }, [login, setuserInfo]);

  const handleThemeChange = (event) => {
    onThemeChange(event.target.checked);
  };
  const handleLogOut = async () => {
    let token = getToken();
    if (token) {
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      setLogin(false);
      toast("Logged Out Successfully", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      navigate(ROUTES.HOME);
    } else {
      setLogin(false);
      toast("Connect Now", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Flip,
      });
      navigate(ROUTES.LOGIN);
    }
  };

  const handleHomeClick = () => {
    console.log("clicked on Logo");
    navigate(ROUTES.HOME)
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleOpenDrawerClick = () => {
    setIsOpen(true);
  };
  const handleCloseDrawerClick = () => {
    setIsOpen(false);
  };
  const handleProfile = () => {
    console.log("clicked on Profile");
    navigate(ROUTES.PROFILE);
  }

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  ///
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) setIsScrolled(true);
      else setIsScrolled(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  ///
  const createRandomMedia =
    medias && medias.length
      ? medias[Math.floor(Math.random() * medias.length)]
      : null;

  console.log(createRandomMedia, "createRandomMedia");

  const menuId = "primary-search-account-menu";

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }
      }
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem>
        <IconButton
          size="medium"
          color="white"
          onClick={handleMenuClose}>
          <PersonSharpIcon />
        </IconButton>
        Profile
      </MenuItem>

      <MenuItem onClick={handleLogOut} style={{ color: "#FF5A5A" }}>
        <IconButton
          size="medium"
          color="white"
          onClick={handleLogOut}>
          <MeetingRoomRoundedIcon style={{ color: "#FF5A5A" }} />
        </IconButton>
        Logout
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfile}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1, mb: 2 }}>
      <AppBar className="navbar-container" position="static" style={{ background: "#222222" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Link to={ROUTES.HOME} sx={{ display: { xs: 'none', md: 'flex', cursor: 'pointer' }, mr: 1 }} >
              <Typography>
                <span className="Game">Game</span><span className="Shop">Shop</span>

              </Typography>
            </Link>
            <Links />
            <FilterComponent />
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' }, mr: 1 }}>

              <IconButton
                sx={{ display: { xs: "inline", md: "inline" } }}
              >
                {isDarkTheme ? <WbSunnyIcon style={{ color: "white", marginBottom: "-.2rem" }} />
                  : <NightsStayIcon style={{ color: "#f15000", marginBottom: "-.2rem" }} />}

                <Switch
                  checked={isDarkTheme}
                  onChange={handleThemeChange}
                />
              </IconButton>
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Profile">
                <Link className='UserName'
                  to={ROUTES.PROFILE}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Typography sx={{ p: 0 }}
                    variant="h6"
                    style={{
                      fontSize: ".8rem",
                      marginBottom: "8px",
                      fontFamily: "'Righteous', sans-serif",
                      fontWeight: "bold",
                      color: "#fff",
                      textTransform: "capitalize",
                      marginLeft: "10px",
                    }}
                  >

                    <AccountCircleRoundedIcon className='UserName' style={{ width: "2rem", height: "2rem", justifyContent: "center", textAlign: "center", display: "flex", margin: "0 auto" }} />
                    {UserInfo && UserInfo.name && UserInfo.name.first
                      ? `${UserInfo.name.first} ${UserInfo.name.last}`
                      : ""}
                  </Typography>
                </Link>
              </Tooltip>
            </Box>


            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleOpenDrawerClick}
              color="inherit"
            >
              <MoreVertIcon />
            </IconButton>

            <Box sx={{ flexGrow: 0 }}>
              <ThemeProvider theme={darkMode}>
                <IconButton sx={{ p: 0 }} size="large" color="" onClick={handleLogOut}>
                  {login ? <MeetingRoomRoundedIcon /> : <LockRoundedIcon />}
                </IconButton>
              </ThemeProvider>
            </Box>

          </Toolbar>
        </Container>
        {renderMobileMenu}
        {renderMenu}
        <LeftDrawerComponent
          isOpen={isOpen}
          onCloseDrawer={handleCloseDrawerClick}
        />

      </AppBar >
    </Box >
  );
};

HeaderBackup.propTypes = {
  isDarkTheme: PropTypes.bool.isRequired,
  onThemeChange: PropTypes.func.isRequired,
  UserDetails: PropTypes.shape({
    name: PropTypes.shape({
      first: PropTypes.string.isRequired,
      last: PropTypes.string.isRequired,
    }),
  }),
};

HeaderBackup.defaultProps = {
  UserDetails: PropTypes.shape({
    name: PropTypes.shape({
      first: <AccountCircleRoundedIcon style={{ width: "30rem", height: "30rem" }} />,
      last: "",
    }),
  }),
};

export default HeaderBackup;
