"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";


export default function StudentDashboardPage() {
  const router = useRouter();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
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
  }, []);


  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="dashboard">
      <div className="header">
        <h1>All Courses</h1>
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
                onClick={() => router.push(`auth/login`)}
              >
                View
              </button>
              <button
                className="primary-btn"
                onClick={() =>router.push(`auth/login`)}
              >
                Enroll
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
