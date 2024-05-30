import { Divider, Grid, IconButton, Slide } from "@mui/material";
import { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Bounce, Flip, toast } from "react-toastify";
import filterContext from "../../store/filterContext";
import LoginContext from "../../store/loginContext";
import useHandleFavClick from "../../hooks/useHandleFav";
import useDataCard from "../../hooks/useDataCard";
import ROUTES from "../../routes/ROUTES";
import GameComponent from "../../Component/GameComponent";
import useHandleEditGame from "../../hooks/useHandleEdit";
import gameContext from "../../store/gameContext";
import normalizeCart from "./normalizeCart";
import useHandleCartClick from "../../hooks/useHandleCart";
import './cart.css'
import ShopContext from "../../store/ShopContext";
import DeleteIcon from "@mui/icons-material/Delete";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { Box } from "react-bootstrap-icons";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Button } from "react-bootstrap";
const Cart = ({
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
    // const { handleFavClick } = useHandleFavClick();
    const { handleEditClick } = useHandleEditGame();
    const { handleCartClick } = useHandleCartClick();
    const navigate = useNavigate();
    const { login } = useContext(LoginContext);
    const GameFav = useDataCard();
    let { setGamesCopy, setDataFromServer } = useContext(filterContext);
    useEffect(() => {
        const fetchLikes = async () => {
            try {
                await axios.get("/games")
                    .then(({ data }) => {
                        setDataFromServer(normalizeCart(data));
                        setGamesCopy(normalizeCart(data));
                        toast.success("Check you favourites here!", {
                            position: "top-center",
                            autoClose: 1000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                            transition: Slide,
                        });
                    });
            } catch (err) {
                toast.error("There was an error!", {
                    position: "top-center",
                    autoClose: 3000,
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

        fetchLikes();
    }, [setGamesCopy, setDataFromServer]);


    const handleEditGame = (id) => {
        handleEditClick(id);
    };

    const handleFavGame = async (id) => {
        handleFavClick(id);
    };

    const handleFavClick = () => {
        onFav(id);
    };

    // const handleCartGame = async (id) => {
    //     handleCartClick(id);
    // };


    // const handleCartClick = () => {
    //     onAddToCart(id);
    // };

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

    const handleInfoClick = (id) => {
        navigate(`${ROUTES.DETAILS}/${id}`);
    };
    ///

    const [total, setTotal] = useState(0);

    const handleTotalPayment = () => {
        return GameFav.map(game => game.price * (1 - game.discount))
            .reduce((accumulator, currentValue) => accumulator + currentValue, 0).toFixed(2);
    };

    useEffect(() => {
        setTotal(handleTotalPayment());
    }, [GameFav]);

    ///

    const { cart, setCart, library, setLibrary } = useContext(ShopContext);

    const handleRemoveFromBag = game => {
        setCart(cart.filter(item => item._id !== game._id));
    };


    if (!GameFav || !GameFav.length) {
    }

    const handleCartGame = async (id) => {
        handleCartClick(id);
    };
    return (
        <Fragment>
            <div className="container-fluid">
                <div className="row mb-3">
                    <h1>My Cart</h1>
                </div>
            </div>
            <div className="row">
                <div className="table-container">
                    <Table className="table">
                        <Thead>
                            <Tr>
                                <th>Preview</th>
                                <th>Remove</th>
                                <th>Game</th>
                                <th>Price</th>
                                <th>Discount</th>
                                <th>Payment</th>
                            </Tr>
                        </Thead>

                        <Tbody>
                            {GameFav.map(
                                (game, index) =>
                                    GameFav[index].likes.some((id) => id === login._id) && (
                                        <Tr className="shopBagItem">
                                            <Td>
                                                <GameComponent style={{ height: "50px" }}
                                                    id={game._id}
                                                    title={game.title}
                                                    price={game.price}
                                                    description={game.description}
                                                    trailer={game.trailer}
                                                    rating={game.rating}
                                                    discount={game.discount}
                                                    img={game.image.url}
                                                    onDelete={handleDeleteGame}
                                                    Info={handleInfoClick}
                                                    onEdit={handleEditGame}
                                                    onFav={handleFavGame}
                                                    onAddToCart={handleCartGame}
                                                    onLike={game.liked}
                                                    onCart={game.Carted}
                                                />
                                            </Td>
                                            <Td>
                                                {login && (
                                                    <IconButton className={`addBag ${library.includes(game) ? 'active' : undefined}`} onAddToCart={handleCartGame}>
                                                    </IconButton>
                                                )}

                                            </Td>
                                            <Td>{game.title}</Td>
                                            <Td>${game.price.toFixed(2)}</Td>
                                            <Td>{game.discount * 100}%</Td>
                                            <Td>${(game.price * (1 - game.discount)).toFixed(2)}</Td>
                                        </Tr>
                                    )
                            )}
                        </Tbody>

                        <div className="row d-flex justify-content-between mt-5">

                            <div className="col-lg-10 d-flex justify-content-end">

                                <div className="Box-CheckOut">
                                    <button
                                        to={title}
                                        className="CheckOutBtn"
                                    >
                                        Check Out
                                    </button>
                                </div>
                            </div>

                        </div>
                    </Table >
                </div>
            </div>
        </Fragment >
    );
};

export default Cart;
