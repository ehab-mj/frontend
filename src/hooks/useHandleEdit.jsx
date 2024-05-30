import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import LoginContext from "../store/loginContext";
import filterContext from "../store/filterContext";
import ROUTES from "../routes/ROUTES";
import Typography from "@mui/material/Typography";
import { getToken } from "../services/storageService";
import { Slide, toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import gameContext from "../store/gameContext";
const useHandleEditCard = () => {
  const { login } = useContext(LoginContext);
  const navigate = useNavigate();
  const { dataFromServer } = useContext(filterContext);

  const handleEditClick = (id) => {
    if (!login) {
      toast.info('👷‍♂️ You Successfuly Edited the Game', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Slide,
      });
      return;
    }

    let token = getToken();
    let UserData = jwtDecode(token);

    if (!id || !dataFromServer || !login) {
      return;
    }
    if (dataFromServer && dataFromServer.length > 0) {
      const game = dataFromServer.find((item) => item._id === id);
      if (game && ((login && login.isBusiness && game.user_id === UserData._id) ||
        (login && login.isAdmin))
      ) {
        navigate(`${ROUTES.EDITGAME}/${id}`);
      }
    } else {
      return <Typography>Could not find any items here</Typography>;
    }
  };

  return { handleEditClick };
};

export default useHandleEditCard;
