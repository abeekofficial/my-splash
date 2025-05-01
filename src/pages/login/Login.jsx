// mui icons
import {
  Google,
  LockOpenOutlined,
  LockOutlined,
  MailOutline,
} from "@mui/icons-material";

// mui components
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
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

// react-router-dom
import { Form, Link } from "react-router-dom";

// hooks
import { useRegister } from "../../hooks/useRegister";
import { useLogin } from "../../hooks/useLogin";
import { useState } from "react";

// action
export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  // Validation
  if (!data.email || !data.password) {
    return { error: "All fields are required" };
  }

  if (data.password.length < 6) {
    return { error: "Password must be at least 6 characters" };
  }
  return data;
};

const Login = () => {
  const { registerWithGoogle } = useRegister();
  const { loginWithEmail } = useLogin();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    // Client-side validation
    if (!email || !password) {
      toast.error("All fields are required");
      setIsSubmitting(false);
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      setIsSubmitting(false);
      return;
    }

    await loginWithEmail(email, password);
    setIsSubmitting(false);
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={10} sx={{ marginTop: 8, padding: 4 }}>
        <Avatar
          sx={{
            textAlign: "center",
            mx: "auto",
            bgcolor: "secondary.main",
            mb: 2,
          }}
        >
          <LockOpenOutlined />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ textAlign: "center" }}>
          Sign in
        </Typography>

        <Form
          method="post"
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 3 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <MailOutline />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
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
              mt: 2,
            }}
          >
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Typography
              component={Link}
              to="/forgot-password"
              sx={{ color: "primary.main", textDecoration: "none" }}
            >
              Forgot password?
            </Typography>
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isSubmitting}
            sx={{ mt: 3, mb: 2, py: 1.5 }}
          >
            {isSubmitting ? "Signing In..." : "Sign In"}
          </Button>
          <Button
            fullWidth
            startIcon={<Google />}
            variant="contained"
            sx={{
              backgroundColor: "#d81b60",
              "&:hover": {
                backgroundColor: "#d81b60",
                cursor: "pointer",
              },
              mb: 2,
              py: 1.5,
            }}
            onClick={registerWithGoogle}
          >
            Sign in with Google
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              <Typography variant="body2">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  style={{ color: "#1976d2", textDecoration: "none" }}
                >
                  Sign Up
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Form>
      </Paper>
    </Container>
  );
};

export default Login;
