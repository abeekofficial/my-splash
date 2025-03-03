import React, { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { About, Contact, Home, LikedImages } from "./pages/index";
import RootLayout from "./layout/RootLayout";
import "./App.css";
import { CssBaseline } from "@mui/material";

//action
import { action as HomeAction } from "./pages/home/Home";

function App() {
  const [theme, setTheme] = useState(false); // false = light, true = dark

  const AppTheme = createTheme({
    palette: {
      mode: theme ? "dark" : "light",
      text: {
        primary: theme ? "#fff" : "#000", // Text color based on theme
      },
    },
  });

  // Log the current theme whenever it changes
  useEffect(() => {
    console.log(`Current theme: ${theme ? "dark" : "light"}`);
  }, [theme]);

  // toggleTheme
  const toggleTheme = () => {
    setTheme((prevTheme) => !prevTheme);
  };

  const routes = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout theme={theme} toggleTheme={toggleTheme} />,
      children: [
        { index: true, element: <Home />, action: HomeAction },
        { path: "about", element: <About /> },
        { path: "likedImages", element: <LikedImages /> },
        { path: "contact", element: <Contact /> },
      ],
    },
  ]);

  return (
    <ThemeProvider theme={AppTheme}>
      <CssBaseline />
      <RouterProvider router={routes} />
    </ThemeProvider>
  );
}

export default App;
