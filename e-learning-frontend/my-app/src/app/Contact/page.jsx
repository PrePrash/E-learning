"use client";

import { useState } from "react";
import "./contact.css"; // we'll create this file for styles

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setSubmitted(true);
  };

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <p className="subtitle">
        Have questions or feedback? We'd love to hear from you!
      </p>

      {submitted ? (
        <p className="thank-you">✅ Thank you! We'll get back to you soon.</p>
      ) : (
        <form className="contact-form" onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
          />

          <label>Message</label>
          <textarea
            name="message"
            rows="5"
            required
            value={formData.message}
            onChange={handleChange}
          />

          <button type="submit">Send Message</button>
        </form>
      )}
    </div>
  );
}
