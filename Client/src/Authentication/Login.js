import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); //prevents the default behavior of the form submission (reload page)
    setError("");
  
    const payload = {
      username: username,
      password: password,
    };
  
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_BASEURL}/login`, payload);
  
      if (response.data.token) {
        onLogin(response.data.token, response.data.username);
        navigate("../Views/Main");
      } else {
        console.error("Login failed: No token received");
      }
      
    } catch (error) {
      console.error("Login error:", error);
      if (error.response) {
        setError(error.response.data.message || "Something went wrong.");
      } else {
        setError("Unable to connect to the server.");
      }
    }
  };

  return (
    <>
      <h2>Login To Qubit</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="input-group">
          <label htmlFor="Username">Username :</label>
          <input
            id="Username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="auth-input"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="Password">Password :</label>
          <input
            id="Password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="auth-input"
            required
          />
        </div>
        <button type="submit" className="auth-button">
          Login
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </>
  );
};

export default Login;
