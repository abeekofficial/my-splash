import { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  Paper,
  Card,
  CardContent,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Send as SendIcon,
} from "@mui/icons-material";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
    // Show success message
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ mb: 6, textAlign: "center" }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Contact Us
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            sx={{ maxWidth: 700, mx: "auto" }}
          >
            Have questions or feedback? We'd love to hear from you. Get in touch
            with our team.
          </Typography>
          <Divider sx={{ my: 4 }} />
        </Box>

        <Grid container spacing={6}>
          <Grid item xs={12} md={5}>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" gutterBottom>
                Get In Touch
              </Typography>
              <Typography variant="body1" paragraph>
                We're here to help and answer any questions you might have. We
                look forward to hearing from you.
              </Typography>
            </Box>

            <Card sx={{ mb: 3 }}>
              <CardContent sx={{ display: "flex", alignItems: "center" }}>
                <EmailIcon color="primary" sx={{ mr: 2 }} />
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Email
                  </Typography>
                  <Typography variant="body1">
                    info@unsplash-clone.com
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            <Card sx={{ mb: 3 }}>
              <CardContent sx={{ display: "flex", alignItems: "center" }}>
                <PhoneIcon color="primary" sx={{ mr: 2 }} />
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Phone
                  </Typography>
                  <Typography variant="body1">+1 (555) 123-4567</Typography>
                </Box>
              </CardContent>
            </Card>

            <Card>
              <CardContent sx={{ display: "flex", alignItems: "center" }}>
                <LocationIcon color="primary" sx={{ mr: 2 }} />
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Office
                  </Typography>
                  <Typography variant="body1">
                    123 Photography Lane, San Francisco, CA 94107
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={7}>
            <Paper elevation={3} sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom>
                Send Us a Message
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Your Name"
                  name="name"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="subject"
                  label="Subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="message"
                  label="Your Message"
                  id="message"
                  multiline
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  endIcon={<SendIcon />}
                >
                  Send Message
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        <Box sx={{ mt: 8 }}>
          <Paper
            elevation={1}
            sx={{ p: 0, height: "400px", overflow: "hidden" }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0968143067466!2d-122.41941492392031!3d37.77492997599781!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8f4459%3A0xb10ed6d9b5050fa5!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1708532532889!5m2!1sen!2sus"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Map"
            ></iframe>
          </Paper>
        </Box>
      </Container>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Your message has been sent successfully!
        </Alert>
      </Snackbar>
    </>
  );
}
