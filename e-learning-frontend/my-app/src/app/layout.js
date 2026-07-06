"use client";
import "./globals.css";
import { CssBaseline } from "@mui/material";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { AuthProvider } from "@/context/authContext";
import { ApolloProvider } from "@apollo/client";
import { client } from "@/lib/apolloClient"; // ⬅️ make sure you created this

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CssBaseline />
        <ApolloProvider client={client}>
          <AuthProvider>
            <Navbar />
            {children}
            <Footer />
          </AuthProvider>
        </ApolloProvider>
      </body>
    </html>
  );
}
