"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/api";
import { jwtDecode } from "jwt-decode";
import "./CourseDetails.css"; // Import CSS
import StatsHeader from "@/components/StatsHeader";

export default function CourseDetails() {
  const router = useRouter();
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState({});
  const [studentId, setStudentId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setStudentId(decoded.id);
    }
  }, []);

  useEffect(() => {
    async function fetchCourse() {
      try {
        const res = await api.get(`/courses/${id}`);
        setCourse(res.data.data);

        if (studentId) {
          const progRes = await api.get(`/progress/${studentId}/${id}`);
          const progMap = {};
          progRes.data.data.forEach((p) => {
            if (p.lesson) progMap[p.lesson._id] = p.completed;
          });
          setProgress(progMap);
        }
      } catch (err) {
        console.error("Error fetching course:", err);
      } finally {
        setLoading(false);
      }
    }

    if (id && studentId) fetchCourse();
  }, [id, studentId]);

  const handleToggle = async (lessonId, checked) => {
    try {
      setProgress((prev) => ({ ...prev, [lessonId]: checked }));
      await api.post("/progress", { studentId, lessonId, completed: checked });
    } catch (err) {
      console.error("Error updating progress:", err);
    }
  };

  if (loading) return <div className="loading">Loading course...</div>;
  if (!course) return <div className="error">Course not found.</div>;

  return (
    <div className="course-container">
            <StatsHeader/>
      {/* Course Info */}
      <div className="course-card">
        <h1 className="course-title">{course.title}</h1>
        <p className="course-description">{course.description}</p>
        <p className="course-instructor">
          Instructor: {course.instructor ? course.instructor.name : "Loading..."}
        </p>
      </div>

      {/* Lessons */}
      <div className="lessons-card">
        <h2>Lessons</h2>
        <ul className="lessons-list">
          {course.lessons?.map((lesson, idx) => (
            <li key={lesson._id} className="lesson-item">
              <label className="lesson-left">
                <input
                  type="checkbox"
                  checked={!!progress[lesson._id]}
                  onChange={(e) => handleToggle(lesson._id, e.target.checked)
                  }
                  disabled
                />
                <span>{idx + 1}. {lesson.title}</span>
              </label>
              <button
                className="lesson-open-btn"
                onClick={() => router.push(`lessons/${lesson._id}`)}
              >
                Open
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
