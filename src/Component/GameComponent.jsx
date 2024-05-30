import DeleteIcon from "@mui/icons-material/Delete";
import ModeIcon from "@mui/icons-material/Mode";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import ROUTES from "../routes/ROUTES";
import { useLocation, useNavigate } from "react-router-dom";
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded';
import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import LoginContext from "../store/loginContext";
import './gameCard.css'
import './gameCard2.css'
import './gameCard3.css'
import './gameCard4.css'
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  CardActionArea,
  CardMedia,
  Divider,
  IconButton,
  Box,
} from "@mui/material";
import { Bounce, toast } from "react-toastify";
import { AppContext } from "../App";
import ShopContext from "../store/ShopContext";
import filterContext from "../store/filterContext";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import axios from "axios";
import GameRating from "../Pages/GameRating/GameRating";
import PauseIcon from '@mui/icons-material/Pause';
import useDataCard from "../hooks/useDataCard";
import gameContext from "../store/gameContext";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import TrailerPlay from "./TrailerPlay";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Button } from "react-bootstrap";
import IsAdmin from "../guard/isAdmin";
const GameComponent = ({
  game,
  title,
  description,
  category,
  rating,
  poster,
  discount,
  price,
  img,
  trailer,
  id,
  onDelete,
  userId,
  onEdit,
  onFav,
  onAddToCart,
  onLike,
  onCart,
  videoUrl,
  productId,
  toggleVideo,
  active,

}) => {
  const login = useContext(LoginContext);
  const to = useLocation();
  const { cart, setCart, library, setLibrary } = useContext(ShopContext);
  const navigate = useNavigate();
  const [cartMessage, setCartMessage] = useState('');
  const GameFav = useDataCard();

  const handleDetails = () => {
    navigate(`${ROUTES.DETAILS}/${id}`);
  }
  const handleDeleteClick = () => {
    onDelete(id);
  };
  const handleFavClick = () => {
    onFav(id);
  };
  const handleCartClick = () => {
    onAddToCart(id);
  };

  const handlePhone = () => {
    toast.success('📞 Ringing...', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  };
  let AdminType = false;
  if (login) {
    if (login._id === userId || login.isAdmin) {
      AdminType = true;
    }
  }
  const handleEditClick = () => {
    onEdit(id);
  };

  //Add
  const handleAddToLibrary = game => {
    setLibrary([...library, game]);
  };
  //Remove
  const handleRemoveFromLibrary = game => {
    setLibrary(library.filter(item => item._id !== game._id));
  };
  const handleAddToBag = game => {
    if (cart.includes(game)) return;
    setCart([...cart, game]);
  };

  const [games, setGames] = useState([]);

  const fetchCards = async () => {
    try {
      const response = await axios.get('/games');
      setGames(response.data);
    } catch (error) {
      console.error('Error fetching games:', error);
    }
  };
  useEffect(() => {
    fetchCards();
  }, []);

  const handleAddToCart = async () => {
    try {
      await axios.post('/cart/add', {
        game,
        cart
      });
      alert('Item added to cart successfully!');
    } catch (error) {
      console.error('Error adding item to cart:', error);
      alert('An error occurred while adding item to cart.');
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => {
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };
  return (
    <div className="col-xl-3 col-lg-4 col-md-6" class="Bg">
      <div className="gameCard">

        <IconButton className={`like ${library.includes(game) ? 'active' : undefined}`} onClick={openPopup}>
          <PlayArrowIcon />
        </IconButton>
        {isOpen && (
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <iframe
              width="560"
              height="315"
              src={trailer}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <div className="popup-overlay" onClick={closePopup}>
              <PauseIcon onClick={closePopup}>Close</PauseIcon>
            </div>
          </div>
        )}

        <img src={img} alt={title} className='img-fluid' onClick={handleDetails} />

        <div className="gameFeature">
          <GameRating rating={rating} />
        </div>

        <div className="gameTitle mt-4 mb-3">{title}</div>

        <div className="gamePrice">
          {discount != 0 && (
            <>
              <span className="discount">
                <i>{discount * 100}%</i>
              </span>

              <span className="prevPrice">$
                {price.toFixed(2)}
              </span>
            </>
          )}

          <span className="currentPrice">
            ${((1 - discount) * price).toFixed(2)}
          </span>
        </div>

        {login && (
          <IconButton className={`addBag ${library.includes(game) ? 'active' : undefined}`} onClick={() => handleCartClick(game)}>
            <ShoppingCartIcon color={onLike ? 'warning' : "inherit"} />
          </IconButton>
        )}

        <Box>
          {((login.isBusiness && AdminType) ||
            to.pathname === ROUTES.MYGAMES) && (
              <IconButton onClick={handleDeleteClick}>
                <DeleteIcon color="error" />
              </IconButton>
            )}
          {((login.isBusiness && AdminType) ||
            to.pathname === ROUTES.MYGAMES) && (
              <IconButton onClick={handleEditClick}>
                <ModeIcon color="warning" />
              </IconButton>
            )}
        </Box>

        <Box>
        </Box>

      </div>
    </div >
  );
};

GameComponent.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  discount: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  img: PropTypes.string,
  trailer: PropTypes.string,
  active: PropTypes.bool.isRequired,
  onDelete: PropTypes.func,
  Info: PropTypes.func,
  onEdit: PropTypes.func,
  onFav: PropTypes.func,
  onAddToCart: PropTypes.func,
  onLike: PropTypes.bool,
  onCart: PropTypes.bool,
};

export default GameComponent;
