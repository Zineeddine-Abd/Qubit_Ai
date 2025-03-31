import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Login from "./Login";
import Signup from "./SignUp";
import "./Auth.css";
import homeIcon from '../assets/home.png'
import qubitLogo from '../assets/Logo_No_BG.png'

const Auth = ({ onLogin }) => {
  const location = useLocation();
  const formType = location.state?.formType || "login";

  const [isRegistering, setIsRegistering] = useState(formType === "signup");

  return (
    <div className="auth-container">

      <Link to="/">
        <img src={homeIcon} alt='home' className="home-button"/>
      </Link>

      <div className="auth-box">
        <img src={qubitLogo} className="logo-qubit" alt="logo"/>
        {isRegistering ? (
          <>
            <Signup onToggle={() => setIsRegistering(false)} />
            <button
              onClick={() => setIsRegistering(false)}
              className="auth-toggle"
            >
              Already have an account? Login
            </button>
          </>
        ) : (
          <>
            <Login onLogin={onLogin} />
            <button
              onClick={() => setIsRegistering(true)}
              className="auth-toggle"
            >
              Need an account? Register
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Auth;
