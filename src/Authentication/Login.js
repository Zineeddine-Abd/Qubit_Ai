// Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ onLogin }) => {
  const navigate = useNavigate(); // Add this line
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const payload = {
      username: username,
      password: password,
    };
  
    console.log("Sending payload:", payload);
  
    try {
      const response = await axios.post("http://localhost:5000/login", payload);
  
      console.log("Login response:", response.data);
  
      if (response.data.token) {
        onLogin(response.data.token, response.data.username);
        navigate("../Views/Main");
      } else {
        console.error("Login failed: No token received");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="auth-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="auth-input"
        />
        <button type="submit" className="auth-button">
          Login
        </button>
      </form>
    </>
  );
};

export default Login;
