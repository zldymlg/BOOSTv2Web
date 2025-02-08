import { useState } from "react";
import {
  FaBars,
  FaHome,
  FaList,
  FaClock,
  FaStickyNote,
  FaBrain,
  FaCog,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Left-sidebar.css";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="d-flex" id="sidebar-">
      <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
        <div className="sidebar-header">
          <img
            src="/logo.png"
            alt="BOOST Logo"
            className={`logo ${collapsed ? "logo-collapsed" : ""}`}
          />
          <button
            className="toggle-btn"
            onClick={() => setCollapsed(!collapsed)}
          >
            <FaBars />
          </button>
        </div>

        <ul className="list-unstyled">
          <li>
            <FaHome /> {!collapsed && "Dashboard"}
          </li>
          <li>
            <FaList /> {!collapsed && "To-Do List"}
          </li>
          <li>
            <FaClock /> {!collapsed && "Pomodoro Timer"}
          </li>
          <li>
            <FaStickyNote /> {!collapsed && "Flash Cards"}
          </li>
          <li>
            <FaBrain /> {!collapsed && "Brainstorming"}
          </li>
          <li>
            <FaCog /> {!collapsed && "Settings"}
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="content">
        <h2>Main Content Area</h2>
      </div>
    </div>
  );
};

export default Sidebar;
