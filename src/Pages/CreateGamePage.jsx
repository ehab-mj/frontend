import { Box, Avatar, Typography, Grid, Button } from "@mui/material";
import { toServer } from "../services/normalizeToServer";
import ROUTES from "../routes/ROUTES";
import useInputs from "../hooks/useInputs";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import axios from "axios";
import TextInputComponent from "../Component/TextInputComponent";
import { Bounce, Flip, toast } from "react-toastify";
import { FaFileArrowUp } from "react-icons/fa6";
const CreateGamePage = () => {
  const {
    handleInputsChange,
    handleInputsBlur,
    inputsValue,
    errors,
    navigate,
    keysArray,
    isRequired,
  } = useInputs();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/games/", toServer(inputsValue));
      toast.success("You Can visit you own game page!", {
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
      navigate(ROUTES.MYGAMES);
    } catch (err) {
      toast.error(
        "Check your Email details and Try again!",
        {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        }
      );
    }
  };
  return (
    <Box
      sx={{
        flexDirection: "column",
        display: "flex",
        alignItems: "center",
        marginTop: 8,
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "#f15000" }}>
        <FaFileArrowUp />
      </Avatar>
      <Typography component="h1" variant="h5">
        Create New Game
      </Typography>
      <Box noValidate
        sx={{
          mt: 3
        }}
        component="form"
        onSubmit={handleSubmit}
      >
        <Grid container spacing={2}>
          {keysArray.map((keyName) => (
            <TextInputComponent
              key={"inputs" + keyName}
              id={keyName}
              autoFocus={keyName === "title"}
              type={keyName === "password" ? "password" : undefined}
              label={keyName}
              value={inputsValue[keyName]}
              onChange={handleInputsChange}
              onBlur={handleInputsBlur}
              errors={errors[keyName]}
              required={isRequired(keyName)}
            />
          ))}
        </Grid>
        <Button fullWidth type="submit" variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={Object.keys(errors).length > 0}
        >
          Done
        </Button>
      </Box>
    </Box>
  );
};
export default CreateGamePage;
