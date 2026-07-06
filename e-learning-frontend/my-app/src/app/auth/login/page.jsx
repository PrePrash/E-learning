"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Typography,
  Link,
  InputAdornment,
  IconButton,
  CircularProgress,
  Alert,
  Paper
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAuth } from "@/context/authContext";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
   const { login } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };


 const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    const role = await login({
      email: form.email,
      password: form.password,
    });

    if (role === "student") {
      router.push("/student");
    } else {
      router.push("/instructor/dashboard");
    }
  } catch (err) {
    console.error(err);
    setError("Login failed");
  } finally {
    setLoading(false);
  }
};



  return (
    <Box
      sx={{
        minHeight: "50vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2
      }}
    >
      <Paper
        elevation={8}
        sx={{
          width: "100%",
          maxWidth: "400px",
          p: 4,
          borderRadius: 2
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            mb: 3,
            color: "primary.main"
          }}
        >
          Welcome Back 👋
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            margin="normal"
            variant="outlined"
            disabled={loading}
          />
          
          <TextField
            fullWidth
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={form.password}
            onChange={handleChange}
            required
            margin="normal"
            variant="outlined"
            disabled={loading}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    edge="end"
                    disabled={loading}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          
          <Button
            fullWidth
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{
              py: 1.5,
              mt: 3,
              mb: 2
            }}
          >
            {loading ? <CircularProgress size={24} /> : "Login"}
          </Button>

          <Typography variant="body2" sx={{ textAlign: "center", color: "text.secondary" }}>
            Don't have an account?{" "}
            <Link href="/auth/register" underline="hover">
              Register here
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}