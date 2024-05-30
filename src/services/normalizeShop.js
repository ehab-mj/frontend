const normalizeShop = (games, myId) => {
    if (!games) return null;
    const normalizedCart = Array.isArray(games)
        ? games.map((game) => ({
            ...game,
            Carted: game.Carts.includes(myId),
        }))
        : {
            ...games,
            Carted: games.Carts.includes(myId),
        };

    return normalizedCart;
};
export default normalizeShop;
