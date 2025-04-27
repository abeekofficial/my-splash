// mui icons
import {
  Google,
  LockOpenOutlined,
  LockOutlined,
  MailLockOutlined,
  MailOutline,
} from "@mui/icons-material";

// mui components
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

// react-router-dom
import { Link, useNavigation } from "react-router-dom";

// hooks
import { useRegister } from "../../hooks/useRegister";

const Login = () => {
  const navigation = useNavigation();
  const { registerWithGoogle } = useRegister();

  const isSubmitting = navigation.state === "submitting";

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
            placeholder="Email"
            type="email"
            autoFocus
            required
            fullWidth
            sx={{ mt: 2 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <MailOutline />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            placeholder="Password"
            required
            fullWidth
            sx={{ mt: 2 }}
            type="password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <LockOutlined />
                </InputAdornment>
              ),
            }}
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
          <Box
            display="flex"
            justifyContent="space-between"
            gap={2}
            sx={{ mt: 2 }}
          >
            <Button
              fullWidth
              variant="contained"
              type="submit"
              disabled={isSubmitting}
              sx={{
                py: 1.5,
                fontWeight: "bold",
              }}
            >
              {isSubmitting ? "Signing Up..." : "Sign Up"}
            </Button>
            <Button
              fullWidth
              startIcon={<Google />}
              variant="contained"
              sx={{
                backgroundColor: "#7b1fa2",
                "&:hover": {
                  backgroundColor: "#9c27b0",
                  cursor: "pointer",
                },
                color: "white",
                mr: 2,
              }}
              onClick={registerWithGoogle}
            >
              Google
            </Button>
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
