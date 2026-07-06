"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/api";
import "./courseDetails.css";

export default function CourseDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch course data
  useEffect(() => {
    async function fetchCourse() {
      try {
        const res = await api.get(`/courses/${id}`);
        setCourse(res.data.data);
      } catch (err) {
        console.error("Error fetching course:", err);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchCourse();
  }, [id]);

  // Open lesson logic
  const handleOpen = (lessonId) => {
    router.push(`lessons/${lessonId}`); // navigate to lesson page
  };

  // Delete lesson logic
  const handleDelete = async (lessonId) => {
    if (!confirm("Are you sure you want to delete this lesson?")) return;
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/lessons/${lessonId}`, {
  headers: { Authorization: `Bearer ${token}` },
      }); 
      setCourse((prev) => ({
        ...prev,
        lessons: prev.lessons.filter((lesson) => lesson._id !== lessonId),
      }));
    } catch (err) {
      console.error("Error deleting lesson:", err);
      alert("Failed to delete lesson.");
    }
  };

  if (loading) return <div className="loading">Loading course details...</div>;
  if (!course) return <div className="error">Course not found.</div>;
 const totalEnrolled = course.enrolledStudents?.length || 0;
  return (
    <div className="course-details">
              <button className="back-button" onClick={() => router.push(`/instructor/dashboard`)}>back</button>

      <div className="course-info">
        <h1>{course.title}</h1>
        <p>{course.description}</p>
        <p className="instructor">
          Instructor: {course.instructor ? course.instructor.name : "Loading..."}
        </p>
          <p className="total-enrolled">
          Total Students Enrolled: <strong>{totalEnrolled}</strong>
        </p>
      </div>

      <div className="lessons-section">
        <h2>Lessons</h2>
        <button onClick={() => router.push(`/instructor/courses/${id}/add-lesson`)}>Add-Lesson</button>
        {course.lessons?.length === 0 ? (
          <p className="empty-state">No lessons added yet.</p>
        ) : (
          <ul className="lessons-list">
            {course.lessons.map((lesson, idx) => (
              <li key={lesson._id} className="lesson-item">
                <span>{idx + 1}. {lesson.title}</span>
                <div className="lesson-buttons">
                  <button onClick={() => handleOpen(lesson._id)}>Open</button>
                  <button onClick={() => handleDelete(lesson._id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
