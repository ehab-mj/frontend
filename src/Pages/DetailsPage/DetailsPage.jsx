import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Typography, Grid, Paper, Card, CardActionArea, CardMedia, Box } from "@mui/material";
import CardComponent from "../../Component/GameComponent";
import useDataCard from "../../hooks/useDataCard";
import useHandleFavClick from "../../hooks/useHandleFav";
import useHandleEditCard from "../../hooks/useHandleEdit";
import normalizeFav from "../../services/normalizeLike";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import ROUTES from "../../routes/ROUTES";
import axios from "axios";
import filterContext from "../../store/filterContext";
import "./Details.css"
import { Flip, toast } from "react-toastify";
import LoginContext from "../../store/loginContext";
import gameContext from "../../store/gameContext";
const DetailsPage = ({ city, street, houseNumber }) => {
  const { setDataFromServer } = useContext(filterContext);
  const { id: _id } = useParams();
  const GameFav = useDataCard();
  const { handleFavClick } = useHandleFavClick();
  const { handleEditClick } = useHandleEditCard();
  const { login } = useContext(LoginContext);
  const navigate = useNavigate();

  const location = {
    lat: 32.13147290769876,
    lng: 34.96580113830216,
  };

  const containerStyle = {
    width: '100%',
    height: '52vh',
    marginTop: '2rem'
  };
  useEffect(() => {
    const fetchInfo = async () => {
      if (!_id) return;

      try {
        const { data } = await axios.get(`games/${_id}`);
        setDataFromServer([normalizeFav(data)]);
      } catch (err) {
        console.log("error", err);
      }
    };

    fetchInfo();
  }, [_id, setDataFromServer]);


  const handleEditGame = (id) => {
    handleEditClick(id);
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
  const handleInfoClick = (id) => {
    navigate(`${ROUTES.DETAILS}/${id}`);
  };
  const handleFavGame = async (id) => {
    handleFavClick(id);
  };
  return (
    <Container>
      <Grid container spacing={2} mt={2} xs={12}>
        {GameFav.map((game, index) => (
          <Grid
            container
            item
            xs={12}
            md={12}
            lg={12}
            key={"carsGame" + index}
            justifyContent="center"
            alignItems="center"
            m={2}
          >
            <Card className="gamesBody" square raised >
              <CardActionArea>
                <Grid
                >
                  <div className="Body">
                    <CardMedia className="gamesBody">
                      <CardComponent
                        id={game._id}
                        title={game.title}
                        subtitle={game.subtitle}
                        img={game.image.url}
                        phone={game.phone}
                        address={game.address}
                        cardNumber={game.bizNumber}
                        Info={handleInfoClick}
                        onEdit={handleEditGame}
                        onFav={handleFavGame}
                        onLike={game.liked}
                        onCart={game.Carted}
                        onDelete={handleDeleteGame}
                      />

                    </CardMedia>
                  </div>
                </Grid>
              </CardActionArea>
            </Card>
            <Grid item xs={12} md={12}>
              <Box
                elevation={3}
                sx={{
                  padding: 2,
                  height: "16.8vh",
                  borderRadius: "0",
                  background: "#1AA5B0",
                }}
              >
                <Typography variant="h4" gutterBottom>
                  {`${GameFav[0]?.title}`}
                </Typography>
                <Typography fontSize={"1rem"}>
                  <strong>Address:</strong>{" "}
                  {`${GameFav[0].address.street}, ${GameFav[0].address.city
                    }, ${GameFav[0].address.country}`}
                </Typography>
                <Typography fontSize={"1rem"}>
                  <strong>Phone:</strong> {`${GameFav[0].phone}`}
                </Typography>
                <Typography fontSize={"1rem"}>
                  <strong>Email:</strong> {`${GameFav[0].email}`}
                </Typography>
                <Typography fontSize={"1rem"}>
                  <strong>description:</strong> {`${GameFav[0].description}`}
                </Typography>
                <Typography fontSize={"1rem"}>
                  <strong>Card Number:</strong> {`${GameFav[0].bizNumber}`}
                </Typography>
              </Box>
              <Grid item xs={12} md={12}>
                <Box elevation={3}
                  sx={{
                    padding: 1,
                    height: "66.8vh",
                    borderRadius: "0",
                    fontSize: "1rem",
                    background: "#1AA5B0",
                  }}>

                  <div style={{ height: '100vh', width: '100%' }}>
                    <LoadScript googleMapsApiKey={"AIzaSyCKxCRfh3SS1NNLIh91nbMVASCf6gB6ptY"}>
                      <GoogleMap
                        id="example-map"
                        mapContainerStyle={containerStyle}
                        zoom={10}
                        center={location}
                      >
                      </GoogleMap>
                    </LoadScript>
                  </div>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Container >
  );
};

export default DetailsPage;
