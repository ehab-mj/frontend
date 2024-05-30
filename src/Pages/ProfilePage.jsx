import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, List, Grid, } from "@mui/material";
import UserDataComponet from "../Component/UserDataComponet";
import usersContext from "../store/usersContext";
import LoginContext from "../store/loginContext";
import ROUTES from "../routes/ROUTES";
const ProfilePage = () => {
  const navigate = useNavigate();
  const [reset] = useState(true);
  const { login } = useContext(LoginContext);;
  const { UserInfo, setuserInfo, setUserCopy } = useContext(usersContext);
  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const { data } = await axios.get("/users/" + login._id);
        setuserInfo([data]);
        setUserCopy([data]);
      } catch (error) {
      }
    };

    fetchInfo();
  }, [login, setuserInfo, setUserCopy]);

  const handleEdit = (id) => {
    navigate(`${ROUTES.EDITUSER}/${id}`);
  };

  return (
    <Box sx={{
      maxWidth: 1252,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
    }}>
      <Grid item xs={12} md={6}>
        <List reset={reset}>
          {Array.isArray(UserInfo) ? (
            UserInfo.map((user, index) => (
              <UserDataComponet
                key={user._id + index}
                UserDetails={{
                  _id: user._id,
                  first: user.name.first,
                  middle: user.name.middle,
                  last: user.name.last,
                  phone: user.phone,
                  email: user.email,
                  isAdmin: user.isAdmin,
                  isBusiness: user.isBusiness,
                }}
                onEdit={handleEdit}
              />
            ))
          ) : (
            <p>User data is not an array.</p>
          )}
        </List>
      </Grid>
    </Box>
  );
};

export default ProfilePage;
