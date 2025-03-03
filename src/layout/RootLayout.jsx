import React from "react";
import { Outlet } from "react-router-dom";
import { Footer, Navbar } from "../components";

const RootLayout = ({ theme, toggleTheme }) => {
  return (
    <>
      <Navbar isDarkMode={theme} toggleTheme={toggleTheme} />
      <Outlet />
      <Footer />
    </>
  );
};

export default RootLayout;
