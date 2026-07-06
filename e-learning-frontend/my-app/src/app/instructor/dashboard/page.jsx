"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import "./instructorDashboard.css";
import { jwtDecode } from "jwt-decode";
import { useSubscription } from "@apollo/client";
import { gql } from "graphql-tag";
import { Alert, Snackbar } from "@mui/material";

const NEW_STUDENT_ENROLLED = gql`
  subscription newStudentEnrolled($instructorId: ID!) {
    newStudentEnrolled(instructorId: $instructorId) {
      message
      timestamp
    }
  }
`;
export default function StudentDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [newStudentMessage, setNewStudentMessage] = useState("");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "instructor") {
      router.push("/auth/login");
    } else {
      setUser({ role, token });
    }
    setNewStudentMessage(jwtDecode(token).id);
    const fetchCourses = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/courses/instructor",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setCourses(res.data.data);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.error || "Failed to fetch courses");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [router]);
  const { data } = useSubscription(NEW_STUDENT_ENROLLED, {
    variables: { instructorId: newStudentMessage },
    skip: !user,
  });
  useEffect(() => {
    if (data?.newStudentEnrolled) {
      setMessage(data.newStudentEnrolled.message);
      setOpen(true);
    }
  }, [data]);

  if (!user) return <div className="loading">Loading...</div>;

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Welcome to Your Dashboard</h1>
      </header>

      <section className="courses-section">
        <div className="courses-header">
          <h2>📚 My Courses</h2>
          <button
            className="create-course-btn"
            onClick={() => router.push("/instructor/courses/create")}
          >
            + Create New Course
          </button>
        </div>

        {loading ? (
          <div className="loading">Loading courses...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : courses.length === 0 ? (
          <div className="empty-state">
            You have no courses yet. Create your first one!
          </div>
        ) : (
          <div className="courses-grid">
            {courses.map((course) => (
              <div className="course-card" key={course._id}>
                <div className="card-image-wrapper">
                  <img
                    src={
                      course.image ||
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPGGOif2hN0ojHqVg2OZDQgERhHVD70MoaDg&s"
                    }
                    alt={course.title}
                    className="course-image"
                  />
                </div>
                <div className="course-content">
                  <h3>{course.title}</h3>
                  <p>{course.description?.slice(0, 100)}...</p>
                  <p>
                    <strong>Category:</strong> {course.category || "N/A"}
                  </p>
                  <p>
                    <strong>Level:</strong> {course.level}
                  </p>
                </div>
                <button
                  className="view-btn"
                  onClick={() =>
                    router.push(`/instructor/courses/${course._id}`)
                  }
                >
                  View
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
