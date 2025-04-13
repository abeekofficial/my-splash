// mui icons
import {
  Facebook,
  GitHub,
  Google,
  PersonAddOutlined,
} from "@mui/icons-material";

//mui components
import Checkbox from "@mui/material/Checkbox";
import {
  Avatar,
  Box,
  Button,
  Container,
  FormControlLabel,
  Grid,
  IconButton,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";

// mui colors
import { purple } from "@mui/material/colors";
// react router dom
import { Link } from "react-router-dom";

// hooks
import { useRegister } from "../../hooks/useRegister";

const Register = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("register");
  };

  const { registerWithGoogle } = useRegister();
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
          <PersonAddOutlined />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ textAlign: "center" }}>
          Sign Up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            placeholder="Enter your fullname"
            autoFocus
            required
            fullWidth
            sx={{ mt: 2 }}
          />
          <TextField
            placeholder="Enter your email"
            required
            fullWidth
            sx={{ mt: 2 }}
            type="email"
          />
          <TextField
            placeholder="Enter your password"
            required
            fullWidth
            sx={{ mt: 2 }}
            type="password"
          />
          <TextField
            placeholder="Confirm your password"
            required
            fullWidth
            sx={{ mt: 2 }}
            type="password"
          />
          <FormControlLabel
            control={<Checkbox color="primary" />}
            label="I agree to the terms and conditions"
          />
          <Button fullWidth variant="contained" type="submit" sx={{ mt: 2 }}>
            Sign Up
          </Button>
          <Typography sx={{ mt: 3, textAlign: "center" }} component="p">
            or sign up with
          </Typography>
          <Box sx={{ mt: 2, textAlign: "center" }}>
            <IconButton
              sx={{
                "&:hover": { color: purple[500], cursor: "pointer" },
                color: "grey",
                mr: 2,
              }}
              onClick={registerWithGoogle}
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
            <Typography>Already have an account?</Typography>
            <Typography
              to="/login"
              component={Link}
              sx={{
                color: "primary.main",
                textDecoration: "underline",
              }}
            >
              Sign In
            </Typography>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;
