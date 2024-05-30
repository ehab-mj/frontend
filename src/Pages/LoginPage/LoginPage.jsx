import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import CopyrightComponent from "./ui/CopyrightComponent";
import ROUTES from "../../routes/ROUTES";
import axios from "axios";
import LoginContext from "../../store/loginContext";
import { jwtDecode } from "jwt-decode";
import { Bounce, Flip, toast } from "react-toastify";
import {
  validateEmailLogin,
  validatePasswordLogin,
} from "../../validation/logInValidation";
import { storeToken } from "../../services/storageService";
import './ui/login.css'
import {
  Box,
  Grid,
  Typography,
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Paper,
  Alert,
} from "@mui/material";


const LoginPage = () => {
  const { login, setLogin } = useContext(LoginContext);
  const [emailValue, setEmailValue] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [remeber, SetRemeber] = useState(false);
  const [adminType, setAdminType] = useState(false);
  const navigate = useNavigate();
  const [isBlocked, setIsBlocked] = useState(false);
  const [failedLoginAttempts, setFailedLoginAttempts] = useState(0);
  const [checked, setChecked] = useState(false);

  const handleEmailChange = (e) => {
    setEmailValue(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPasswordValue(e.target.value);
  };

  const handleUserLoginAttempts = async () => {
    try {
      const { data } = await axios.get("/users/" + login._id);
      if (data.failedLoginAttempts >= 3) {
        setIsBlocked(true);

        const unblockTimer = setTimeout(() => {
          setIsBlocked(false);
          setFailedLoginAttempts(0);
          data.failedLoginAttempts = 0;
        }, 24 * 60 * 60 * 1000);
        return () => clearTimeout(unblockTimer);
      }
    } catch (err) {
      console.log(err);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isBlocked) {
      toast.error(
        "Your account is temporarily locked. Try Later"
      );
      return;
    }
    try {
      let { data } = await axios.post("/users/login", {
        email: emailValue,
        password: passwordValue,
      });

      handleUserLoginAttempts();
      if (!checked) {
        localStorage.setItem("token", data);
      } else {
        sessionStorage.setItem("token", data);
      }

      storeToken(data, remeber);
      const UserData = jwtDecode(data);
      const { isBusiness } = UserData;
      setLogin(UserData);
      toast.success(!isBusiness ? "✔ You Successfully Loggedin as Guest" : "👨🏻‍💼 You Successfully Loggedin as Business! ", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Flip
      });
      navigate(ROUTES.HOME);
    } catch (err) {
      toast.error("something went wrong! check youe email or password", {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce
      });
      setLogin(null);
      localStorage.clear();
    }
  };
  const handleEmailBlur = () => {
    let dataFromJoi = validateEmailLogin({ email: emailValue });
    console.log("dataFromJoi", dataFromJoi);
    if (dataFromJoi.error) {
      setEmailError(dataFromJoi.error.details[0].message);
    } else {
      setEmailError("");
    }
  };
  const handlePasswordBlur = () => {
    let dataFromJoi = validatePasswordLogin({ password: passwordValue });
    console.log("dataFromJoi", dataFromJoi);
    if (dataFromJoi.error) {
      setPasswordError(dataFromJoi.error.details[0].message);
    } else {
      setPasswordError("");
    }
  };
  const handleremember = (e) => {
    SetRemeber(e.target.checked);
  };

  return (

    <div className="container">
      <div className="w-full 2xl:w-2/5 gap-8 flex-colo p-8 sm:p-14 md:w-3/5 bg-dry  rounded-lg border border-border">
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={emailValue}
            onChange={handleEmailChange}
            onBlur={handleEmailBlur}
          />
          {emailError && <Alert severity="error">{emailError}</Alert>}
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={passwordValue}
            onChange={handlePasswordChange}
            onBlur={handlePasswordBlur}
          />
          {passwordError && <Alert severity="error">{passwordError}</Alert>}
          <FormControlLabel
            control={<Checkbox value="remember" style={{ color: "#f15000" }} />}
            label="Remember me"
            onChange={handleremember}
            checked={remeber}
          />
          <Button style={{ background: "#f15000", color: "white" }}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={Boolean(emailError || passwordError)}
          >
            Sign in
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to={ROUTES.FORGETPASS} variant="body2"
                style={{ color: "#f15000" }}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to={ROUTES.REGISTER}
                style={{ color: "#f15000" }}
              >
                {"Click this here to Sign Up"}
              </Link>
            </Grid>
          </Grid>
          <CopyrightComponent style={{ color: "#f15000" }} sx={{ mt: 5 }} />
        </Box>
      </div>
    </div>
  );
};
export default LoginPage;
