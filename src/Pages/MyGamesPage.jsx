import { Fragment, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useDataCard from "../hooks/useDataCard";
import { Grid, Button, Tooltip } from "@mui/material";
import filterContext from "../store/filterContext";
import ROUTES from "../routes/ROUTES";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import useHandleFavClick from "../hooks/useHandleFav";
import { Bounce, Flip, toast } from "react-toastify";
import GameComponent from "../Component/GameComponent";
import axios from "axios";
import LoginContext from "../store/loginContext";
import normalizeFav from "../services/normalizeLike";
import normalizeGames from "./Favorite/normalizeFav";
import gameContext from "../store/gameContext";
import useHandleCartClick from "../hooks/useHandleCart";

const MyGamesPage = () => {
  let { dataFromServer, setDataFromServer, setGamesCopy } =
    useContext(filterContext);
  const [count] = useState(1000);
  const { login } = useContext(LoginContext);
  const navigate = useNavigate();
  const { handleFavClick } = useHandleFavClick();
  const { handleCartClick } = useHandleCartClick();
  const GameFav = useDataCard();
  useEffect(() => {
    const fetchInfo = async () => {
      try {
        await axios.get("/games/my-games").then(({ data }) => {
          setDataFromServer(normalizeGames(data));
          setGamesCopy(normalizeGames(data));
        });
      } catch (err) {
        toast.error("Try Again!", {
          position: "top-center",
          autoClose: 5000,
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

    fetchInfo();
  }, [setDataFromServer, setGamesCopy]);

  if (!dataFromServer || !dataFromServer.length) {
    return (
      <Fragment>
        <Link to={ROUTES.CREATEGAME}>
          <Grid mt={3}
            container
            justifyContent="center"
            alignItems="center"
            direction="column"
          >
            <Tooltip title="Create a Game">
              <Button sx={{ display: "flex", justifyContent: "center", padding: "1rem" }}
                style={{
                  backgroundColor: "#f15000",
                  width: "100%",
                  display: "flex",
                  flexDirection: "coulmn",
                  position: "relative",
                  alignItems: "center",
                }}>
                <AddCircleIcon
                  style={{ fontSize: "2rem", color: "white" }} />
              </Button>
            </Tooltip>
          </Grid>
        </Link>
      </Fragment>
    );
  }

  const handleFavGame = async (id) => {
    handleFavClick(id);
  };
  const handleCartGame = async (id) => {
    handleCartClick(id);
  };
  const handleInfoClick = (id) => {
    navigate(`${ROUTES.DETAILS}/${id}`);
  };
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
    };
    fetchInfo();
  };

  const handleEditGame = (id) => {
    navigate(`${ROUTES.EDITGAME}/${id}`);
  };
  return (
    <Fragment>
      <Tooltip title="Create a Game">
        <Link to={ROUTES.CREATEGAME}>
          <Grid mt={3}
            justifyContent="center"
            container
            alignItems="center"
            direction="column"
          >
          </Grid>
        </Link>
      </Tooltip>

      <Grid container spacing={2} mt={7}>
        {GameFav.slice(0, count).map((game, index) => (
          <Grid item lg={4} md={6} xs={12} key={"carsGame" + index}>
            <GameComponent
              id={game._id}
              title={game.title}
              img={game.image.url}
              price={game.price}
              discount={game.discount}
              trailer={game.trailer}
              rating={game.rating}
              Info={handleInfoClick}
              onEdit={handleEditGame}
              onFav={handleFavGame}
              onAddToCart={handleCartGame}
              onLike={game.liked}
              onCart={game.Carted}
              onDelete={handleDeleteGame}
            />
          </Grid>
        ))}

        <Link to={ROUTES.CREATEGAME}>
          <Tooltip title="Create a Game">
            <Button sx={{ display: "flex", justifyContent: "center", padding: "1rem", marginLeft: "1.69rem", marginRight: "0" }}
              style={{
                backgroundColor: "#f15000",
                width: "50%",
                marginTop: "1rem",
                display: "flex",
                flexDirection: "coulmn",
                justifyContent: "center",
                position: "relative",
                alignItems: "center",
                borderRadius: "50%",
              }}>
              <AddCircleIcon
                style={{ fontSize: "2rem", color: "white" }} />
            </Button>
          </Tooltip>
        </Link>

      </Grid>
    </Fragment>
  );
};

export default MyGamesPage;
