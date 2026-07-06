"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/api";
import "./AddLesson.css";

export default function AddLessonPage() {
  const router = useRouter();
  const params = useParams();
  const courseId = params.id;

  const defaultContentBlock = [
    {
      type: "text",
      data: "Write your content here..."
    }
  ];

  // State for form fields
  const [formData, setFormData] = useState({
    title: "",
    points: 0,
    content: defaultContentBlock,
  });

  // Separate state for the raw JSON in textarea
  const [contentText, setContentText] = useState(JSON.stringify(defaultContentBlock, null, 2));
  const [saving, setSaving] = useState(false);
  const [jsonError, setJsonError] = useState("");

  // Handle title/points input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "points" ? Number(value) : value,
    }));
  };

  // Handle content textarea input
  const handleContentChange = (e) => {
    const value = e.target.value;
    setContentText(value);

    try {
      const parsed = JSON.parse(value);
      setFormData((prev) => ({ ...prev, content: parsed }));
      setJsonError("");
    } catch {
      setJsonError("Invalid JSON format");
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    console.log(courseId);
    const token = localStorage.getItem("token");
    e.preventDefault();
    if (jsonError) return alert("Fix JSON errors before submitting.");
    setSaving(true);
    try {
      const token = localStorage.getItem("token");
      const payload = { ...formData, course: courseId }; // attach courseId
      await api.post(`/lessons/${courseId}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Lesson added successfully!");
      router.push(`/instructor/courses/${courseId}`);
    } catch (err) {
      console.error("Error adding lesson:", err.response?.data || err);
      if (err.response?.status === 401) {
        alert("You are not authorized. Please login again.");
        router.push("/login");
      } else {
        alert("Failed to add lesson.");
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="edit-lesson-container">
        <button className="back-button" onClick={() => router.push(`/instructor/courses/${courseId}`)}>back</button>
      <h1>Add New Lesson</h1>
      
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
          />
        </label>

        <label>
          Content (JSON):
          <textarea
            name="content"
            value={contentText} // bind to raw text
            onChange={handleContentChange}
            rows={10}
            required
          />
          {jsonError && <p className="json-error">{jsonError}</p>}
        </label>

        <button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Add Lesson"}
        </button>
      </form>
    </div>
  );
}
