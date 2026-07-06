"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/api";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import js from "react-syntax-highlighter/dist/esm/languages/hljs/javascript";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

import "./LessonPage.css";

// register languages you want to highlight
SyntaxHighlighter.registerLanguage("javascript", js);

export default function LessonPage() {
  const {id} = useParams();
  const router = useRouter();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchLesson() {
      try {
        const res = await api.get(`/lessons/${id}`);
        console.log("API response:", res.data);
        const lessonData = res.data.data || res.data.lesson || null;

        if (!lessonData) {
          setError("Lesson not found");
          return;
        }

        setLesson(lessonData);
      } catch (err) {
        console.error("Error fetching lesson:", err);
        setError("Failed to load lesson");
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchLesson();
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="not-found">{error}</div>;

  const renderContentBlock = (block, idx) => {
    if (!block) return null;

    switch (block.type) {
      case "text":
        return <p key={idx}>{block.data}</p>;

      case "list":
        return (
          <ul key={idx}>
            {block.data?.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        );

      case "code":
        return (
          <div key={idx} className="code-block">
            <SyntaxHighlighter language={block.data?.language || "text"} style={docco}>
              {block.data?.data || ""}
            </SyntaxHighlighter>
          </div>
        );

      case "note":
        return (
          <div key={idx} className="note-block">
            {block.data}
          </div>
        );

      case "quiz":
        return (
          <div key={idx} className="quiz-block">
            <strong>Q: {block.data?.question}</strong>
            <ul>
              {block.data?.options?.map((opt, i) => (
                <li key={i}>{opt}</li>
              ))}
            </ul>
            <em>Answer: {block.data?.answer}</em>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="lesson-container">
      <h1>{lesson?.title || "Untitled Lesson"}</h1>
      {lesson?.content?.length > 0 ? (
        lesson.content.map((block, idx) => renderContentBlock(block, idx))
      ) : (
        <p>No content available for this lesson.</p>
      )}
      <button className="back-btn" onClick={() => router.back()}>
        Back to Course
      </button>
    </div>
  );
}
