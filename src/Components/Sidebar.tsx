import { useState, useEffect } from "react";
import "./Sidebar.css";
import { BsCardText } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { LayoutGrid, ListCheck, Timer, Brain, Settings } from "lucide-react";
import Brainstorming from "./Brainstorming.tsx";
import Dashboard from "./dashboard-content.tsx";
import PomodoroTimer from "./Pomodoro.tsx";
import ToDoList from "./ToDoList.tsx";
import FlashCards from "./Flashcard.tsx";
import SettingsTabs from "./Settings.tsx";
import Profile from "./Profile.tsx";
import { FiMenu, FiChevronUp } from "react-icons/fi";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(window.innerWidth <= 768);
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem("activeTab") || "Dashboard";
  });

  const menuItems = [
    {
      name: "Dashboard",
      icon: <LayoutGrid size={20} />,
      component: <Dashboard />,
    },
    {
      name: "To-Do List",
      icon: <ListCheck size={20} />,
      component: <ToDoList />,
    },
    {
      name: "Pomodoro Timer",
      icon: <Timer size={20} />,
      component: <PomodoroTimer />,
    },
    {
      name: "Flash Cards",
      icon: <BsCardText size={20} />,
      component: <FlashCards />,
    },
    {
      name: "Brainstorming",
      icon: <Brain size={20} />,
      component: <Brainstorming />,
    },
    {
      name: "Settings",
      icon: <Settings size={20} />,
      component: <SettingsTabs />,
    },
  ];

  useEffect(() => {
    const handleResize = () => setIsCollapsed(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  return (
    <div className="app-container">
      <div className={`sidebar ${isCollapsed ? "collapsed" : "expanded"}`}>
        <div className="logo-container m-2">
          {!isCollapsed && (
            <img
              src="./src/assets/BOOSTWORD.png"
              id="logoword"
              className="me-4"
              alt="Logo"
            />
          )}
          <button
            onClick={() => setIsCollapsed((prev) => !prev)}
            className="collapse-button"
            aria-label="Toggle Sidebar"
          >
            <FiMenu size={20} />
          </button>
        </div>
        <hr className="m-3" />
        <ul className="menu-list">
          {menuItems.map((item) => (
            <li
              key={item.name}
              className={`menu-item ${activeTab === item.name ? "active" : ""}`}
              onClick={() => setActiveTab(item.name)}
            >
              {item.icon}
              {!isCollapsed && <span>{item.name}</span>}
            </li>
          ))}
        </ul>

        {/* Profile Section */}
        <div className="user-section" style={{ cursor: "pointer" }}>
          <FaUserCircle
            size={30}
            className="ms-1"
            onClick={() => setActiveTab("Profile")}
          />
          {!isCollapsed && (
            <>
              <span
                className="user-name ms-1"
                onClick={() => setActiveTab("Profile")}
              >
                Username
              </span>
              <FiChevronUp size={20} className="ms-3" />
            </>
          )}
        </div>
      </div>

      <div
        className={`content ${
          isCollapsed ? "content-collapsed" : "content-expanded"
        }`}
      >
        {activeTab === "Profile" ? (
          <Profile />
        ) : (
          menuItems.find((item) => item.name === activeTab)?.component
        )}
      </div>
    </div>
  );
}