import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useContext, useEffect, useState } from "react";
import LoginContext from "../store/loginContext";
import { getToken } from "../services/storageService";

const useLogin = () => {
  const [finishAutoLogin, setFinishAutoLogin] = useState(false);
  const { setLogin } = useContext(LoginContext);
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
    }
    axios
      .get("/users/" + UserData._id)
      .then(({ data }) => {
        setLogin(UserData);
        setFinishAutoLogin(true);
      })
      .catch((err) => {
        setFinishAutoLogin(true);
      });
  }, [setLogin]);

  return finishAutoLogin;
};

export default useLogin;
