import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Avatar, Button, Grid, Box, Typography, Alert } from "@mui/material";
import TextInputComponent from "../Component/TextInputComponent";
import ROUTES from "../routes/ROUTES";
import normalizeRegister from "./RegisterPage/normalizeRegister";
import { validateSchema } from "../validation/registerationValidation";
import { Bounce, Flip, toast } from "react-toastify";
import ModeIcon from "@mui/icons-material/Mode";
const EditUserPage = () => {
  const [inputsValue, setInputsValue] = useState({
    first: "",
    middle: "",
    last: "",
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
    phone: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();
  const [useredit, setuseredit] = useState(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`users/${id}`, normalizeRegister(inputsValue));
      toast.success("Registered Successfully", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Flip,
      });
      navigate(ROUTES.PROFILE);
    } catch (err) {
      setuseredit(true);
      toast.error("❗Try again!", {
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
  };
  const isRequired = (fieldName) => {
    return errors[fieldName] !== undefined;
  };
  const handleReset = () => {
    setInputsValue((cInputsValue) => {
      const clear = Object.keys(cInputsValue)
        .reduce((acc, key) => {
          acc[key] = "";
          return acc;
        }, {});
      return clear;
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 8,
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "#f15000" }}>
        <ModeIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Edit User
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          {keysArray.map((keyName) => (
            <TextInputComponent
              key={"inputs" + keyName}
              autoFocus={keyName === "first"}
              id={keyName}
              label={keyName}
              value={inputsValue[keyName]}
              onChange={handleInputsChange}
              onBlur={handleInputsBlur}
              errors={errors[keyName]}
              required={isRequired(keyName)}
            />
          ))}
        </Grid>
        <Button variant="contained" type="submit" sx={{ mt: 3, mb: 2 }}
          fullWidth
          disabled={(Object.keys(errors).length > 0)}
        >
          Submit
        </Button>
        <Grid item xs>
          <Button variant="contained" color="secondary" style={{ background: "#f15000" }}
            sx={{
              width: "100%",
              mt: 2,
              ml: "0%",
              mb: 2,
            }}
            onClick={handleReset}
          >
            Clear
          </Button>
        </Grid>
        {useredit && <Alert severity="error">Failed!</Alert>}{" "}
      </Box>
    </Box >
  );
};

export default EditUserPage;
