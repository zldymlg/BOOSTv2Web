import { useState, useEffect } from "react";
import "./Sidebar.css";
import { BsCardText } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { IoRibbon } from "react-icons/io5";
import { LayoutGrid, ListCheck, Timer, Brain, Settings } from "lucide-react";
import Brainstorming from "./Brainstorming.tsx";
import Dashboard from "./dashboard-content.tsx";
import PomodoroTimer from "./Pomodoro.tsx";
import ToDoList from "./ToDoList.tsx";
import FlashCards from "./Flashcard.tsx";
import SettingsTabs from "./Settings.tsx";
import Profile from "./Profile.tsx";
import LogOut from "../Dashboard.tsx";
import { FiMenu, FiLogOut } from "react-icons/fi";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(window.innerWidth <= 768);
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem("activeTab") || "Dashboard";
  });
  const [userData, setUserData] = useState<any>({
    profilePictureUrl: "",
    name: "",
  });

  const auth = getAuth();
  const db = getFirestore();

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
    {
      name: "Rewards",
      icon: <IoRibbon size={20} />,
      component: <Rewards />,
    },
    {
      name: "Profile",
      icon: <FaUserCircle size={20} />,
      component: <Profile />,
    },
    {
      name: "Logout",
      icon: <FiLogOut size={20} />,
      component: <LogOut />,
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

  // Fetching user data (username and profile picture) from Firebase Firestore
  useEffect(() => {
    onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userRef = doc(db, "users", firebaseUser.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          const data = docSnap.data();

          const profilePicture = data.profilePicture || ""; // Assuming the profile picture URL is directly stored
          const name = data.name || "Username"; // Default if no username is found

          setUserData({
            profilePictureUrl: profilePicture,
            name: name,
          });
        }
      }
    });
  }, [auth, db]);

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

        <div className="user-section" style={{ cursor: "pointer" }}>
          <img
            src={userData.profilePictureUrl || "default-avatar.png"}
            alt="User Avatar"
            className="profile-avatar"
            onClick={() => setActiveTab("Profile")}
            style={{ width: "4vw", height: "4vw", borderRadius: "50%" }}
          />
          {!isCollapsed && (
            <span className="username px-2">{userData.name}</span>
          )}
        </div>

        <div
          className={`content ${
            isCollapsed ? "content-collapsed" : "content-expanded"
          }`}
        >
          {menuItems.find((item) => item.name === activeTab)?.component}
        </div>

        {/* Profile Section */}
        <div className="user-section" style={{ cursor: "pointer" }}>
          <img
            src={userData.profilePictureUrl || "default-avatar.png"} // Default avatar if no profile picture
            alt="User Avatar"
            className="profile-avatar" // You can style this in your CSS
            onClick={() => setActiveTab("Profile")}
            style={{ width: "4vw", height: "4vw", borderRadius: "50%" }}
          />
          {!isCollapsed && (
            <>
              <span className="username px-2">{userData.name}</span>
            </>
          )}
        </div>
      </div>

      {/* Tab content display */}
      <div className="content">
        {menuItems.map(
          (item) =>
            item.name === activeTab && (
              <div key={item.name} className="tab-content">
                {item.component}
              </div>
            )
        )}
      </div>
    </div>
  );
}
