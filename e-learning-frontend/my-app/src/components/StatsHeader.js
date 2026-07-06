"use client";
import { useUserStats } from "@/context/UserStatsContext";

export default function StatsHeader() {
  const { points, streaks, badges, loading } = useUserStats();

  if (loading) return <p style={{ textAlign: "center", margin: "20px 0" }}>Loading stats...</p>;

  const styles = {
    stats: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "30px",
      gap: "15px",
      flexWrap: "wrap", // makes it responsive
    },
    card: {
      flex: 1,
      minWidth: "180px",
      background: "#fff",
      padding: "20px",
      textAlign: "center",
      borderRadius: "12px",
      boxShadow: "0px 4px 10px rgba(0,0,0,0.08)",
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
    },
    cardHover: {
      transform: "translateY(-3px)",
      boxShadow: "0px 6px 14px rgba(0,0,0,0.12)",
    },
    title: {
      marginBottom: "8px",
      fontSize: "16px",
      color: "#444",
    },
    highlight: {
      fontSize: "28px",
      fontWeight: "bold",
      color: "#2a7ae4",
    },
  };

  return (
    <div style={styles.stats}>
      <div
        style={styles.card}
        onMouseEnter={(e) =>
          Object.assign(e.currentTarget.style, styles.cardHover)
        }
        onMouseLeave={(e) =>
          Object.assign(e.currentTarget.style, styles.card)
        }
      >
        <h3 style={styles.title}>My Points</h3>
        <p style={styles.highlight}>{points}</p>
      </div>

      <div
        style={styles.card}
        onMouseEnter={(e) =>
          Object.assign(e.currentTarget.style, styles.cardHover)
        }
        onMouseLeave={(e) =>
          Object.assign(e.currentTarget.style, styles.card)
        }
      >
        <h3 style={styles.title}>Current Streak</h3>
        <p style={styles.highlight}>🔥 {streaks} days</p>
      </div>

      <div
        style={styles.card}
        onMouseEnter={(e) =>
          Object.assign(e.currentTarget.style, styles.cardHover)
        }
        onMouseLeave={(e) =>
          Object.assign(e.currentTarget.style, styles.card)
        }
      >
        <h3 style={styles.title}>Badges</h3>
        <p style={styles.highlight}>🏅 {badges}</p>
      </div>
    </div>
  );
}
