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
  CircularProgress,
  Alert,
  Paper,
  MenuItem,
  FormControl,
  InputLabel,
  Select
} from "@mui/material";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student", // default
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Axios automatically stringifies JSON and sets headers
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/auth/register`,
        form
      );

      if (res.status !== 201) {
        throw new Error(res.data?.error || "Registration failed");
      }

      // ✅ Auto-redirect to login after success
      router.push("/auth/login");
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={8}
        sx={{
          width: "100%",
          maxWidth: "450px",
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
          Create Account
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Full Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            margin="normal"
            variant="outlined"
            disabled={loading}
          />
          
          <TextField
            fullWidth
            label="Email Address"
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
            type="password"
            value={form.password}
            onChange={handleChange}
            required
            margin="normal"
            variant="outlined"
            disabled={loading}
          />
          
          <FormControl fullWidth margin="normal">
            <InputLabel>Role</InputLabel>
            <Select
              name="role"
              value={form.role}
              label="Role"
              onChange={handleChange}
              disabled={loading}
            >
              <MenuItem value="student">Student</MenuItem>
              <MenuItem value="instructor">Instructor</MenuItem>
            </Select>
          </FormControl>
          
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
            {loading ? <CircularProgress size={24} /> : "Register"}
          </Button>

          <Typography variant="body2" sx={{ textAlign: "center", color: "text.secondary" }}>
            Already have an account?{" "}
            <Link href="/auth/login" underline="hover">
              Login here
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}