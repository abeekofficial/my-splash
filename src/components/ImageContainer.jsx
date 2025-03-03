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

const ImageContainer = ({
  urls = {},
  description = "Rasm",
  user = {},
  links = {},
}) => {
  const [openSnackbar, setOpenSnackbar] = useState({
    open: false,
    message: "",
  });

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
          opacity: 1, // Hover paytida ikonkalarni ko'rsatish
        },
      }}
    >
      <img
        loading="lazy"
        src={urls.regular}
        alt={description}
        style={{ width: "100%", display: "block", borderRadius: "8px" }}
        onError={(e) => {
          e.target.src = "fallback-rasm.jpg"; // Fallback rasm
        }}
      />

      <Box
        className="hoverIcons"
        sx={{
          position: "absolute",
          top: "10px",
          right: "20px",
          display: "flex",
          gap: 1,
          opacity: 0, // Boshlang'ich holatda yashirish
          transition: "opacity 0.3s ease",
        }}
      >
        <IconButton
          sx={{
            backgroundColor: colors.grey[200],
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
          opacity: 0, // Boshlang'ich holatda yashirish
          transition: "opacity 0.3s ease",
        }}
      >
        <Box display={"flex"} alignItems={"center"}>
          <Avatar
            sx={{ height: "32px", width: "32px" }}
            src={user?.profile_image?.large}
            alt="Foydalanuvchi avatari"
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
                Ishga yollash mumkin{" "}
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

export default React.memo(ImageContainer);
