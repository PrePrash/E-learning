"use client";

import {
  Typography,
  Button,
  Stack,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/authContext";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const stagger = {
  visible: {
    transition: { staggerChildren: 0.3, delayChildren: 0.2 },
  },
};

// Reusable card style
const cardStyle = {
  p: 4,
  borderRadius: 3,
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(10px)",
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
  textAlign: "center",
  maxWidth: 300,
  mx: "auto",
  border: "1px solid rgba(255, 255, 255, 0.1)",
};

export default function HomePage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [mounted, setMounted] = useState(false);
  const { user } = useAuth();
  const [redirect, setRedirect] = useState("/student");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "student") {
      setRedirect("/instructor");
    }
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,rgb(120, 136, 214) 0%,rgb(175, 145, 206) 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 2,
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(175, 17, 17, 0.15) 0%, transparent 40%),
            radial-gradient(circle at 75% 75%, rgba(58, 3, 3, 0.1) 0%, transparent 40%)
          `,
          zIndex: 0,
        },
      }}
    >
      {/* Animated background */}
      <Box
        component={motion.div}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 120, ease: "linear" }}
        sx={{
          position: "absolute",
          top: "-50%",
          right: "-50%",
          width: "100%",
          height: "100%",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)",
          zIndex: 0,
        }}
      />

      <Box sx={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 1400, mx: "auto", px: { xs: 2, sm: 4 } }}>
        <Stack
          alignItems="center"
          justifyContent="center"
          spacing={4}
          component={motion.div}
          variants={stagger}
          initial="hidden"
          animate="visible"
          sx={{ textAlign: "center", py: 8, color: "white" }}
        >
          {/* Main Header */}
          <motion.div variants={fadeIn}>
            <Typography
              variant={isMobile ? "h3" : "h2"}
              fontWeight="bold"
              sx={{
                mb: 2,
                background: "linear-gradient(45deg, #fff, #e0e7ff)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                textShadow: "0 4px 8px rgba(0,0,0,0.1)",
                fontSize: { xs: "2.5rem", md: "3.75rem" },
              }}
            >
              Welcome to E-Learning Platform
            </Typography>
          </motion.div>

          <motion.div variants={fadeIn}>
            <Typography
              variant={isMobile ? "h6" : "h5"}
              sx={{ maxWidth: 600, mb: 3, opacity: 0.9, fontWeight: 300 }}
            >
              Discover a new way to learn, teach, and grow with our
              comprehensive online courses. 🚀
            </Typography>
          </motion.div>

          {/* Buttons */}
          <motion.div variants={fadeIn}>
            <Stack direction={isMobile ? "column" : "row"} spacing={2} sx={{ mt: 3 }}>
              {!user ? (
                <>
                  <Button
                    variant="contained"
                    component={Link}
                    href="/auth/login"
                    size="large"
                    sx={{
                      py: 1.5,
                      px: 4,
                      borderRadius: 3,
                      fontWeight: "bold",
                      fontSize: "1.1rem",
                      background: "linear-gradient(45deg, #4facfe 0%, #00f2fe 100%)",
                      boxShadow: "0 6px 20px rgba(79, 172, 254, 0.4)",
                      "&:hover": {
                        boxShadow: "0 8px 25px rgba(79, 172, 254, 0.6)",
                        transform: "translateY(-3px)",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    Login
                  </Button>
                  <Button
                    variant="outlined"
                    component={Link}
                    href="/auth/register"
                    size="large"
                    sx={{
                      py: 1.5,
                      px: 4,
                      borderRadius: 3,
                      fontWeight: "bold",
                      fontSize: "1.1rem",
                      borderWidth: 2,
                      borderColor: "rgba(255, 255, 255, 0.7)",
                      color: "white",
                      "&:hover": {
                        borderColor: "white",
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        transform: "translateY(-3px)",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    Register
                  </Button>
                </>
              ) : (
                <Button
                  variant="contained"
                  component={Link}
                  href={redirect}
                  size="large"
                  sx={{
                    py: 1.5,
                    px: 4,
                    borderRadius: 3,
                    fontWeight: "bold",
                    fontSize: "1.1rem",
                    background: "linear-gradient(45deg, #4facfe 0%, #00f2fe 100%)",
                    boxShadow: "0 6px 20px rgba(79, 172, 254, 0.4)",
                    "&:hover": {
                      boxShadow: "0 8px 25px rgba(79, 172, 254, 0.6)",
                      transform: "translateY(-3px)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  Browse Courses
                </Button>
              )}
            </Stack>
          </motion.div>

          {/* Features */}
          <motion.div variants={fadeIn}>
            <Stack direction={isMobile ? "column" : "row"} spacing={4} sx={{ mt: 8 }}>
              {[
                { icon: "📚", title: "100+ Courses", desc: "Expertly crafted content" },
                { icon: "👨‍🏫", title: "Expert Instructors", desc: "Learn from the best" },
                { icon: "🎯", title: "Flexible Learning", desc: "At your own pace" },
              ].map((feature, i) => (
                <Box key={i} component={motion.div} whileHover={{ y: -10, transition: { duration: 0.3 } }} sx={cardStyle}>
                  <Typography variant="h3" sx={{ mb: 2, fontSize: "3rem" }}>{feature.icon}</Typography>
                  <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>{feature.title}</Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>{feature.desc}</Typography>
                </Box>
              ))}
            </Stack>
          </motion.div>

          {/* Testimonials */}
          <motion.div variants={fadeIn}>
            <Box sx={{ mt: 12, textAlign: "center" }}>
              <Typography variant={isMobile ? "h4" : "h3"} fontWeight="bold" sx={{ mb: 4 }}>
                What Our Students Say
              </Typography>
              <Stack direction={isMobile ? "column" : "row"} spacing={4} justifyContent="center" alignItems="stretch">
                {[
                  { name: "Alice Johnson", review: "This platform completely transformed how I learn. Courses are structured perfectly!", avatar: "🧑‍🎓" },
                  { name: "Mark Smith", review: "The instructors are fantastic! Highly recommend for anyone looking to upskill.", avatar: "👨‍🎓" },
                  { name: "Sophia Lee", review: "Flexible learning at my own pace and the content is top-notch.", avatar: "👩‍🎓" },
                ].map((t, i) => (
                  <Box key={i} component={motion.div} whileHover={{ y: -5, transition: { duration: 0.3 } }} sx={cardStyle}>
                    <Typography variant="h3" sx={{ mb: 2 }}>{t.avatar}</Typography>
                    <Typography variant="body1" sx={{ mb: 2, fontStyle: "italic" }}>"{t.review}"</Typography>
                    <Typography variant="subtitle2" fontWeight="bold">- {t.name}</Typography>
                  </Box>
                ))}
              </Stack>
            </Box>
          </motion.div>

          {/* Popular Courses */}
          <motion.div variants={fadeIn}>
            <Box sx={{ mt: 12, textAlign: "center" }}>
              <Typography variant={isMobile ? "h4" : "h3"} fontWeight="bold" sx={{ mb: 4 }}>
                Popular Courses
              </Typography>
              <Stack direction={isMobile ? "column" : "row"} spacing={4} justifyContent="center" alignItems="stretch">
                {[
                  { title: "React for Beginners", students: 1200 },
                  { title: "Advanced Node.js", students: 950 },
                  { title: "GraphQL Masterclass", students: 800 },
                ].map((course, i) => (
                  <Box key={i} component={motion.div} whileHover={{ scale: 1.05, transition: { duration: 0.3 } }} sx={cardStyle}>
                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>{course.title}</Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>{course.students} students enrolled</Typography>
                  </Box>
                ))}
              </Stack>
            </Box>
          </motion.div>

                  </Stack>
      </Box>
    </Box>
  );
}
