"use client";
import { createContext, useContext, useEffect, useState } from "react";
import api from "@/lib/api";

const UserStatsContext = createContext();

export function UserStatsProvider({ children }) {
  const [points, setPoints] = useState(0);
  const [streaks, setStreaks] = useState(0);
 const [badges, setBadges] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const fetchStats = async () => {
      try {
        const userRes = await api.get(`/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPoints(userRes.data.data.points);

        await api.post(`/streaks/update`, {}, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const streakRes = await api.get(`/streaks`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStreaks(streakRes.data.data.currentStreak);

        // ✅ Example: badges count from user profile
          setBadges(userRes.data.data.badges?.length || 0);

      } catch (err) {
        console.error("Failed to fetch stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <UserStatsContext.Provider value={{ points, streaks, badges, loading , setPoints,
        setStreaks,
        setBadges,}}>
      {children}
    </UserStatsContext.Provider>
  );
}

export const useUserStats = () => useContext(UserStatsContext);
