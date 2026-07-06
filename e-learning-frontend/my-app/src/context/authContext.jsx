"use client";

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // ✅ Load user from localStorage when app starts
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token && role) {
      setUser({ token, role });
    }
  }, []);

  // ✅ Login function
  const login = async ({ email, password }) => {
    const res = await axios.post("http://localhost:5000/api/auth/login", {
      email,
      password,
    });

    const { token, role } = res.data.data;

    setUser({ token, role });
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);

    return role; 
  };

  // ✅ Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/"; // redirect to home
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);
