import axios from "axios";
import { useContext } from "react";
import { Flip, Slide, toast } from "react-toastify";
import filterContext from "../store/filterContext";
import gameContext from "../store/gameContext";
import useDataCard from "./useDataCard";
const useHandleCartClick = () => {
    const { setDataFromServer } = useContext(filterContext);
    const handleCartClick = async (id) => {
        try {
            let { data } = await axios.patch("/games/" + id);
            setDataFromServer((currentDataFromServer) => {
                let GameForm = currentDataFromServer.findIndex(
                    (game) => game._id === id
                );
                console.log(GameForm);
                if (GameForm >= 0) {
                    currentDataFromServer[GameForm] = data;
                }
                return [...currentDataFromServer];
            });
            toast.success("Check your games in favorites", {
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
        } catch (err) {
            toast.error("Failed to add to favorites", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Slide,
            });
        }
    };
    return {
        handleCartClick,
    };
};

export default useHandleCartClick;
