import React, { useState } from "react";
import {
  Alert,
  Avatar,
  Box,
  IconButton,
  Snackbar,
  Typography,
  colors,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { LiaDownloadSolid } from "react-icons/lia";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useGlobalContext } from "../hooks/useGlobalContext";

const Images = ({ image }) => {
  //checking prop
  if (!image) {
    return null;
  }
  const { urls, description, user, links } = image;

  const [openSnackbar, setOpenSnackbar] = useState({
    open: false,
    message: "",
  });

  const { likedImages, dispatch } = useGlobalContext();

  // Add or remove liked image
  const addLikedImage = (image) => {
    const alreadyAddedImage = likedImages.some((img) => img.id === image.id);
    if (!alreadyAddedImage) {
      dispatch({ type: "LIKE", payload: image });
      setOpenSnackbar({ open: true, message: "Image added to favorites!" });
    } else {
      dispatch({ type: "UNLIKE", payload: image.id });
      setOpenSnackbar({ open: true, message: "Image removed from favorites!" });
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        borderRadius: "8px",
        overflow: "hidden",
        "&:hover .hoverIcons": {
          opacity: 1, // Show icons on hover
        },
      }}
    >
      <img
        loading="lazy"
        src={urls.regular}
        alt={description}
        style={{ width: "100%", display: "block", borderRadius: "8px" }}
        onError={(e) => {
          e.target.src = urls.small || urls.thumb; // Fallback image
        }}
      />

      {/* Top Icons (Like Button) */}
      <Box
        className="hoverIcons"
        sx={{
          position: "absolute",
          top: "10px",
          right: "20px",
          display: "flex",
          gap: 1,
          opacity: 0, // Initially hidden
          transition: "opacity 0.3s ease",
        }}
      >
        <IconButton
          onClick={() => addLikedImage(image)}
          sx={{
            backgroundColor: likedImages ? colors.red[500] : colors.grey[200],
            borderRadius: "5px",
            padding: "8px 13px",
            "&:hover": {
              backgroundColor: "#ddd",
            },
          }}
        >
          <FavoriteIcon
            style={{
              fontSize: "18px",
              fontWeight: "600",
              color: colors.grey[400],
            }}
          />
        </IconButton>
      </Box>

      {/* Bottom Icons (User Info and Download Button) */}
      <Box
        className="hoverIcons"
        position={"absolute"}
        bottom={"20px"}
        left={0}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{
          width: "100%",
          padding: "0 20px",
          boxSizing: "border-box",
          opacity: 0, // Initially hidden
          transition: "opacity 0.3s ease",
        }}
      >
        <Box display={"flex"} alignItems={"center"}>
          <Avatar
            sx={{ height: "32px", width: "32px" }}
            src={user?.profile_image?.large}
            alt="User Avatar"
          />
          <Box display={"flex"} flexDirection={"column"} ml={1}>
            <Typography variant="body2" color="white" fontWeight={"500"}>
              {user?.name}
            </Typography>
            {user?.for_hire && (
              <Typography
                color="#c1c1c1"
                variant="caption"
                display={"flex"}
                alignItems={"center"}
              >
                Available for hire{" "}
                <CheckCircleIcon fontSize="12px" sx={{ marginLeft: "3px" }} />
              </Typography>
            )}
          </Box>
        </Box>

        <IconButton
          sx={{
            backgroundColor: "#eee",
            borderRadius: "5px",
            padding: "5px 13px",
            "&:hover": {
              backgroundColor: "#ddd",
            },
          }}
        >
          <a
            href={links?.download + "&force=true"}
            rel="nofollow"
            download
            target="_blank"
          >
            <LiaDownloadSolid
              style={{ fontSize: "22px", fontWeight: "800", color: "#1e1e1e" }}
            />
          </a>
        </IconButton>
      </Box>

      {/* Snackbar for notifications */}
      <Snackbar
        open={openSnackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
      >
        <Alert severity="success" onClose={handleCloseSnackbar}>
          {openSnackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default React.memo(Images);
