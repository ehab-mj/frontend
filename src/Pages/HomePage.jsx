import { Grid, Tooltip, Typography } from "@mui/material";
import axios from "axios";
import { Fragment, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GameComponent from "../Component/GameComponent";
import PageHeader from "../Layout/header/PageHeader";
import useHandleEditGame from "../hooks/useHandleEdit";
import useHandleFavClick from "../hooks/useHandleFav";
import filterContext from "../store/filterContext";
import useDataCard from "../hooks/useDataCard";
import ROUTES from "../routes/ROUTES";
import LoginContext from "../store/loginContext";
import { Bounce, Flip, toast } from "react-toastify";
import normalizeGames from "./Favorite/normalizeFav";
import gameContext from "../store/gameContext";
import useHandleCartClick from "../hooks/useHandleCart";
import Contact from "./ContactUs/Contact";
const HomePage = () => {
  const { handleFavClick } = useHandleFavClick();
  const { handleEditClick } = useHandleEditGame();
  const { handleCartClick } = useHandleCartClick();
  const GameFav = useDataCard();
  const login = useContext(LoginContext);
  const [count] = useState(1000);
  const navigate = useNavigate();
  let { setDataFromServer, dataFromServer, setGamesCopy, CopyGame, } =
    useContext(filterContext);

  const handleDeleteGame = (id) => {
    const fetchInfo = async () => {
      try {
        await axios.delete("/games/" + id).then(({ data }) => {
          setDataFromServer((cGamesFromServer) => {
            return cGamesFromServer.filter((game) => game._id !== id);
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
      toast.warn("You are not allowed to delete", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      })
    };
    fetchInfo();
  };
  const handleEditGame = (id) => {
    handleEditClick(id);
  };
  const handleFavGame = async (id) => {
    handleFavClick(id);
  };
  const handleCartGame = async (id) => {
    handleCartClick(id);
  };

  const handleInfoClick = (id) => {
    navigate(`${ROUTES.DETAILS}/${id}`);
  };
  useEffect(() => {
    const fetchInfo = async () => {
      try {
        await axios.get("/games").then(({ data }) => {
          setDataFromServer(normalizeGames(data));
          setGamesCopy(normalizeGames(data));
        });
      } catch (err) {
        return <Typography>Error, Something went wrong i guess</Typography>;
      }
    };

    fetchInfo();
  }, []);

  if (!dataFromServer || !dataFromServer.length) {
  }

  const [cart, setCart] = useState([]);
  return (
    <div>
      <PageHeader />
      <Grid container spacing={2} mt={2}>
        <Link to={ROUTES.CREATEGAME}>
          <Grid>
          </Grid>
        </Link>
        {GameFav.slice(0, count).map((game, index) => (
          <Grid item lg={4} md={6} xs={12} key={"carsGame" + index}>
            <GameComponent
              id={game._id}
              title={game.title}
              description={game.description}
              category={game.category}
              rating={game.rating}
              discount={game.discount}
              price={game.price}
              img={game.image.url}
              trailer={game.trailer}
              onDelete={handleDeleteGame}
              Info={handleInfoClick}
              onEdit={handleEditGame}
              onFav={handleFavGame}
              onAddToCart={handleCartClick}
              onLike={game.liked}
              onCart={game.Carted}
            />
          </Grid>
        ))}

        <Grid item lg={12} md={12} xs={12}>
          <Contact />
        </Grid>


      </Grid>
    </div>
  );
};
export default HomePage;