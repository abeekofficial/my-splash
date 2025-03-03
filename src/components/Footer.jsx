import React from "react";
import { Box, Container, Typography, Link, IconButton } from "@mui/material";
import { GitHub, LinkedIn, Twitter } from "@mui/icons-material";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[900],
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography variant="body2" color="text.secondary">
              © {currentYear}{" "}
              <Link
                href="https://abeek.netlify.app"
                color="inherit"
                underline="hover"
                target="_blank"
                rel="noopener noreferrer"
              >
                Abeek.netlify.app
              </Link>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Created by Abeek
            </Typography>
          </Box>

          <Box sx={{ mt: { xs: 2, sm: 0 } }}>
            <IconButton
              aria-label="github"
              size="small"
              color="inherit"
              href="https://github.com/abeekofficial"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHub fontSize="small" />
            </IconButton>
            <IconButton
              aria-label="linkedin"
              size="small"
              color="inherit"
              href="https://linkedin.com/in/abeekofficial"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedIn fontSize="small" />
            </IconButton>
            <IconButton
              aria-label="twitter"
              size="small"
              color="inherit"
              href="https://twitter.com/abeekofficial"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
