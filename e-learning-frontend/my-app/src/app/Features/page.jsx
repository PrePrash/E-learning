"use client";

import { Container, Typography, Grid, Card, CardContent } from "@mui/material";
import { School, EmojiEvents, Timeline, NotificationsActive } from "@mui/icons-material";

const features = [
  {
    title: "Interactive Courses",
    description: "Engaging lessons with videos, quizzes, and assignments.",
    icon: <School fontSize="large" color="primary" />,
  },
  {
    title: "Gamified Learning",
    description: "Earn points, badges, and streaks to stay motivated.",
    icon: <EmojiEvents fontSize="large" color="secondary" />,
  },
  {
    title: "Track Your Progress",
    description: "Monitor your performance and learning journey easily.",
    icon: <Timeline fontSize="large" sx={{ color: "green" }} />,
  },
  {
    title: "Real-time Updates",
    description: "Stay updated when instructors add new courses or lessons.",
    icon: <NotificationsActive fontSize="large" sx={{ color: "orange" }} />,
  },
];

export default function FeaturesPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography
        variant="h3"
        align="center"
        fontWeight={700}
        gutterBottom
        sx={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        Platform Features
      </Typography>
      <Typography
        variant="h6"
        align="center"
        color="text.secondary"
        sx={{ mb: 6 }}
      >
        Everything you need to make learning fun and effective
      </Typography>

      <Grid container spacing={4}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              elevation={4}
              sx={{
                borderRadius: 3,
                textAlign: "center",
                py: 4,
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                },
              }}
            >
              <CardContent>
                {feature.icon}
                <Typography variant="h6" fontWeight={600} sx={{ mt: 2 }}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
