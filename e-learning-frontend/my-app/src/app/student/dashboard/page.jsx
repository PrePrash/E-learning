"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
// import "./StudentDashboard.css"; // import the CSS file
import styles from "./StudentDashboard.css";
import api from "@/lib/api";
import StatsHeader from "@/components/StatsHeader";

export default function StudentDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [streaks, setStreaks] = useState(0);
  const [points, setPoints] = useState(0);
  const [badges, setBadges] = useState(3);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || !role) {
      router.push("/auth/login");
    } else {
      setUser({ role, token });
    }
   const fetchPoints = async()=>{
      const userRes = await api.get(`/users/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
setPoints(userRes.data.data.points);
   }
fetchPoints();
    const fetchCourses = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/courses/enrolled", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCourses(res.data.data);
      } catch (err) {
        setError("Failed to fetch courses");
      } finally {
        setLoading(false);
      }
    };

    const fetchStreaks = async () => {
      try {
        await axios.post("http://localhost:5000/api/streaks/update", {}, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const streak = await axios.get("http://localhost:5000/api/streaks", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStreaks(streak.data.data.currentStreak);
      } catch (err) {
        setError("Failed to fetch streaks");
      }
    };

    fetchCourses();
    fetchStreaks();
  }, [router]);

  if (!user) return <p className="loading">Loading...</p>;

  return (
 
    <div className="dashboard">
            <StatsHeader/>

      {/* Courses Section */}
      <div className="courses">
        <h2>📚 My Courses</h2>
        <div className="course-grid">
          {courses.map((course) => (
            <div className="course-card" key={course._id}>
              <img
                src={
                  course.image ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPGGOif2hN0ojHqVg2OZDQgERhHVD70MoaDg&s"
                }
                alt={course.title}
              />
              <div className="course-content">
                <h4>{course.title}</h4>
                <p>{course.description?.slice(0, 100)}...</p>
              </div>
              <button
                className="continue-btn"
                onClick={() => router.push(`/student/dashboard/courses/${course._id}`)}
              >
                Continue Learning →
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


