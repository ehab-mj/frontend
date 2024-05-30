import { Link, Typography } from "@mui/material";


const CopyrightComponent = (props) => {
  return (
    <Typography
      variant="body2"
      color="#1AA5B0"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/ehab-mj">
        Ehab Magdoub
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export default CopyrightComponent;
