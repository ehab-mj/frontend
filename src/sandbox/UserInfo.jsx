import { useState, useEffect, useContext, Fragment } from "react";
import axios from "axios";
import { Box, List, Grid, Typography, Button, } from "@mui/material";
import normalizeUser from "../services/normalizeUser";
import { Bounce, Flip, toast } from "react-toastify";
import usersContext from "../store/usersContext";
import DeleteIcon from "@mui/icons-material/Delete";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import LoginContext from "../store/loginContext";

const UserInfo = () => {
    const { UserInfo, setuserInfo, setUserCopy } = useContext(usersContext);

    const handleDelete = async (id) => {
        const isCheck = window.confirm(
            "Are you sure you want to delete this user?"
        );

        if (!isCheck) {
            return;
        }
        try {
            await axios.delete("/users/" + id).then(({ data }) => {
                setuserInfo((cUsers) => {
                    return cUsers.filter((user) => user._id !== id);
                });
            });
            toast.success("You have deleted the user!", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Flip,
            });
        } catch (error) {
            toast.warn("Only Admin or LoggedIn Owner can Delete!", {
                position: "top-right",
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

    useEffect(() => {
        const fetchUsersInfo = async () => {
            try {
                const { data } = await axios.get("/users");
                setuserInfo(normalizeUser(data));
                setUserCopy(normalizeUser(data));
            } catch (error) {
            }
        };

        fetchUsersInfo();
    }, [setuserInfo, setUserCopy]);

    if (!Array.isArray(UserInfo)) {
        return <div>Users information pending...</div>;
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Full Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>User Info</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {UserInfo.map((user) => (
                        <TableRow key={user._id}>
                            <TableCell>{user.name.first + " " + user.name.last}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.isAdmin ? "isAdmin" : "Not-Admin"}</TableCell>
                            <TableCell>{user.isBusiness ? "isBusiness" : "Not-Business"}</TableCell>
                            <TableCell>
                                <Button onClick={() => handleDelete(user._id)}>  <DeleteIcon sx={{ color: "red" }} /></Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default UserInfo;
