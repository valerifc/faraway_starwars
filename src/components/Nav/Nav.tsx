import React from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import RocketIcon from "@mui/icons-material/Rocket";
import Typography from "@mui/material/Typography";
import { webRoutes } from "../../constants/webRoutes";
import { useLocation, useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <RocketIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            STAR WARS
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={() => navigate(`/${webRoutes.heroes}`)}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Heroes
            </Button>
            <Button
              onClick={() =>
                !location.pathname.match(`/${webRoutes.hero}/`) &&
                navigate(`/${webRoutes.hero}/${1}`)
              }
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Hero
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Nav;
