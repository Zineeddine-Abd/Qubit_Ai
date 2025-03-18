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
          <label>Username</label>
          <input type="text" placeholder="Change username..." />

          <label>Premium Key</label>
          <input type="text" placeholder="Enter key..." />
        </div>
      </div>

    )
}

export default Sidebar