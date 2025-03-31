import { useState } from "react";
import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./Home";
import Auth from "../Authentication/Auth";
import Main from "./Main";
import { jwtDecode } from "jwt-decode";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.userId);
      } catch (error) {
        console.error("Invalid token:", error);
        setToken(null);
        localStorage.removeItem("token");
      }
    }
  }, [token]);

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
        <Route path="/" element={<Home />} />

        <Route
          path="/main"
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
          element={!token ? <Auth onLogin={handleLogin} /> : <Navigate to="/main" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
