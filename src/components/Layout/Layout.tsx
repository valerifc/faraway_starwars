import React from "react";
import Nav from "../Nav";
import Universe from "../Universe/Universe";
import { Outlet } from "react-router-dom";
import { Container, useTheme } from "@mui/material";

const Layout = () => {
  const theme = useTheme();
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Nav />
      <div style={{ flex: 1 }}>
        <Universe starColor={theme.palette.primary.main}>
          <Container maxWidth="xl" sx={{ pb: 2 }}>
            <Outlet />
          </Container>
        </Universe>
      </div>
    </div>
  );
};

export default Layout;
