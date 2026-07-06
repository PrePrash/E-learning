"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import api from "@/lib/api"; // your axios instance
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  List,
  ListItem,
  ListItemText,
  Button
} from "@mui/material";

export default function CourseDetails() {
  const router = useRouter();
  const { id } = useParams(); // get course id from URL
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
    const [instructor, setInstructor] = useState(null);

  useEffect(() => {
    console.log("Fetching course with id:", id);
    async function fetchCourse() {
      try {
        const res = await api.get(`/courses/${id}`);
        setCourse(res.data.data); // adjust if backend returns differently
      } catch (err) {
        console.error("Error fetching course:", err);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchCourse();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!course) {
    return (
      <Typography variant="h6" sx={{ textAlign: "center", mt: 5 }}>
        Course not found.
      </Typography>
    );
  }

  return (
    <Box sx={{ maxWidth: "800px", mx: "auto", mt: 4 }}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          {course.title}
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {course.description}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Instructor: {course.instructor ? course.instructor.name : "Loading..."}
        </Typography>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Lessons
        </Typography>
        <List>
          {course.lessons?.map((lesson, idx) => (
            <ListItem
              key={lesson._id}
              sx={{
                borderBottom: "1px solid #eee",
                display: "flex",
                justifyContent: "space-between"
              }}
            >
              <ListItemText primary={`${idx + 1}. ${lesson.title}`} />
              <Button
                size="small"
                variant="outlined"
                onClick={() => {
               alert('You need to enroll to access the lesson. '),
               router.push(`/student`);
                }
                  }
              >
                Open
              </Button>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
}
