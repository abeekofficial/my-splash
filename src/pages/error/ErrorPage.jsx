import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  return (
    <Box sx={{ textAlign: "center", mt: 4 }}>
      <Typography variant="h4" color="error">
        Oops! Something went wrong.
      </Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        {error.message || "An unexpected error occurred."}
      </Typography>
      <Button href="/" variant="contained" sx={{ mt: 3 }}>
        Go Back Home
      </Button>
    </Box>
  );
};

export default ErrorPage;
