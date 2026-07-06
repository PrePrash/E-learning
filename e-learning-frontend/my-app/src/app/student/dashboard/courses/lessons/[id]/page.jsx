// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import api from "@/lib/api";

// export default function LessonPage() {
//   const {id} = useParams();
//   const [lesson, setLesson] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     console.log("Fetching lesson with ID:", id);
//     async function fetchLesson() {
//       try {
//         const res = await api.get(`/lessons/${id}`);
//         setLesson(res.data.data);
//       } catch (err) {
//         console.error("Error fetching lesson:", err);
//       } finally {
//         setLoading(false);
//       }
//     }
//     if (id) fetchLesson();
//   }, [id]);

//   if (loading) return <p>Loading lesson...</p>;
//   if (!lesson) return <p>Lesson not found.</p>;

//   return (
//     <div style={{ maxWidth: "800px", margin: "20px auto", padding: "20px" }}>
//   <h1>{lesson.title}</h1>
//   <p>Points: {lesson.points}</p>

//   {lesson.content.map((block, idx) => (
//     <div key={idx} style={{ marginBottom: "20px" }}>
//       {/* Text */}
//       {block.type === "text" && <p>{block.data}</p>}

//       {/* List */}
//       {block.type === "list" && (
//         <ul>
//           {Array.isArray(block.data) &&
//             block.data.map((item, i) => <li key={i}>{item}</li>)}
//         </ul>
//       )}

//       {/* Code */}
//       {block.type === "code" && (
//         <pre
//           style={{
//             background: "#f4f4f4",
//             padding: "10px",
//             borderRadius: "5px",
//             overflowX: "auto",
//           }}
//         >
//           {block.data.data} {/* Access the actual code string */}
//         </pre>
//       )}

//       {/* Note */}
//       {block.type === "note" && (
//         <div
//           style={{
//             background: "#ffffe0",
//             padding: "10px",
//             borderRadius: "5px",
//           }}
//         >
//           {block.data}
//         </div>
//       )}

//       {/* Quiz */}
//       {block.type === "quiz" && (
//         <div
//           style={{
//             background: "#e0f7fa",
//             padding: "15px",
//             borderRadius: "8px",
//           }}
//         >
//           <p><strong>Q:</strong> {block.data.question}</p>
//           <ul>
//             {block.data.options.map((opt, i) => (
//               <li key={i}>{opt}</li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   ))}
// </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/api";
import StatsHeader from "@/components/StatsHeader";
import "./LessonPage.css";
import { useUserStats } from "@/context/UserStatsContext";

export default function LessonPage() {
  const { id } = useParams();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [results, setResults] = useState({});
const { setPoints, setBadges } = useUserStats();
  // Fetch lesson
  useEffect(() => {
    if (!id) return;
    async function fetchLesson() {
      try {
        const res = await api.get(`/lessons/${id}`);
        setLesson(res.data.data);
      } catch (err) {
        console.error("Error fetching lesson:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchLesson();
  }, [id]);

  // Handle quiz submit
  const handleQuizSubmit = async (e, block, idx) => {
    e.preventDefault();
    const selected = selectedAnswers[idx];
    if (!selected) return;

    try {
          const token = localStorage.getItem("token");
      const res = await api.post(`/lessons/${id}/check`, {
        question: block.data.question,
        selectedAnswer: selected,
      },
    {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

      setResults((prev) => ({
        ...prev,
        [idx]: res.data.correct ? "✅ Correct! Lesson completed." : "❌ Wrong, try again.",
      }));
     if (res.data.correct) {
      // ✅ fetch updated user profile
      const profileRes = await api.get(`/users/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // ✅ update context points
      setPoints(profileRes.data.data.points);
      setBadges(profileRes.data.data.badges?.length || 0);
    }
    } catch (err) {
      console.error("Error checking answer:", err);
    }
  };

  // Render blocks
  const renderBlock = (block, idx) => {
    switch (block.type) {
      case "text":
        return <p className="text-block">{block.data}</p>;

      case "list":
        return (
          <ul className="list-block">
            {Array.isArray(block.data) &&
              block.data.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        );

      case "code":
        return <pre className="code-block">{block.data.data}</pre>;

      case "note":
        return <div className="note-block">{block.data}</div>;

      case "quiz":
        return (
          <div className="quiz-block">
            <p>
              <strong>Q:</strong> {block.data.question}
            </p>
            <form onSubmit={(e) => handleQuizSubmit(e, block, idx)}>
              {block.data.options.map((opt, i) => (
                <label key={i} style={{ display: "block", margin: "5px 0" }}>
                  <input
                    type="radio"
                    name={`quiz-${idx}`}
                    value={opt}
                    checked={selectedAnswers[idx] === opt}
                    onChange={() =>
                      setSelectedAnswers((prev) => ({ ...prev, [idx]: opt }))
                    }
                  />{" "}
                  {opt}
                </label>
              ))}
              <button type="submit" className="quiz-submit">
                Submit
              </button>
            </form>
            {results[idx] && <p className="quiz-result">{results[idx]}</p>}
          </div>
        );

      default:
        return null;
    }
  };

  if (loading) return <p className="loading">Loading lesson...</p>;
  if (!lesson) return <p className="error">Lesson not found.</p>;

  return (
    <div className="lesson-container">
      <StatsHeader />
      <h1 className="lesson-title">{lesson.title}</h1>
      <p className="lesson-points">Points: {lesson.points}</p>

      {lesson.content.map((block, idx) => (
        <div key={idx} className="lesson-block">
          {renderBlock(block, idx)}
        </div>
      ))}
    </div>
  );
}
