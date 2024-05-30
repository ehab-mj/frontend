import SearchIcon from "@mui/icons-material/Search";
import Search from "./Search";
import SearchIconWrapper from "./SearchIconWrapper";
import StyledInputBase from "./StyledInputBase";
import usersContext from "../../../store/usersContext";
import { useContext } from "react";
import filterContext from "../../../store/filterContext";
import gameContext from "../../../store/gameContext";
const FilterComponent = () => {
  const { setDataFromServer, CopyGame } = useContext(filterContext);
  const { setuserInfo, userCopy } = useContext(usersContext);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    const gamesSearch = CopyGame.filter((game) => {
      return game.title.includes(inputValue);
    });

    if (!inputValue || inputValue.length < 1) {
      setDataFromServer(CopyGame);
      return;
    }
    setDataFromServer(gamesSearch);
  };

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        onChange={handleInputChange}
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
      />
    </Search>
  );
};

export default FilterComponent;
