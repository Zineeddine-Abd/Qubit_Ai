import React, { useState } from "react";
import axios from "axios";

const SignUp = ({ onToggle }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      await axios.post("http://localhost:5000/signup", {
        username,
        email,
        password,
      });
      onToggle();
      
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Registration failed. Please try again.");
      }
    }
  };

  return (
    <>
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="auth-form">
      <div className="input-group">
          <label htmlFor="Username">Username :</label>
          <input
            id="Username"
            type="text"
            placeholder="Ex. LocknWait"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="auth-input"
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="Email">Email :</label>
          <input
            id="Email"
            type="email"
            placeholder="Ex. user@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

        <div className="input-group">
          <label htmlFor="ConfirmPassword">Confirm Password :</label>
          <input
            id="ConfirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="auth-input"
            required
          />
        </div>
        <button type="submit" className="auth-button">
          Register
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </>
  );
};

export default SignUp;
