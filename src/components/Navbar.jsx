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
  Avatar,
  MenuItem,
  Menu,
} from "@mui/material";
import { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { CgUnsplash } from "react-icons/cg";
import MenuIcon from "@mui/icons-material/Menu";
import LightModeIcon from "@mui/icons-material/LightMode";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import { Link, NavLink } from "react-router-dom";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { useRegister } from "../hooks/useRegister";

const Navbar = ({ isDarkMode, toggleTheme }) => {
  const [state, setState] = useState({ left: false });
  const { likedImages, user } = useGlobalContext();
  console.log("user =>", user);
  const { handleLogout } = useRegister();
  // Nav items
  const navItems = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  // Styles for active and inactive NavLink items
  const navLinkStyle = ({ isActive }) => ({
    textDecoration: isActive ? "underline #2196f3" : "none",
    color: isActive
      ? colors.blue[500]
      : isDarkMode
      ? colors.grey[50]
      : colors.grey[900],
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

  // Avatar dropdown
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
              {user?.displayName || user?.email ? (
                <Box
                  sx={{
                    border: "3px solid #4caf50",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 40,
                    height: 40,
                    ml: 2,
                  }}
                >
                  <IconButton onClick={handleClick} sx={{ p: 0 }}>
                    <Avatar
                      alt={user?.displayName}
                      src={user?.photoURL}
                      sx={{
                        height: 38,
                        width: 38,
                        border: "2px solid #fff",
                      }}
                    />
                  </IconButton>
                </Box>
              ) : (
                <NavLink to="/login" style={{ textDecoration: "none" }}>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      color: "#fff",
                      ml: 2,
                      borderRadius: 5,
                      paddingX: 2,
                      paddingY: 1,
                    }}
                  >
                    Login
                  </Button>
                </NavLink>
              )}
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </Box>

            {/* Mobile Menu Icon */}
            <Box
              sx={{
                display: { xs: "flex", md: "none" },
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%", // Ensure full width
                px: 2, // Optional: add padding for better look
                boxSizing: "border-box", // Keep this to ensure consistent sizing
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
              <Box
                display={"flex"}
                justifyContent={"center"}
                mt={2}
                alignItems={"center"}
              >
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
                {user?.emailVerified ? (
                  <Box
                    sx={{
                      border: "3px solid #4caf50",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 40,
                      height: 40,
                      ml: 2,
                    }}
                  >
                    <IconButton onClick={handleClick}>
                      <Avatar
                        alt={user?.displayName}
                        src={user?.photoURL}
                        sx={{
                          height: 38,
                          width: 38,
                          border: "2px solid #fff",
                        }}
                      />
                    </IconButton>
                  </Box>
                ) : (
                  <NavLink
                    style={{ marginLeft: "auto", ...navLinkStyle }}
                    to="/login"
                  >
                    <Button size="small" sx={{ color: "text.primary" }}>
                      Login
                    </Button>
                  </NavLink>
                )}
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </Box>
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
