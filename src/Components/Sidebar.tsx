import { useState } from "react";
import "./Sidebar.css";
import { BsCardText } from "react-icons/bs";
import {
  ChevronsLeft,
  ChevronsRight,
  LayoutGrid,
  ListCheck,
  Timer,
  Brain,
  Settings,
} from "lucide-react";
import Brainstorming from "./Brainstorming.tsx";
import Dashboard from "./dashboard-content.tsx";
import Dashboardside from "./dashboard-sidebar.tsx";
import PomodoroTimer from "./Pomodoro.tsx";
import ToDoList from "./ToDoList-Content.tsx";
import FlashCards from "./Flashcard.tsx";
import SettingsTabs from "./Settings.tsx";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(window.innerWidth <= 768);
  const [activeTab, setActiveTab] = useState("Dashboard");

  const menuItems = [
    {
      name: "Dashboard",
      icon: <LayoutGrid size={20} />,
      component: (
        <>
          <Dashboard /> <Dashboardside />
        </>
      ),
    },
    {
      name: "To-Do List",
      icon: <ListCheck size={20} />,
      component: (
        <>
          <ToDoList /> <Dashboardside />
        </>
      ),
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

  return (
    <div className="app-container">
      <div className={`sidebar ${isCollapsed ? "collapsed" : "expanded"}`}>
        {/* Logo and Collapse Button */}
        <div className="logo-container mt-4 m-2 ">
          {!isCollapsed && (
            <img src="./src/assets/BOOSTWORD.png" id="logoword" />
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="collapse-button"
          >
            {isCollapsed ? (
              <ChevronsRight size={20} />
            ) : (
              <ChevronsLeft size={20} />
            )}
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
      </div>
      <div
        className={`content ${
          isCollapsed ? "content-collapsed" : "content-expanded"
        }`}
      >
        {menuItems.find((item) => item.name === activeTab)?.component}
      </div>
    </div>
  );
}
