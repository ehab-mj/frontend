import axios from "axios";
import { useNavigate } from "react-router-dom";
import ROUTES from "../routes/ROUTES";
import LoginContext from "../store/loginContext";
import { Bounce, Flip, Slide, toast } from "react-toastify";
import filterContext from "../store/filterContext";
import { useContext } from "react";
import gameContext from "../store/gameContext";
const useHandleDelete = () => {
  const navigate = useNavigate();
  const { setDataFromServer } = useContext(filterContext);
  const { login } = useContext(LoginContext);
  const handleDeleteClick = async (id) => {
    const fetchInfo = async () => {
      try {
        await axios.delete("/games/" + id).then(({ data }) => {
          setDataFromServer((currentGamesFromServer) => {
            return currentGamesFromServer.filter((game) => game._id !== id);
          });
        });
        toast.success('🧹 Game has been deleted', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Flip,
        });
      } catch (error) {
        if (!login) navigate(ROUTES.LOGIN);
      }
    };
    fetchInfo();
  };
  return { handleDeleteClick };
};
export default useHandleDelete;
