import React, { useEffect, useState } from "react";
import { Images, Search } from "../../components";
import { useActionData } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { Box, Button, CircularProgress, Container } from "@mui/material";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useGlobalContext } from "../../hooks/useGlobalContext";

// Action
export const action = async ({ request }) => {
  let formData = await request.formData();
  let search = formData.get("search");
  return search;
};

const Home = () => {
  const actiondata = useActionData();
  const [allImages, setAllImages] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  const { likedImages } = useGlobalContext();

  console.log("key", import.meta.env.VITE_UNSPLASH_KEY);
  console.log("url", import.meta.env.VITE_UNSPLASH_URL);

  console.log(
    "API =>",
    `${import.meta.env.VITE_UNSPLASH_URL}?client_id=${
      import.meta.env.VITE_UNSPLASH_KEY
    }&query=${actiondata || "car"}&page=${pageNumber}`
  );

  const { data, loading, error } = useFetch(
    `${import.meta.env.VITE_UNSPLASH_URL}?client_id=${
      import.meta.env.VITE_UNSPLASH_KEY
    }&query=${actiondata || "car"}&page=${pageNumber}`
  );

  useEffect(() => {
    if (data?.results) {
      if (pageNumber === 1) {
        setAllImages(data.results);
      } else {
        setAllImages((prevImages) => [...prevImages, ...data.results]);
      }
    }
  }, [data]);

  useEffect(() => {
    setPageNumber(1); // Reset page number on new search
    setAllImages([]); // Clear old images
  }, [actiondata]);

  return (
    <Container>
      <Box>
        <Search />
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        )}
        {error && (
          <Box sx={{ color: "red", textAlign: "center" }}>
            Something went wrong: {error.message}
            <Button onClick={() => setPageNumber(pageNumber)}>Retry</Button>
          </Box>
        )}
        <ResponsiveMasonry
          columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
          gutterBreakpoints={{ 350: "12px", 750: "16px", 900: "24px" }}
        >
          <Masonry key={allImages.length + pageNumber}>
            {allImages && allImages.length > 0 ? (
              allImages
                .filter((image) => image) // undefined yoki null qiymatlarni olib tashlash
                .map((image) => (
                  <Images
                    image={image}
                    key={image.id}
                    user={image.user}
                    description={image.alt_description}
                    links={image.links}
                    urls={image.urls}
                    likedImage={likedImages.some((img) => img.id === image.id)}
                  />
                ))
            ) : (
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <h1>No Images Available</h1>
              </Box>
            )}
          </Masonry>
        </ResponsiveMasonry>
        <Button
          onClick={() => setPageNumber(pageNumber + 1)}
          variant="outlined"
          fullWidth
          sx={{ mt: 2, mb: 2 }}
          disabled={!data?.results?.length} // Disable if no more results
        >
          Load More
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
