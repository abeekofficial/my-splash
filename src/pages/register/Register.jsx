// mui icons
import {
  AccountCircle,
  Google,
  LockOpen,
  LockOutlined,
  MailOutline,
  PersonAddOutlined,
} from "@mui/icons-material";

// mui components
import Checkbox from "@mui/material/Checkbox";
import {
  Avatar,
  Box,
  Button,
  Container,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";

// react router dom
import { Form, Link, useActionData, useNavigation } from "react-router-dom";

// hooks
import { useRegister } from "../../hooks/useRegister";
import { useEffect } from "react";

// action
export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = {
    displayName: formData.get("displayName"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };

  // Validation
  if (
    !data.displayName ||
    !data.email ||
    !data.password ||
    !data.confirmPassword
  ) {
    return { error: "All fields are required" };
  }

  if (data.password !== data.confirmPassword) {
    return { error: "Passwords don't match" };
  }

  if (data.password.length < 6) {
    return { error: "Password must be at least 6 characters" };
  }
  return data;
};

const Register = () => {
  const { registerWithGoogle, registerWithEmail } = useRegister();

  const inputData = useActionData();
  console.log("inputdata", inputData);

  useEffect(() => {
    if (inputData) {
      registerWithEmail(
        inputData.displayName,
        inputData.email,
        inputData.password
      );
    }
  }, [inputData]);

  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  return (
    <Box
      sx={{
        backgroundImage:
          'linear-gradient(rgba(0, 0, 0, 0.85), url("https://source.unsplash.com/random/1600x900/?dark,signup")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
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

          {inputData?.error && (
            <Typography color="error" sx={{ mt: 1, textAlign: "center" }}>
              {inputData.error}
            </Typography>
          )}

          <Form method="post" sx={{ mt: 1 }}>
            <TextField
              name="displayName"
              autoComplete="FullName"
              id="fullname"
              label="FullName"
              autoFocus
              required
              fullWidth
              sx={{ mt: 2 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
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
              autoComplete="password"
              id="password"
              label="Password"
              name="password"
              required
              fullWidth
              sx={{ mt: 2 }}
              type="password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <LockOpen />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              autoComplete="confirmPassword"
              id="confirmPassword"
              label="Confirm password"
              name="confirmPassword"
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
            <FormControlLabel
              control={<Checkbox color="primary" required />}
              label="I agree to the terms and conditions"
            />
            <Box
              display="flex"
              justifyContent="space-between"
              gap={2}
              sx={{ mt: 3 }}
            >
              <Button
                onClick={registerWithEmail}
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
                  backgroundColor: "#d81b60",
                  "&:hover": {
                    backgroundColor: "#d81b60",
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
              <Typography>Already have an account?</Typography>
              <Typography
                to="/login"
                component={Link}
                style={{ color: "#1976d2", textDecoration: "none" }}
              >
                Sign In
              </Typography>
            </Grid>
          </Form>
        </Paper>
      </Container>
    </Box>
  );
};

export default Register;
