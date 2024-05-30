import { useNavigate } from "react-router-dom";
import LoginContext from "../../../store/loginContext";
import ROUTES from "../../../routes/ROUTES";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import HomeIcon from '@mui/icons-material/Home';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import VpnKeyRoundedIcon from '@mui/icons-material/VpnKeyRounded';
import MeetingRoomRoundedIcon from '@mui/icons-material/MeetingRoomRounded';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FeedIcon from '@mui/icons-material/Feed';
import { BiSolidCrown } from "react-icons/bi";
import {
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Drawer,
    ListItemIcon,
} from "@mui/material";
import { useContext } from "react";
import { Bounce, Flip, toast } from "react-toastify";
import { getToken } from "../../../services/storageService";
const LeftDrawerComponent = ({ isOpen, onCloseDrawer }) => {
    const navigate = useNavigate();
    let { login, setLogin } = useContext(LoginContext)

    const handleProfileClick = () => {
        console.log("clicked on Profile");
        navigate(ROUTES.PROFILE);
    }

    const handleHomeClick = () => {
        console.log("clicked on Home");
        navigate(ROUTES.HOME);
    };

    const handleAboutClick = () => {
        console.log("clicked on About");
        navigate(ROUTES.ABOUT);
    }

    const handleFavClick = () => {
        console.log("clicked on Fav");
        navigate(ROUTES.CART);
    }

    const handleMGamesClick = () => {
        console.log("clicked on MGames");
        navigate(ROUTES.MYGAMES);
    }
    const handleSignUp = () => {
        console.log("clicked on SignUp");
        navigate(ROUTES.REGISTER);
    }

    const handleLogin = () => {
        console.log("clicked on Login");
        navigate(ROUTES.LOGIN);
    }

    const handleLogout = () => {
        localStorage.clear();
        setLogin(false);
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
        window.location.href = "./login"
    };

    const list = () => (
        <Box
            className="font"
            sx={{ width: { auto: 250 } }}
            role="presentation"
            onClick={onCloseDrawer}
            onKeyDown={onCloseDrawer}
            style={{ width: "220px" }}
        >
            <List>
                {login && (
                    <ListItem key="Profile" disablePadding>
                        <ListItemButton onClick={handleProfileClick}>
                            <ListItemIcon>
                                <AccountCircleRoundedIcon />
                            </ListItemIcon>
                            <ListItemText primary="Profile" />
                        </ListItemButton>
                    </ListItem>
                )}
            </List>

            <List>
                <ListItem key="Home" disablePadding>
                    <ListItemButton onClick={handleHomeClick}>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItemButton>
                </ListItem>
            </List>

            <List>
                <ListItem key="About" disablePadding>
                    <ListItemButton onClick={handleAboutClick}>
                        <ListItemIcon>
                            <FeedIcon />
                        </ListItemIcon>
                        <ListItemText primary="About" />
                    </ListItemButton>
                </ListItem>
            </List>



            <List>
                {login && (
                    <ListItem key="My Cart" disablePadding>
                        <ListItemButton onClick={handleFavClick}>
                            <ListItemIcon>
                                <ShoppingCartIcon />
                            </ListItemIcon>
                            <ListItemText primary="Cart" />
                        </ListItemButton>
                    </ListItem>
                )}
            </List>


            <List>
                {login && (login.isBusiness || login.isAdmin) && (
                    <ListItem key="My Games" disablePadding>
                        <ListItemButton onClick={handleMGamesClick}>
                            <ListItemIcon>
                                <LibraryAddIcon />
                            </ListItemIcon>
                            <ListItemText primary="My Games" />
                        </ListItemButton>
                    </ListItem>
                )}
            </List>


            <List>
                {!login && (
                    <ListItem key="Sign Up" disablePadding>
                        <ListItemButton onClick={handleSignUp}>
                            <ListItemIcon>
                                <PersonAddAltRoundedIcon />
                            </ListItemIcon>
                            <ListItemText primary="Sign Up" />
                        </ListItemButton>
                    </ListItem>
                )}
            </List>


            <List>
                {!login && (
                    <ListItem key="Login" disablePadding>
                        <ListItemButton onClick={handleLogin}>
                            <ListItemIcon>
                                <VpnKeyRoundedIcon />
                            </ListItemIcon>
                            <ListItemText primary="Login" />
                        </ListItemButton>
                    </ListItem>
                )}
            </List>



            <List>
                {login && (
                    <ListItem key="Logout" disablePadding style={{ color: "#EE4B2B" }}>
                        <ListItemButton onClick={handleLogout} >
                            <ListItemIcon>
                                <MeetingRoomRoundedIcon style={{ color: "#EE4B2B" }} />
                            </ListItemIcon>
                            <ListItemText primary="Logout" />
                        </ListItemButton>
                    </ListItem>
                )}
            </List>
        </Box>

    );
    return (
        <Drawer anchor="right" open={isOpen} onClose={onCloseDrawer}>
            {list()}
        </Drawer>
    );
};

export default LeftDrawerComponent;