"use client";

import "./about.css";

export default function AboutPage() {
  return (
    <div className="about-container">
      <h1>About Us</h1>
      <p className="intro">
        Welcome to <strong>E-Learning</strong> – a modern platform designed to make
        learning simple, engaging, and fun. 🚀
      </p>

      <section className="about-section">
        <h2>Our Mission</h2>
        <p>
          Our mission is to provide high-quality online courses that help
          students and professionals improve their skills. We believe education
          should be accessible, interactive, and rewarding.
        </p>
      </section>

      <section className="about-section">
        <h2>What We Offer</h2>
        <ul>
          <li>📚 A wide range of courses from beginner to advanced.</li>
          <li>🎯 Gamified learning with points, badges, and streaks.</li>
          <li>📊 Progress tracking to monitor your journey.</li>
          <li>👩‍🏫 Expert instructors sharing real-world knowledge.</li>
        </ul>
      </section>

      <section className="about-section">
        <h2>Why Choose Us?</h2>
        <p>
          Unlike traditional e-learning platforms, we make learning interactive
          and fun. With real-time updates, collaborative tools, and rewarding
          progress tracking, you stay motivated every step of the way.
        </p>
      </section>
    </div>
  );
}
