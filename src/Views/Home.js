import { Link } from "react-router-dom";
import qubitLogo from "../assets/Logo_No_BG.png";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">

      <div className="logo-container">
        <img src={qubitLogo} alt="Qubit AI Logo" className="qubit-logo" />
        <h1 className="qubit-title">Qubit AI</h1>
      </div>

      <div className="button-container">
        <Link to="/auth">
          <button className="auth-button login-button">Login</button>
        </Link>
        <Link to="/auth">
          <button className="auth-button signup-button">Sign Up</button>
        </Link>
      </div>

      <footer className="footer">
        <p className="Designer">Designed by Zine Eddine Abdeladim</p>
        <div className="social-links">
          <a href="https://github.com/Zineeddine-Abd" target="_blank" rel="noopener noreferrer">
            <img src="../assets/github-icon.png" alt="GitHub" />
          </a>
          <a href="https://www.linkedin.com/in/zine-eddine-abdeladim-075b742b7/" target="_blank" rel="noopener noreferrer">
            <img src="../assets/linkedin-icon.png" alt="LinkedIn" />
          </a>
        </div>
      </footer>
    </div>
  );
}

export default Home;
