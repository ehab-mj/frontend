import { Container, Grid, Button } from "@mui/material";
import { Link } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";

const Error404 = () => {
    return (
        <Container>
            <Grid container display="flex" justifyContent="center" alignItems="center" spacing={2}>
                <Grid item xs={12} md={8}>
                    <Link to={ROUTES.HOME}>
                        <Button variant="text" sx={{ color: "#1AA5B0", justifyContent: "center", padding: "1rem" }}>
                            Back To Home...
                        </Button>
                    </Link>
                </Grid>
                <Grid item xs={12} md={12} display="flex" justifyContent="center" alignItems="center" height={"40rem"}>
                    <img width="60%" src="/assets/imgs/404.png" alt="" />
                </Grid>
            </Grid>
        </Container>
    );
};

export default Error404;
