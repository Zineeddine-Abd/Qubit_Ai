import { useNavigate } from "react-router-dom";
import qubitLogo from "../assets/Logo_No_BG.png";
import githubLogo from '../assets/github.png';
import linkedinLogo from '../assets/linkedin.png'
import "./Home.css";

function Home() {

  const navigate = useNavigate();

  return (
    <div className="home-container">

      <div className="content">
        <div className="logo-container">
          <img src={qubitLogo} alt="Qubit AI Logo" className="qubit-logo" />
          <h1 className="qubit-title">Qubit AI</h1>
        </div>

        <div className="button-container">
            <button className="auth-button login-button" onClick={() => navigate('/Auth', { state: { formType: "login" } })}>Login</button>
            <button className="auth-button signup-button" onClick={() => navigate('/Auth', { state: { formType: "signup" } })}>Sign Up</button>
        </div>
      </div>

      <footer className="footer">
        <p className="Designer">Designed by Zine Eddine Abdeladim</p>
        <div className="social-links">
          <a href="https://github.com/Zineeddine-Abd" target="_blank" rel="noopener noreferrer">
            <img src={githubLogo} alt="GitHub" />
          </a>
          <a href="https://www.linkedin.com/in/zine-eddine-abdeladim-075b742b7/" target="_blank" rel="noopener noreferrer">
            <img src={linkedinLogo} alt="LinkedIn" />
          </a>
        </div>
      </footer>
    </div>
  );
}

export default Home;
