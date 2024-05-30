import React, { useContext, useRef, useState } from "react";
import PropTypes from "prop-types";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeIcon from "@mui/icons-material/Mode";
import LoginContext from "../store/loginContext";
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankRoundedIcon from '@mui/icons-material/CheckBoxOutlineBlankRounded';
import "../Layout/header/ui/CssHeader/Text.css";
import {
  Box,
  Grid,
  IconButton,
  Typography,
  Container,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import ROUTES from "../routes/ROUTES";
import { upload, useAuth } from "./ui/firebase";
import AuthGuard from "../guard/AuthGuard";
import axios from "axios";
import "./ProPic.css"
import { getToken } from "../services/storageService";
const UserDataComponet = ({ UserDetails, onDelete, onEdit }) => {
  const { login } = useContext(LoginContext);
  const to = useLocation();

  const handleEditClick = () => {
    onEdit(UserDetails._id);
  };

  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    setSelectedFile(event.target.files[0]);
  }

  const [selectedFile, setSelectedFile] = useState(null);
  const [image, setImage] = useState("");
  const inputRef = useRef(null);

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('profilePicture', selectedFile);
      await axios.post('/profile/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Profile picture uploaded successfully!');
    } catch (error) {
      console.error('Error uploading profile picture:', error);
    }
  };

  const handleImageClick = () => {
    inputRef.current.click();
  }
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    setImage(event.target.files[0])
  }
  return (
    <Container mt={4}>
      <Grid container spacing={2} justifyContent="center" style={{ boxShadow: "0px 0px 10px 0px #00000029" }}>
        <Grid item>
          <div>
            <div onClick={handleImageClick}>
              {image ? <img src={URL.createObjectURL(image)} alt="" className="img-display-after" /> : <img src="./assets/user.jpg" alt="" className="img-display-before" />}
              <input
                type="file"
                ref={inputRef}
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
              <button className="image-upload">Upload</button>
            </div>
          </div>
        </Grid>
        <Grid item xs={12}>
          <Typography className="Font"
            fontSize={"1.5rem"}
            fontWeight={500}
          >
            Name:
            {" "} {UserDetails.first} {UserDetails.last} <VerifiedRoundedIcon style={{ marginBottom: "-7px", color: "#f15000" }} />
          </Typography>
          <Typography
            align="start"
            variant="body2"
            color="text.dark"
            style={{ fontSize: "1rem", marginBottom: "4px" }}
          >
            Email: {UserDetails.email}
          </Typography>
          <Typography
            align="start"
            variant="body2"
            color="text.dark"
            style={{ fontSize: "1rem", marginBottom: "4px" }}
          >
            Phone: {UserDetails.phone}
          </Typography>
          <Typography className="Font"
            align="start"
          >
            Admin: {UserDetails.isAdmin ?
              <CheckBoxIcon style={{ marginBottom: "-7px" }} /> :
              <CheckBoxOutlineBlankRoundedIcon style={{ marginBottom: "-7px" }} />}
          </Typography>
          <Typography
            align="start"
            variant="body2"
            color="text.dark"
            style={{ fontSize: "1rem", marginBottom: "4px" }}
          >
            Business: {UserDetails.isBusiness ?
              <CheckBoxIcon style={{ marginBottom: "-7px" }} /> :
              <CheckBoxOutlineBlankRoundedIcon style={{ marginBottom: "-7px" }} />}
          </Typography>
        </Grid>
        <Box
        >
          {/* {((login && login.isAdmin) ||
            to.pathname === ROUTES.MYCARDS) && (
              <IconButton onClick={handleDeleteClick}
                edge="end"
                aria-label="delete"
              >
                <DeleteIcon />
              </IconButton>
            )} */}
          <IconButton edge="end" aria-label="edit" onClick={handleEditClick}>
            <ModeIcon />
          </IconButton>
        </Box>
      </Grid >
    </Container >
  );

};

UserDataComponet.propTypes = {
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  UserDetails: PropTypes.shape({
    _id: PropTypes.string,
    first: PropTypes.string.isRequired,
    middle: PropTypes.string,
    last: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    email: PropTypes.string,
    isAdmin: PropTypes.bool,
    isBusiness: PropTypes.bool,
  }).isRequired,
};

export default UserDataComponet;
