"use client";

import { UserStatsProvider } from "@/context/UserStatsContext";



export default function DashboardLayout({ children }) {
  return (
    <UserStatsProvider>
      {children}
    </UserStatsProvider>
  );
}
