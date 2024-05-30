import { useContext, useEffect, useState } from "react";
import FooterComponent from "./footer/FooterComponent";
import MainComponent from "./main/MainComponent";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import tmc from "twin-moon-color";
import { CssBaseline, Typography } from "@mui/material";
import LoginContext from "../store/loginContext";
import { getToken } from "../services/storageService";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import HeaderBackup from "./header/HeaderBackup";
import useDataCard from "../hooks/useDataCard";
const LayoutComponent = ({ children }) => {
  const [isDarkTheme, SetDarkTheme] = useState(false);
  const themes = tmc({
    "text.headerColor": "!#323946",
    "text.headerActive": "*White",
    favActive: "*#323946",

  });
  const [finishAutoLogin, setFinishAutoLogin] = useState(false);
  const { setLogin } = useContext(LoginContext);
  const darkMode = createTheme(themes.dark);
  const lightMode = createTheme(themes.light);
  const [games, setGames] = useState([]);
  const GameFav = useDataCard();

  const handleThemeChange = (checked) => {
    SetDarkTheme(checked);
  };

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setFinishAutoLogin(true);
      return;
    }
    let UserData = jwtDecode(token);
    if (!UserData || !UserData._id) {
      setFinishAutoLogin(true);
      return;
    } axios.get("/users/" + UserData._id)
      .then(({ data }) => {
        setLogin(UserData);
        setFinishAutoLogin(true);
      })
      .catch((err) => {
        setFinishAutoLogin(true);
      });
  }, [setLogin]);


  return (
    <ThemeProvider theme={isDarkTheme ? lightMode : darkMode}>
      <CssBaseline />

      <HeaderBackup
        isDarkTheme={isDarkTheme}
        onThemeChange={handleThemeChange}
      />
      <MainComponent>
        {finishAutoLogin ? (
          children
        ) : (
          <Typography variant="h1">Loading...</Typography>
        )}

      </MainComponent>
      <FooterComponent />
    </ThemeProvider >
  );
};


export default LayoutComponent;
