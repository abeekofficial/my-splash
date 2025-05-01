import React, { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import { useGlobalContext } from "./hooks/useGlobalContext";
// Pages
import {
  About,
  Contact,
  ErrorPage,
  Home,
  ImageInfo,
  LikedImages,
  Login,
  Register,
} from "./pages/index";

// Layouts
import RootLayout from "./layout/RootLayout";
import "./App.css";
import { CssBaseline } from "@mui/material";

// Context
import { GlobalContextProvider } from "./context/GlobalContext"; // GlobalContextProvider ni import qilish

// Actions
import { action as HomeAction } from "./pages/home/Home";
import { action as RegisterAction } from "./pages/register/Register";
import { action as LoginAction } from "./pages/login/Login";

// components
import { ProtectedRoutes } from "./components";

// firebase
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";

// Components

function App() {
  const [theme, setTheme] = useState(false); // false = light, true = dark

  // user
  const { user, dispatch } = useGlobalContext();

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

  // Auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({ type: "LOGIN", payload: user });
      } else {
        dispatch({ type: "LOGOUT" });
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoutes user={user}>
          <RootLayout theme={theme} toggleTheme={toggleTheme} />
        </ProtectedRoutes>
      ),
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <Home />, action: HomeAction },
        { path: "about", element: <About /> },
        { path: "likedImages", element: <LikedImages /> },
        { path: "contact", element: <Contact /> },
        { path: "imageInfo/:id", element: <ImageInfo /> },
      ],
    },
    {
      path: "/login",
      element: user ? <Navigate to="/" /> : <Login />,
      action: LoginAction,
    },
    {
      path: "/register",
      element: user ? <Navigate to="/" /> : <Register />,
      action: RegisterAction,
    },
  ]);

  return (
    <GlobalContextProvider>
      <ThemeProvider theme={AppTheme}>
        <CssBaseline />
        <RouterProvider router={routes} />
      </ThemeProvider>
    </GlobalContextProvider>
  );
}

export default App;
