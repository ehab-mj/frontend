import React, { useContext, useEffect } from 'react';
import './shopBagItem.css';
import { AppContext } from '../App';
import ShopContext from '../store/ShopContext';
import useDataCard from '../hooks/useDataCard';
import LoginContext from '../store/loginContext';
import normalizeCart from '../Pages/Cart/normalizeCart';
import { Bounce, Slide, toast } from 'react-toastify';
import filterContext from '../store/filterContext';
import DeleteIcon from "@mui/icons-material/Delete";
import axios from 'axios';
function ShopBagItem({
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
    onLike,
    onCart,
    videoUrl,
    productId,
    toggleVideo,
    active,
    index,
}) {
    const { cart, setCart } = useContext(ShopContext);
    const { login } = useContext(LoginContext);
    const GameFav = useDataCard();
    let { setGamesCopy, setDataFromServer } = useContext(filterContext);
    // Remove From  Bag
    const handleRemoveFromBag = game => {
        setCart(cart.filter(item => item._id !== game._id));
    };

    useEffect(() => {
        const fetchLikes = async () => {
            try {
                await axios.get("/games/cart/")
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

    if (!GameFav || !GameFav.length) {
    }



    return (
        <>
        </>
    )
}

export default ShopBagItem;
