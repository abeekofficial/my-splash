import React from "react";
import { useGlobalContext } from "../../hooks/useGlobalContext";
import { Box, Container, Typography } from "@mui/material";
import { Images } from "../../components";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const LikedImages = () => {
  const { likedImages } = useGlobalContext();
  console.log(likedImages, "LikedI");

  // Agar likedImages bo'sh bo'lsa, xabar ko'rsatish
  if (likedImages.length === 0) {
    return (
      <Typography variant="h4" align="center" sx={{ mt: 4 }}>
        You didn't choose any images yet.
      </Typography>
    );
  }

  // Rasmlarni chiqarish
  return (
    <Container sx={{ mt: 2 }}>
      <ResponsiveMasonry
        columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
        gutterBreakpoints={{ 350: "12px", 750: "16px", 900: "24px" }}
      >
        <Masonry>
          {likedImages.map((image) => (
            <Images key={image.id} image={image} />
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </Container>
  );
};

export default LikedImages;
