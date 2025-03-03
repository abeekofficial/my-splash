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
} from "@mui/material";
import { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { CgUnsplash } from "react-icons/cg";
import MenuIcon from "@mui/icons-material/Menu";
import LightModeIcon from "@mui/icons-material/LightMode";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import { Link, NavLink } from "react-router-dom";

const Navbar = ({ isDarkMode, toggleTheme }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [favoritesCount, setFavoritesCount] = useState(0);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Nav items
  const navItems = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Login", path: "/login" },
    { label: "Contact", path: "/contact" },
  ];

  const navLinkStyle = ({ isActive }) => ({
    textDecoration: "none",
    color: isActive ? "blue" : "inherit",
  });

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2, fontWeight: "bold" }}>
        UnSplash
      </Typography>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <NavLink
              to={item.path}
              style={navLinkStyle}
              onClick={handleDrawerToggle}
            >
              <ListItemButton sx={{ textAlign: "center", width: "100%" }}>
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
        <IconButton
          aria-label="toggle theme"
          onClick={toggleTheme}
          sx={{ color: isDarkMode ? "yellow" : "black" }} // Debug visual cue
        >
          {isDarkMode ? <NightsStayIcon /> : <LightModeIcon />}
        </IconButton>
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: isDarkMode
            ? (theme) => theme.palette.background.paper
            : (theme) => theme.palette.background.default,
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
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

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {navItems
              .filter((item) => item.label !== "Login")
              .map((item) => (
                <NavLink to={item.path} key={item.label} style={navLinkStyle}>
                  <Button sx={{ color: "text.primary" }}>{item.label}</Button>
                </NavLink>
              ))}
          </Box>
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
                  {favoritesCount}
                </Box>
              </IconButton>
            </NavLink>
            <NavLink to="/login" style={{ textDecoration: "none" }}>
              <Button sx={{ color: "text.primary" }}>LOGIN</Button>
            </NavLink>
          </Box>

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
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: "flex", md: "none" },
          "& .MuiDrawer-paper": { width: "60%" },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;
