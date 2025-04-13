import {
  Facebook,
  GitHub,
  Google,
  LockOpenOutlined,
} from "@mui/icons-material";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { purple } from "@mui/material/colors";
import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  //handleSubmit
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("login");
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={10} sx={{ marginTop: 8, padding: 2 }}>
        <Avatar
          sx={{
            textAlign: "center",
            mx: "auto",
            bgcolor: "secondary.main",
            mb: 1,
          }}
        >
          <LockOpenOutlined />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ textAlign: "center" }}>
          Sign in
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            placeholder="Enter your email"
            type="email"
            autoFocus
            required
            fullWidth
            sx={{ mt: 2 }}
          />
          <TextField
            placeholder="Enter your password"
            required
            fullWidth
            sx={{ mt: 2 }}
            type="password"
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Typography
              component={Link}
              to="forgot"
              sx={{ color: "primary.main", textDecoration: "underline" }}
            >
              Forgot password?
            </Typography>
          </Box>
          <Button fullWidth variant="contained" type="submit" sx={{ mt: 2 }}>
            Sign in
          </Button>
          <Typography sx={{ mt: 3, textAlign: "center" }} component="p">
            or sign in with
          </Typography>
          <Box sx={{ mt: 2, textAlign: "center" }}>
            <IconButton
              sx={{
                "&:hover": { color: purple[500], cursor: "pointer" },
                color: "grey",
                mr: 2,
              }}
            >
              <Google fontSize="large" />
            </IconButton>
            <IconButton
              sx={{
                "&:hover": { color: purple[500], cursor: "pointer" },
                color: "grey",
                mx: 2,
              }}
            >
              <GitHub fontSize="large" />
            </IconButton>
            <IconButton
              sx={{
                "&:hover": { color: purple[500], cursor: "pointer" },
                color: "grey",
                ml: 2,
              }}
            >
              <Facebook fontSize="large" />
            </IconButton>
          </Box>
          <Grid container justifyContent="center" gap="8px" sx={{ mt: 2 }}>
            <Typography>Don't have an account?</Typography>
            <Typography
              to="/register"
              component={Link}
              sx={{
                color: "primary.main",
                textDecoration: "underline",
              }}
            >
              Sign Up
            </Typography>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
