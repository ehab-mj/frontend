import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ROUTES from "../../routes/ROUTES.js";
import GameDetailsComponent from "../../Component/GameDetailsComponent.jsx";
import LoginContext from "../../store/loginContext.js";
import useHandleDelete from "../../hooks/useHandleDelete.jsx";
import useHandleFavClick from "../../hooks/useHandleFav.jsx";
import { fromServer } from "../../services/normalizeFromServer.js";
import useHandleCartClick from "../../hooks/useHandleCart.jsx";
const GamesDetailsPage = () => {
    const handleDelete = useHandleDelete();
    const { handleFavClick } = useHandleFavClick();
    const { handleCartClick } = useHandleCartClick();
    const navigate = useNavigate();
    const { login } = useContext(LoginContext);
    const { id } = useParams();
    const [GameDetails, setGameDetails] = useState({
        title: "",
        description: "",
        category: [""],
        trailer: "",
        url: "",
    });
    useEffect(() => {
        axios.get("/games/" + id).then(({ data }) => {
            setGameDetails({
                ...fromServer(data),
                likes: data.likes || [],
            });
        });
    }, [id]);

    const handleDeleteGame = (id) => {
        handleDelete(id);
    };

    const handleEditGame = (id) => {
        navigate(`${ROUTES.EDITGAME}/${id}`);
    };

    const handleFavGame = async (id) => {
        handleFavClick(id);
    };
    const handleCartGame = async (id) => {
        handleCartClick(id);
    };

    let liked = false; // Initialize 'liked' as false by default
    if (GameDetails.likes && GameDetails.likes.find((id) => id === login._id)) {
        liked = true;
    }


    let Carted = false; // Initialize 'liked' as false by default
    if (GameDetails.Carts && GameDetails.Carts.find((id) => id === login._id)) {
        Carted = true;
    }

    return (
        <GameDetailsComponent
            id={id}
            title={GameDetails.title}
            game={GameDetails.game}
            description={GameDetails.description}
            category={GameDetails.category}
            rating={GameDetails.rating}
            poster={GameDetails.poster}
            price={GameDetails.price}
            discount={GameDetails.discount}
            trailer={GameDetails.trailer}
            image={GameDetails.url}
            liked={liked}
            Carted={Carted}
            onDelete={handleDeleteGame}
            onEdit={handleEditGame}
            onFav={handleFavGame}
            onAddToCart={handleCartClick}
            onFavorite={handleFavGame}
        />
    );
};

export default GamesDetailsPage;
