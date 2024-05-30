import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import TextInputComponent from "../../Component/TextInputComponent";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ROUTES from "../../routes/ROUTES";
import { useNavigate, Link } from "react-router-dom";
import normalizeRegister from "./normalizeRegister";
import { validateSchema } from "../../validation/registerationValidation";
import {
  Avatar,
  Button,
  Checkbox,
  Grid,
  Box,
  Typography,
  Alert,
  FormControlLabel,
} from "@mui/material";
import './ui/register.css'
const RegisterPage = () => {
  const [viewRegister, setviewRegister] = useState(false);
  const [checked, setChecked] = useState(false);
  const [inputsValue, setInputsValue] = useState({
    first: "",
    middle: "",
    last: "",
    email: "",
    password: "",
    phone: "",
    url: "",
    alt: "",
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
  });
  const [errors, setErrors] = useState({
    first: "",
    last: "",
    email: "",
    password: "",
    phone: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
  });
  const navigate = useNavigate();
  let keysArray = Object.keys(inputsValue);
  const handleInputsBlur = (e) => {
    let dataFromJoi = validateSchema[e.target.id]({
      [e.target.id]: inputsValue[e.target.id],
    });
    if (dataFromJoi.error) {
      setErrors((copyOfErrors) => ({
        ...copyOfErrors,
        [e.target.id]: dataFromJoi.error.details[0].message,
      }));
    } else {
      setErrors((copyOfErrors) => {
        delete copyOfErrors[e.target.id];
        return { ...copyOfErrors };
      });
    }
  };
  const handleInputsChange = (e) => {
    setInputsValue((CopyOfCurrentValue) => ({
      ...CopyOfCurrentValue,
      [e.target.id]: e.target.value,
    }));
  };

  const handleCheck = (e) => {
    setChecked(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/users", normalizeRegister(inputsValue, checked));
      toast.success("✔ Signned Up Success", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      navigate(ROUTES.LOGIN);
    } catch (err) {
      console.error("Try Again", err);
      setviewRegister(true);
    }
  };

  const isFieldRequired = (fieldName) => {
    return errors[fieldName] !== undefined;
  };

  return (
    <Box
      sx={{
        color: "#f15000",
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxShadow: "0px 2px 15px rgb(0 0 0 / 10%)",
        padding: "2rem"
      }}
    >
      <Typography component="h1" variant="h5" style={{ color: "#f15000" }}>
        Create a new account
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          {keysArray.map((keyName) => (
            <TextInputComponent
              key={"inputs" + keyName}
              id={keyName}
              label={keyName}
              value={inputsValue[keyName]}
              onChange={handleInputsChange}
              onBlur={handleInputsBlur}
              errors={errors[keyName]}
              type={keyName === "password" ? "password" : ""}
              required={isFieldRequired(keyName)}
            />
          ))}

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  checked={checked}
                  onChange={(e) => handleCheck(e)}
                  style={{ color: "#ff1744" }}
                />
              }
              label="Business Account"
              style={{ color: "#ff1744" }}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 5 }}
          disabled={(Object.keys(errors).length > 0)}
        >
          Sign Up
        </Button>
        {viewRegister && <Alert severity="error" >Failed To Register!</Alert>}{" "}
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link style={{ color: "#f15000" }} to={ROUTES.LOGIN}>Already have an account? Sign in</Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default RegisterPage;
