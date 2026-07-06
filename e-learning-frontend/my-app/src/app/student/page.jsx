"use client";
import { gql } from "@apollo/client";
import { useSubscription } from "@apollo/client/react/hooks";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import "./StudentDashboardPage.css"; // import CSS
import { jwtDecode } from "jwt-decode";
import { Alert, Snackbar } from "@mui/material";
import StatsHeader from "@/components/StatsHeader";
const COURSE_CREATED = gql`
  subscription {
    courseCreated {
      id
      title
      description
    }
  }
`;
export default function StudentDashboardPage() {
  const router = useRouter();
  const [courses, setCourses] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  const { data } = useSubscription(COURSE_CREATED);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (data?.courseCreated) {
      setMessage(`New course created: ${data.courseCreated.title}`);
      setOpen(true);
    }
    const fetchCourses = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/courses");
        setCourses(res.data.data);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.error || "Failed to fetch courses");
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [data]);
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded.id);
      } catch (err) {
        console.error("Invalid token:", err.message);
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, []);

  const Enroll = async (courseId) => {
    try {
      await axios.post(
        `http://localhost:5000/api/courses/${courseId}/enroll`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
         setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course._id === courseId
          ? {
              ...course,
              enrolledStudents: [
                ...(course.enrolledStudents || []),
                user,
              ],
            }
          : course
      )
    );
      alert("Enrolled successfully");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Enrollment failed");
    }
  };

  if (Loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="dashboard">
      <StatsHeader />
      <div className="header">
        <h1>All Courses</h1>
        <button
          className="primary-btn"
          onClick={() => router.push("/student/dashboard")}
        >
          Your Courses
        </button>
      </div>

      <div className="grid">
        {courses.map((course) => (
          <div className="card" key={course._id}>
            <img
              src={
                course.image ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPGGOif2hN0ojHqVg2OZDQgERhHVD70MoaDg&s"
              }
              alt={course.title}
              className="card-img"
            />
            <div className="card-body">
              <h2 className="card-title">{course.title}</h2>
              <p className="card-desc">{course.description}</p>
              <div className="card-info">
                <p>
                  <b>Category:</b> {course.category}
                </p>
                <p>
                  <b>Level:</b> {course.level}
                </p>
                <p>
                  <b>Price:</b> ${course.price}
                </p>
              </div>
            </div>
            <div className="card-actions">
              <button
                className="secondary-btn"
                onClick={() => 
                  { if (course.enrolledStudents?.some((id) => id.toString() === user)) {
        router.push(`/student/dashboard/courses/${course._id}`);
      } else {
        router.push(`student/courses/${course._id}`);
      }
                  }}
              >
                View
              </button>
              <button
                className="primary-btn"
                onClick={() => Enroll(course._id)}
                disabled={
                  !user
                    ? true
                    : course.enrolledStudents?.some(
                        (id) => id.toString() === user.toString()
                      )
                }
              >
                Enroll
              </button>
            </div>
          </div>
        ))}
      </div>
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity="info"
          onClose={() => setOpen(false)}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
