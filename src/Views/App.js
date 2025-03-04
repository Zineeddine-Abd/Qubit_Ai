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
    setToken(token);
    localStorage.setItem("token", token);
    const decodedToken = jwtDecode(token);
    setUserId(decodedToken.userId);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
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
