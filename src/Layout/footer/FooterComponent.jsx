import { BottomNavigation, Paper, Grid, Typography } from "@mui/material";
import './footer.css'
import BottomButtons from "./BottmoNavigation";
import FacebookIcon from '@mui/icons-material/Facebook';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EjectIcon from '@mui/icons-material/Eject';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HomeIcon from '@mui/icons-material/Home';
import { Button, Container } from "react-bootstrap";
import ROUTES from "../../routes/ROUTES";
import { Link } from "react-router-dom";
const FooterComponent = () => {
  return (
    <Grid container justifyContent="center" alignItems="center">
      <Paper
        elevation={4}
        sx={{ position: "sticky", mt: 3, mb: 0, width: "100%" }}
      >
        <footer class="footer">
          <Link to={ROUTES.HOME} sx={{ display: { xs: 'none', md: 'flex', cursor: 'pointer' }, mr: 1 }} >
            <Typography>
              <span className="Game">Game</span><span className="Shop">Shop</span>

            </Typography>
          </Link>
          <Typography class="footer-text">
            Copyright &copy; 2023 by Ehab | All Right Reserved
          </Typography>

          <div class="footer-iconTop">
            <Button href={ROUTES.HOME}><HomeIcon style={{ color: "#ffff" }}></HomeIcon></Button>
          </div>

          <div class="social-media">
            <ul>
              <Button href="#"><FacebookIcon style={{ color: "#f15000" }}></FacebookIcon></Button>
              {" "}{" "}
              <Button href="#"><LocalPhoneIcon style={{ color: "#f15000" }}></LocalPhoneIcon></Button>
              {" "}{" "}
              <Button href="#"><WhatsAppIcon style={{ color: "#f15000" }}></WhatsAppIcon></Button>
              {" "}{" "}
              <Button href="#"><LocationOnIcon style={{ color: "#f15000" }}></LocationOnIcon></Button>
              {" "}{" "}
            </ul>
          </div>

          <BottomNavigation>
            <BottomButtons />
          </BottomNavigation>
        </footer>
      </Paper>

    </Grid>
  );
};

export default FooterComponent;
