import { useContext, useMemo } from "react";
import filterContext from "../store/filterContext";
import LoginContext from "../store/loginContext"
import normalizeFav from "../services/normalizeLike";
import gameContext from "../store/gameContext";
;
const useDataCard = () => {
  const { login } = useContext(LoginContext);
  const { dataFromServer } = useContext(filterContext);
  const GameFav = useMemo(() => {
    return normalizeFav(dataFromServer, login ? login._id : undefined);
  }, [dataFromServer, login]);

  return GameFav;
};

export default useDataCard;
