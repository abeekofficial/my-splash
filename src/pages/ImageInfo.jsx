import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { Box, Button, CircularProgress, IconButton } from "@mui/material";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import useFetch from "../hooks/useFetch";
import { GlobalContext } from "../context/GlobalContext";

const ImageInfo = () => {
  const { id } = useParams();
  const url = `${import.meta.env.VITE_UNSPLASH_URL_ID}${id}?client_id=${
    import.meta.env.VITE_UNSPLASH_KEY
  }`;
  const { data, loading, error } = useFetch(url);
  const { isExpanded, toggleImageSize } = useContext(GlobalContext); // isExpanded va toggleImageSize ni olish

  console.log("data => ", data);
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      )}
      {error && (
        <Box sx={{ color: "red", textAlign: "center" }}>
          Something went wrong: {error}
          <Button href="/" variant="contained" sx={{ mt: 3 }}>
            Go Back Home
          </Button>
        </Box>
      )}
      {data?.urls?.full && (
        <Box position="relative">
          <img
            src={data.urls.full}
            alt={data.description || "Image"}
            style={{
              maxWidth: isExpanded ? "100%" : "80%",
              maxHeight: isExpanded ? "100vh" : "80vh",
              objectFit: "contain",
              cursor: "pointer",
              transition: "all 0.3s ease",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={toggleImageSize}
          />
          <IconButton
            onClick={toggleImageSize}
            sx={{
              display: isExpanded ? "flex" : "none",
              position: "absolute",
              top: 10,
              right: 10,
              backgroundColor: "rgba(255, 255, 255, 0.7)",
            }}
          >
            <CloseFullscreenIcon />
          </IconButton>
        </Box>
      )}
      {!data && !loading && (
        <Box sx={{ textAlign: "center" }}>
          No data found for this image.
          <Button href="/" variant="contained" sx={{ mt: 3 }}>
            Go Back Home
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ImageInfo;
