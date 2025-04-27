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

  // Here you would typically call your registration API
  // For example:
  // try {
  //   await registerUser(data);
  //   return redirect("/");
  // } catch (error) {
  //   return { error: error.message };
  // }

  return data;
};

const Register = () => {
  const inputData = useActionData();
  const navigation = useNavigation();
  const { registerWithGoogle } = useRegister();

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
              placeholder="Fullname"
              name="displayName"
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
              placeholder="Email"
              name="email"
              required
              fullWidth
              sx={{ mt: 2 }}
              type="email"
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
              placeholder="Confirm password"
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
          </Form>
        </Paper>
      </Container>
    </Box>
  );
};

export default Register;
