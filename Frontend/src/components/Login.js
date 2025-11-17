import React, { useState } from "react";
import axios from "axios";
import './Login.css';

function Login({ onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Register
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLogin && password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (isLogin) {
      // Login API Call
      try {
        const response = await axios.post("http://localhost:8000/api/token/", {
          username,
          password,
        });
        console.log("Login Successful:", response.data);
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        onLoginSuccess(); // Redirect to Home after successful login
      } catch (error) {
        console.error("Login failed:", error);
        alert("Invalid Username or Password!");
      }
    } else {
      // Register API Call
      try {
        const response = await axios.post("http://localhost:8000/api/register/", {
          username,
          email,
          phone,
          password,
        });
        console.log("Registration Successful:", response.data);
        alert("Registered Successfully! Now Login");
        setIsLogin(true); // Switch back to login
      } catch (error) {
        console.error("Registration failed:", error.response?.data);
        alert(error.response?.data?.error || "Registration failed");
      }
    }
  };

  return (
    <div className="login-page"> {/* ✅ Dark background wrapper */}
      {/* 🔥 Title and Subtitle */}
      <div style={{ textAlign: 'center', color: '#fff', marginTop: '50px' }}>
        <h1 style={{ fontSize: '60px', marginBottom: '10px' }}>ReadWatchFlix</h1>
        <p style={{ fontSize: '20px', color: '#ccc' }}>
          Watch Anime and Read Manga Anytime, Anywhere
        </p>
      </div>

      {/* ✅ Login/Register Container */}
      <div className="login-container">
        <h2>{isLogin ? "Login to ReadWatchFlix" : "Register New Account"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          {!isLogin && (
            <>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </>
          )}

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {!isLogin && (
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          )}

          <button type="submit">{isLogin ? "Login" : "Register"}</button>
        </form>

        {isLogin ? (
          <p className="toggle-text">
            New User?
            <span className="toggle-btn" onClick={() => setIsLogin(false)}> Create Account</span>
          </p>
        ) : (
          <p className="toggle-text">
            Already have an account?
            <span className="toggle-btn" onClick={() => setIsLogin(true)}> Back to Login</span>
          </p>
        )}
      </div>
    </div>
  );
}

export default Login;
