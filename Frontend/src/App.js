import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import AnimeList from "./components/AnimeList";
import Reading from "./components/Reading";
import VotePoll from "./components/VotePoll";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import PaymentPage from "./components/Payment";
import ThankYou from "./components/ThankYou";
import DetailsPage from "./components/DetailsPage"; // ✅ Detail Page
import SearchResult from "./components/SearchResult"; // ✅ Search Page
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("accessToken"));

  const handleLoginSuccess = () => {
    setIsAuthenticated(true); // ✅ User authenticated
  };

  return (
    <>
      {/* Show Navbar only if user is logged in */}
      {isAuthenticated && <Navbar />}

      <Routes>
        {/* Login Page */}
        <Route 
          path="/" 
          element={isAuthenticated ? <Navigate to="/home" /> : <Login onLoginSuccess={handleLoginSuccess} />} 
        />

        {/* Register Page */}
        <Route path="/register" element={<Register />} />

        
        <Route path="/vote" element={<VotePoll />} />

        {/* Home Page */}
        <Route 
          path="/home" 
          element={isAuthenticated ? <Home /> : <Navigate to="/" />} 
        />

        {/* Anime List Page */}
        <Route 
          path="/anime" 
          element={isAuthenticated ? <AnimeList /> : <Navigate to="/" />} 
        />

        {/* Reading Section Page */}
        <Route 
          path="/reading" 
          element={isAuthenticated ? <Reading /> : <Navigate to="/" />} 
        />

        {/* Dynamic Details Page for Anime/Manga */}
        <Route 
          path="/details/:id" 
          element={isAuthenticated ? <DetailsPage /> : <Navigate to="/" />} 
        />

        {/* ✅ Search Results Page */}
        <Route 
          path="/search" 
          element={isAuthenticated ? <SearchResult /> : <Navigate to="/" />} 
        />

        {/* PayPal Payment Page */}
        <Route 
          path="/payment" 
          element={isAuthenticated ? <PaymentPage /> : <Navigate to="/" />} 
        />

        {/* Thank You Page after Payment */}
        <Route 
          path="/thank-you" 
          element={isAuthenticated ? <ThankYou /> : <Navigate to="/" />} 
        />

        {/* Catch-All Redirect to Login */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
