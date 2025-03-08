import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Container,
  SwipeableDrawer,
  Divider,
  colors,
} from "@mui/material";
import { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { CgUnsplash } from "react-icons/cg";
import MenuIcon from "@mui/icons-material/Menu";
import LightModeIcon from "@mui/icons-material/LightMode";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import { Link, NavLink } from "react-router-dom";
import { useGlobalContext } from "../hooks/useGlobalContext";

const Navbar = ({ isDarkMode, toggleTheme }) => {
  const [state, setState] = useState({ left: false });
  const { likedImages } = useGlobalContext();

  // Nav items
  const navItems = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  // Styles for active and inactive NavLink items
  const navLinkStyle = ({ isActive }) => ({
    textDecoration: isActive ? "underline blue" : "none",
    color: isDarkMode ? colors.grey[50] : colors.grey[900],
    borderRadius: "5px",
    padding: "0 8px",
    width: "100%",
    display: "block",
  });

  // Handle drawer state
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  // Drawer content
  const drawerList = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Typography
        variant="h6"
        sx={{ my: 2, textAlign: "center", fontWeight: "bold" }}
      >
        UnSplash
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} sx={{ width: "100%" }}>
            <NavLink to={item.path} style={navLinkStyle}>
              <ListItemButton
                sx={{
                  width: "100%", // This makes the button fill the width
                  justifyContent: "center", // Center the text horizontally
                }}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            </NavLink>
          </ListItem>
        ))}
      </List>
      <Box
        display={"flex"}
        justifyContent={"center"}
        mt={2}
        alignItems={"center"}
      >
        <IconButton aria-label="toggle theme" onClick={toggleTheme}>
          {isDarkMode ? <NightsStayIcon /> : <LightModeIcon />}
        </IconButton>
        <IconButton sx={{ position: "relative" }}>
          <FavoriteIcon />
          <Box
            sx={{
              width: "20px",
              height: "20px",
              borderRadius: "100%",
              position: "absolute",
              top: "-10px",
              right: "-10px",
              backgroundColor: "#42a5f5",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
              zIndex: 1,
            }}
          >
            {likedImages.length}
          </Box>
        </IconButton>
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: isDarkMode
            ? (theme) => theme.palette.background.paper
            : (theme) => theme.palette.background.default,
        }}
      >
        <Container>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            {/* Logo */}
            <Box
              alignItems={"center"}
              sx={{ display: { md: "flex", xs: "none" } }}
            >
              <Link
                to="/"
                style={{
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <IconButton edge="start" aria-label="logo" size="large">
                  <CgUnsplash />
                </IconButton>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  component={"div"}
                  sx={{ color: "text.primary" }}
                >
                  UnSplash
                </Typography>
              </Link>
            </Box>

            {/* Desktop Navigation */}
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {navItems
                .filter((item) => item.label !== "Login")
                .map((item) => (
                  <NavLink to={item.path} key={item.label} style={navLinkStyle}>
                    <Button sx={{ color: "text.primary" }}>{item.label}</Button>
                  </NavLink>
                ))}
            </Box>

            {/* Icons (theme toggle and favorites) */}
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <IconButton aria-label="toggle theme" onClick={toggleTheme}>
                {isDarkMode ? <NightsStayIcon /> : <LightModeIcon />}
              </IconButton>
              <NavLink to="/likedImages" style={{ textDecoration: "none" }}>
                <IconButton sx={{ position: "relative" }}>
                  <FavoriteIcon />
                  <Box
                    sx={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "100%",
                      position: "absolute",
                      top: "-10px",
                      right: "-10px",
                      backgroundColor: "#42a5f5",
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "12px",
                      zIndex: 1,
                    }}
                  >
                    {likedImages.length}
                  </Box>
                </IconButton>
              </NavLink>
              <NavLink to="/login" style={{ textDecoration: "none" }}>
                <Button sx={{ color: "text.primary" }}>LOGIN</Button>
              </NavLink>
            </Box>

            {/* Mobile Menu Icon */}
            <Box
              sx={{
                display: { xs: "flex", md: "none" },
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <IconButton
                edge="start"
                aria-label="menu"
                size="large"
                onClick={toggleDrawer("left", true)}
              >
                <MenuIcon />
              </IconButton>
              <NavLink to="/login" style={navLinkStyle}>
                <Button sx={{ color: "text.primary" }}>Login</Button>
              </NavLink>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Swipeable Drawer for mobile */}
      <SwipeableDrawer
        anchor="left"
        open={state["left"]}
        onClose={toggleDrawer("left", false)}
        onOpen={toggleDrawer("left", true)}
      >
        {drawerList("left")}
      </SwipeableDrawer>
    </>
  );
};

export default Navbar;
