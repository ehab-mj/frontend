const normalizeFav = (games, myId) => {
  if (!games) return null;
  const normalizedGames = Array.isArray(games)
    ? games.map((game) => ({
      ...game,
      liked: game.likes.includes(myId),
    }))
    : {
      ...games,
      liked: games.likes.includes(myId),
    };

  return normalizedGames;
};
export default normalizeFav;
