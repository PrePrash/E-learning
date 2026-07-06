"use client";


  

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/api"; // Axios instance with interceptor for token
import "./LessonEdit.css";

export default function EditLessonPage() {
  const { id } = useParams();
  const router = useRouter();

  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [jsonError, setJsonError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    points: 0,
    content: [],
  });

  // Fetch existing lesson
  useEffect(() => {
    if (!id) return;

    const fetchLesson = async () => {
      try {
        const res = await api.get(`/lessons/${id}`); // token automatically in headers
        const data = res.data.data;

        setLesson(data);
        setFormData({
          title: data.title || "",
          points: data.points || 0,
          content: data.content || [],
        });
      } catch (err) {
        console.error("Error fetching lesson:", err.response?.data || err);
        if (err.response?.status === 401) {
          alert("You are not authorized. Please login.");
          router.push("/login");
        } else {
          setError("Failed to load lesson.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "points" ? Number(value) : value,
    }));
  };

  // Handle JSON content safely
  const handleContentChange = (e) => {
    try {
      const parsed = JSON.parse(e.target.value);
      if (!Array.isArray(parsed)) throw new Error("Content must be an array");
      setFormData((prev) => ({ ...prev, content: parsed }));
      setJsonError("");
    } catch (err) {
      setJsonError("Invalid JSON format or content is not an array");
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    const token = localStorage.getItem("token");
     const cleanedData = {
      ...formData,
      content: formData.content.map(({ _id, ...rest }) => rest),
    };
    e.preventDefault();
    if (jsonError) return alert("Fix JSON errors before submitting.");
    setSaving(true);

    try {
      
    await api.put(`/lessons/${id}`, cleanedData, {
  headers: { Authorization: `Bearer ${token}` },
}); 
      alert("Lesson updated successfully!");
      router.push(`/instructor/courses/lessons/${id}`);
    } catch (err) {
      console.error("Error updating lesson:", err.response?.data || err);
      if (err.response?.status === 401) {
        alert("You are not authorized. Please login again.");
        router.push("/auth/login");
      } else if (err.response?.status === 400) {
        alert("Validation error: " + JSON.stringify(err.response.data));
      } else {
        alert("Failed to update lesson.");
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="loading">Loading lesson...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!lesson) return <p className="error">Lesson not found.</p>;

  return (
    <div className="edit-lesson-container">
      <h1>Edit Lesson</h1>
      <form onSubmit={handleSubmit} className="edit-lesson-form">
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Points:
          <input
            type="number"
            name="points"
            value={formData.points}
            onChange={handleChange}
            required
            min={1}
          />
        </label>

        <label>
          Content (JSON):
          <textarea
            name="content"
            value={JSON.stringify(formData.content, null, 2)}
            onChange={handleContentChange}
            rows={10}
            required
          />
          {jsonError && <p className="json-error">{jsonError}</p>}
        </label>

        <button type="submit" disabled={saving || !!jsonError}>
          {saving ? "Saving..." : "Update Lesson"}
        </button>
      </form>
    </div>
  );
}
