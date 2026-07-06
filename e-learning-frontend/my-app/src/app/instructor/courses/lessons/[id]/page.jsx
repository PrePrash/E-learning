// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import api from "@/lib/api";
// import StatsHeader from "@/components/StatsHeader";
// import "./LessonPage.css";
// import { useUserStats } from "@/context/UserStatsContext";

// export default function LessonPage() {
//   const { id } = useParams();
//   const [lesson, setLesson] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [selectedAnswers, setSelectedAnswers] = useState({});
//   // Fetch lesson
//   useEffect(() => {
//     if (!id) return;
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
//     fetchLesson();
//   }, [id]);
//   const renderBlock = (block, idx) => {
//     switch (block.type) {
//       case "text":
//         return <p className="text-block">{block.data}</p>;

//       case "list":
//         return (
//           <ul className="list-block">
//             {Array.isArray(block.data) &&
//               block.data.map((item, i) => <li key={i}>{item}</li>)}
//           </ul>
//         );

//       case "code":
//         return <pre className="code-block">{block.data.data}</pre>;

//       case "note":
//         return <div className="note-block">{block.data}</div>;

//       case "quiz":
//         return (
//           <div className="quiz-block">
//             <p>
//               <strong>Q:</strong> {block.data.question}
//             </p>
//             <form onSubmit={(e) => handleQuizSubmit(e, block, idx)}>
//               {block.data.options.map((opt, i) => (
//                 <label key={i} style={{ display: "block", margin: "5px 0" }}>
//                   <input
//                     type="radio"
//                     name={`quiz-${idx}`}
//                     value={opt}
//                     checked={selectedAnswers[idx] === opt}
//                     onChange={() =>
//                       setSelectedAnswers((prev) => ({ ...prev, [idx]: opt }))
//                     }
//                   />{" "}
//                   {opt}
//                 </label>
//               ))}
//               <button type="submit" className="quiz-submit">
//                 Submit
//               </button>
//             </form>
//           </div>
//         );

//       default:
//         return null;
//     }
//   };

//   if (loading) return <p className="loading">Loading lesson...</p>;
//   if (!lesson) return <p className="error">Lesson not found.</p>;

//   return (
//     <div className="lesson-container">
//       <h1 className="lesson-title">{lesson.title}</h1>
//       <p className="lesson-points">Points: {lesson.points}</p>

//       {lesson.content.map((block, idx) => (
//         <div key={idx} className="lesson-block">
//           {renderBlock(block, idx)}
//         </div>
//       ))}
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/api";
import "./LessonPage.css";

export default function LessonPage() {
  const { id } = useParams();
  const router = useRouter();

  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch lesson details
  useEffect(() => {
    if (!id) return;

    async function fetchLesson() {
      try {
        const res = await api.get(`/lessons/${id}`);
        setLesson(res.data.data);
      } catch (err) {
        console.error("Error fetching lesson:", err);
        setError("Failed to load lesson.");
      } finally {
        setLoading(false);
      }
    }

    fetchLesson();
  }, [id]);

  // Render lesson blocks
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
            <ul>
              {block.data.options.map((opt, i) => (
                <li key={i}>{opt}</li>
              ))}
            </ul>
          </div>
        );

      default:
        return null;
    }
  };

  if (loading) return <p className="loading">Loading lesson...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!lesson) return <p className="error">Lesson not found.</p>;

  return (
    <div className="lesson-container">
      <div className="lesson-header">
        <h1 className="lesson-title">{lesson.title}</h1>
        <div className="lesson-actions">
          <button onClick={() => router.push(`edit/${id}`)}>
            Edit
          </button>
        </div>
      </div>
      <p className="lesson-points">Points: {lesson.points}</p>

      {lesson.content.map((block, idx) => (
        <div key={idx} className="lesson-block">
          {renderBlock(block, idx)}
        </div>
      ))}
    </div>
  );
}
