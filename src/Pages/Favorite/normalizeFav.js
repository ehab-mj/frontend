const normalizeGames = (games, myId) => {
    if (!games) return null;
    const newGames = games.map((game) => ({
        ...game,
        liked: game.likes.includes(myId),
    }));
    return newGames;
};

export default normalizeGames;
