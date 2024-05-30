import "./App.css";
import { createContext, useEffect, useState } from "react";
import LayoutComponent from "./Layout/LayoutComponent";
import Router from "./routes/Router";
import LoginContext from "./store/loginContext";
import { ToastContainer } from "react-toastify";
import filterContext from "./store/filterContext";
import usersContext from "./store/usersContext";
import PageHeader from "./Layout/header/PageHeader";
import gameContext from "./store/gameContext";
import { CardLink } from "react-bootstrap";
import Cart from "./Pages/Cart/Cart";
import ShopContext from "./store/ShopContext";
import axios from "axios";
export const RecoveryContext = createContext();
export const AppContext = createContext();

function App() {
    const [login, setLogin] = useState(null);
    const [dataFromServer, setDataFromServer] = useState([]);
    const [CopyGame, setGamesCopy] = useState([]);
    const [UserInfo, setuserInfo, userCopy, setUserCopy] = useState([]);
    const [library, setLibrary] = useState([]);
    const [bag, setBag] = useState([]);
    const [cartItems, setCartItems] = useState([]);

    const [cards, setGames] = useState([]);
    const [cart, setCart] = useState([]);

    return (
        <usersContext.Provider
            value={{ userCopy, setUserCopy, UserInfo, setuserInfo }}
        >
            <filterContext.Provider
                value={{ dataFromServer, setDataFromServer, setGamesCopy, CopyGame, }}
            >

                <gameContext.Provider
                    value={{ dataFromServer, setDataFromServer, setGamesCopy, CopyGame, }}
                >
                    <ShopContext.Provider value={{ cart, setCart, library, setLibrary }}>
                        <LoginContext.Provider value={{ login, setLogin }}>
                            <ToastContainer />
                            <LayoutComponent>
                                <Router />
                            </LayoutComponent>
                        </LoginContext.Provider>
                    </ShopContext.Provider >
                </gameContext.Provider>
            </filterContext.Provider>
        </usersContext.Provider>
    );
}

export default App;
