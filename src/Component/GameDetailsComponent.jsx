import { Typography, Divider, IconButton, Box, Grid, AppBar, Container, Slide } from "@mui/material";
import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import LoginContext from "../store/loginContext";
import './GameDetailsCom.css'
import './gameSlide.css'
import './GDetails1.css'
import './GDetails2.css'
import './GDetails3.css'
import StarIcon from '@mui/icons-material/Star';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import useHandleFavClick from "../hooks/useHandleFav";
import { Bounce, Flip, toast } from "react-toastify";
import filterContext from "../store/filterContext";
import useDataCard from "../hooks/useDataCard";
import ROUTES from "../routes/ROUTES";
import IsAdmin from "../guard/isAdmin";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeIcon from "@mui/icons-material/Mode";
import axios from "axios";
const GameDetailsComponent = ({
    game,
    title,
    description,
    category,
    discount,
    trailer,
    price,
    rating,
    active,
    image,
    id,
    liked,
    Carted,
    onDelete,
    onEdit,
    onAddToCart,
    onFavorite,
}) => {
    const { login } = useContext(LoginContext);
    const navigate = useNavigate();
    const to = useLocation();
    let location = useLocation();
    const { handleFavClick } = useHandleFavClick();
    const { setDataFromServer } = useContext(filterContext);

    const handleFavGame = async (id) => {
        handleFavClick(id);
    };

    const handleCartClick = () => {
        onAddToCart(id);
    };

    const handleDeleteClick = () => {
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

    const handleBuyNow = () => {
        try {
            toast.success('You have bought this game', {
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


    const handleEditClick = () => {
        onEdit(id);
    };

    const handleFavoriteClick = () => {
        onFavorite(id);
    };

    const [isOpen, setIsOpen] = useState(false);
    const togglePopup = () => {
        setIsOpen(!isOpen);
    };
    const [autoplay, setAutoplay] = useState(true);

    return (
        <Box >
            <Box className="Tbg">
                <div className="gradient"></div>
                <img
                    src={image}
                    alt={title}
                    className="image"
                />
            </Box>

            <div className="T-detail">
                <div className="Trow">
                    <div >
                        <img className="T-poster"
                            src={image}
                            alt={title}
                        />
                        <div className="T-Price">
                            <h1 className="T-currentPrice">
                                {discount != 0 && (
                                    <>
                                        <span className="T-discount">
                                            <span>save</span>{" "}<i>{discount * 100}%</i>{" "}<span>off</span>
                                        </span>
                                    </>
                                )}
                                <span className="currentPrice">
                                    ${((1 - discount) * price).toFixed(2)}
                                </span>
                            </h1>
                        </div>

                        <Box className="T-Buy">
                            <button
                                to={title}
                                onClick={handleBuyNow}
                                className="T-BuyClick"
                            >
                                Buy Now
                            </button>
                        </Box>
                        {login && (
                            <Box className="T-Cart">
                                <IconButton
                                    onClick={handleCartClick}
                                    className="T-CartClick"
                                >
                                    <ShoppingCartIcon style={{ marginRight: "1rem" }} />
                                    Add To Cart
                                </IconButton>
                            </Box>
                        )}

                        <Box>
                            {((login.isBusiness && IsAdmin) ||
                                to.pathname === ROUTES.MYGAMES) && (
                                    <IconButton onClick={handleDeleteClick}>
                                        <DeleteIcon color="error" />
                                    </IconButton>
                                )}
                            {((login.isBusiness && IsAdmin) ||
                                to.pathname === ROUTES.MYGAMES) && (
                                    <IconButton onClick={handleEditClick}>
                                        <ModeIcon color="warning" />
                                    </IconButton>
                                )}
                        </Box>

                    </div>
                </div>

                <div className="T-detailRight">
                    <div className="T-detailRightTop">
                        <h1 className=".T.name ">
                            {title}
                        </h1>
                        <div className="T-rating">
                            {rating} <StarIcon className="star" />
                        </div>
                        <div className="T-category">
                            {category}
                        </div>
                        <div className="T-synopsisText">
                            {description}
                        </div>

                        <div className={`video ${active ? "active" : undefined}`}>
                            <iframe
                                width="500"
                                height="300"
                                autoPlay={autoplay}
                                src={trailer}
                                title={title}
                                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
                                allowFullScreen
                            >
                            </iframe>
                        </div>
                        <div className="grid sm:grid-cols-5 grid-cols-3 gap-4 p-6 bg-main border border-gray-800 rounded-lg">
                        </div>
                    </div>
                </div>
            </div>
        </Box>
    );
};

GameDetailsComponent.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.arrayOf(PropTypes.string).isRequired,
    trailer: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    liked: PropTypes.bool.isRequired,
    Carted: PropTypes.bool.isRequired,
    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onFavorite: PropTypes.func.isRequired,
};

export default GameDetailsComponent;
