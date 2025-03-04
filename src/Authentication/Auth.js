import React, { useState } from "react";
import Login from "./Login";
import Signup from "./SignUp";
import "./Auth.css";

const Auth = ({ onLogin }) => {
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <div className="auth-container">
      <div className="auth-box">
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
