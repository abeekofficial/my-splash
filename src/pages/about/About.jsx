import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Paper,
} from "@mui/material";

export default function About() {
  return (
    <>
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ mb: 6, textAlign: "center" }}>
          <Typography variant="h3" component="h1" gutterBottom>
            About UnSplash
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            sx={{ maxWidth: 700, mx: "auto" }}
          >
            The internet's source for visuals. Powered by creators everywhere.
          </Typography>
          <Divider sx={{ my: 4 }} />
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              Our Mission
            </Typography>
            <Typography paragraph>
              UnSplash was created to provide high-quality, free images for
              everyone. Our platform enables photographers to share their work
              while giving users access to beautiful imagery for their projects.
            </Typography>
            <Typography paragraph>
              We believe that sharing photography empowers creativity around the
              world. Every photo on UnSplash can be used for free for both
              commercial and personal purposes.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3}>
              <CardMedia
                component="img"
                height="300"
                image="/placeholder.svg?height=300&width=600"
                alt="Unsplash team"
              />
            </Paper>
          </Grid>
        </Grid>

        <Box sx={{ my: 8 }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ textAlign: "center", mb: 4 }}
          >
            Our Values
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: "100%" }}>
                <CardContent>
                  <Typography variant="h5" component="div" gutterBottom>
                    Open
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    We believe in open access to imagery and information. Our
                    platform is built on the principle that photography should
                    be shared freely.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: "100%" }}>
                <CardContent>
                  <Typography variant="h5" component="div" gutterBottom>
                    Community
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    We foster a global community of photographers and creators
                    who share their work and support each other's creative
                    journeys.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: "100%" }}>
                <CardContent>
                  <Typography variant="h5" component="div" gutterBottom>
                    Quality
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    We curate high-quality imagery that inspires. Our platform
                    showcases photography that meets professional standards.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ my: 8 }}>
          <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
            Our Team
          </Typography>
          <Grid container spacing={4}>
            {[1, 2, 3, 4].map((item) => (
              <Grid item xs={12} sm={6} md={3} key={item}>
                <Card>
                  <CardMedia
                    component="img"
                    height="240"
                    image={`/placeholder.svg?height=240&width=240`}
                    alt={`Team member ${item}`}
                  />
                  <CardContent>
                    <Typography variant="h6" component="div">
                      Team Member {item}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {
                        [
                          "Founder",
                          "Lead Developer",
                          "Design Director",
                          "Community Manager",
                        ][item - 1]
                      }
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ my: 8, textAlign: "center" }}>
          <Typography variant="h4" gutterBottom>
            Join Our Community
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{ maxWidth: 700, mx: "auto" }}
          >
            Whether you're a photographer looking to share your work or someone
            in need of beautiful imagery, UnSplash is the platform for you. Join
            our growing community today.
          </Typography>
        </Box>
      </Container>
    </>
  );
}
