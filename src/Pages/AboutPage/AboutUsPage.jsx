import Typography from "@mui/material/Typography";
import { Container, Grid, Box, IconButton } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './About.css'
import fuse from "./fuse.png";
import Contact from "../ContactUs/Contact";
const AboutUsPage = () => {
    return (

        <section className="A-about">
            <div className="A-Context">
                <img src={fuse} alt="" />
                <div className="A-text">
                    <h1>About Us</h1>
                    <p>Game<span className="A-span">Shop</span> is a place where recreational games are stored. Game stores are highly specialized shops selling entertainment products to a targeted niche. Spanning a range of niches, from video games to living room games to role playing games, well-managed game stores can attract a very loyal customer base. Starting a game store business can be an exciting way to achieve your entrepreneurial dreams while doing something that you love.</p>
                </div>
            </div>
        </section>

    );
};

export default AboutUsPage;
