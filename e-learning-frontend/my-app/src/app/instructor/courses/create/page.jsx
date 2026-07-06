"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import "./CreateCourse.css";

export default function CreateCoursePage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    level: "Beginner",
    price: "",
    image: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const token = localStorage.getItem("token");
    const payload = {
      ...form,
      price: Number(form.price),
      level: form.level.toLowerCase(),
    };
    console.log("Submitting course:", JSON.stringify(payload, null, 2));
    const res = await api.post("/courses", payload, {
      headers: { Authorization: `Bearer ${token}` },
    });

   router.push("/instructor/dashboard");

  } catch (err) {
    console.error(" Error creating course:", err.response?.data || err.message);
    alert("Failed to create course. Please try again.");
  }
};


  return (
    <div className="create-course-container">
      <h2>Create a New Course</h2>
      {error && <p className="error">{error}</p>}
      <form className="create-course-form" onSubmit={handleSubmit}>
        <label>
          Title
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Description
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Category
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
          />
        </label>

        <label>
          Level
          <select name="level" value={form.level} onChange={handleChange}>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </label>

        <label>
          Price
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
          />
        </label>

        <label>
          Image URL
          <input
            type="text"
            name="image"
            value={form.image}
            onChange={handleChange}
          />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Course"}
        </button>
      </form>
    </div>
  );
}
