import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { Footer, Navbar } from "../components";
import { GlobalContext } from "../context/GlobalContext";

const RootLayout = ({ toggleTheme, theme }) => {
  const { isExpanded } = useContext(GlobalContext); // isExpanded holatini olish

  return (
    <>
      {!isExpanded && <Navbar isDarkMode={theme} toggleTheme={toggleTheme} />}
      <Outlet />
      {!isExpanded && <Footer />}
    </>
  );
};

export default RootLayout;
