const normalizeCart = (games, myId) => {
    if (!games) return null;
    const newGames = games.map((game) => ({
        ...game,
        Carted: game.Carts.includes(myId),
    }));
    return newGames;
};

export default normalizeCart;
