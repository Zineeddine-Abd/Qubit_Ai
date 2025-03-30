import { useState } from "react";
import closeHoveredIcon from '../assets/sidebar-close.png';
import closeIcon from '../assets/sidebar-open.png';
import './sidebar.css';

function Sidebar({ isSettingsOpen, toggleSettings }) {

    const [isHoveredClose, setHoveredClose] = useState(false)
    return(
        <div className={`settings-sidebar ${isSettingsOpen ? "open" : ""}`}>
        <div className="settings-header">
          <h2>Settings</h2>
          <img
            src={isHoveredClose ? closeHoveredIcon : closeIcon}
            alt="close settings"
            className="close-icon"
            onClick={toggleSettings}
            onMouseEnter={() => setHoveredClose(true)} 
            onMouseLeave={() => setHoveredClose(false)} 
          />    
        </div>
        <div className="settings-content">
          <h3 className="settings-subtitle">Change your credentials :</h3>

          <label>New username :</label>
          <input type="text" placeholder="Username" />

          <label>New password :</label>
          <input type="password" placeholder="Password" />

          <button className="save-button">Save Changes</button>
        </div>
      </div>

    )
}

export default Sidebar