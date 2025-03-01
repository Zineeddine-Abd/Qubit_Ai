import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Auth from "../Authentication/Auth";
import Main from "./Main";
import { jwtDecode } from "jwt-decode";

const App = () => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const handleLogin = (token, username) => {
    setToken(token); // Set token in state
    localStorage.setItem("token", token); // Store token in localStorage
    const decodedToken = jwtDecode(token); // Decode the token
    setUserId(decodedToken.userId); // Set user ID
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token"); // Clear token from localStorage
    setUserId(null);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            token ? (
              <Main token={token} userId={userId} onLogout={handleLogout} />
            ) : (
              <Navigate to="/auth" />
            )
          }
        />
        <Route
          path="/auth"
          element={
            !token ? <Auth onLogin={handleLogin} /> : <Navigate to="/" />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
