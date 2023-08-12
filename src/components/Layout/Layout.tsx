import React from "react";
import Nav from "../Nav";
import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";

const Layout = () => {
  return (
    <>
      <Nav />
      <Container maxWidth="xl">
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
