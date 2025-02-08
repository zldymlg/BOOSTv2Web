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
import "./Sidebar.css";

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
        <div className="row">
          Level 0 <progress id="xp-lvl" value="50" max="100"></progress> 0/0xp
        </div>
        <div className="row">
          <ul className="menu">
            <li className="active">Upcoming</li>
            <li>Board</li>
          </ul>
          <hr style={{ width: 730 }} />
        </div>
        <h2 className="mt-5">Upcoming Work</h2>
        <div className="row">
          <div className="col-sm"> </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
