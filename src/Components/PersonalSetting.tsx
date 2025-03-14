import { useState } from "react";
import { VscAccount } from "react-icons/vsc";
import { GrAchievement } from "react-icons/gr";
import { GiAchievement } from "react-icons/gi";
import { HiOutlineTrophy } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import "./PersonalSetting.css";

export default function PersonalSetting() {
  console.log("PersonalSetting component rendered!");

  const [userInfo, setUserInfo] = useState({
    username: "Placeholder",
    phone: "Placeholder",
    about: "Placeholder",
  });

  const handleEdit = (field: keyof typeof userInfo) => {
    const newValue = window.prompt(`Edit ${field}:`, userInfo[field]);
    if (newValue !== null && newValue.trim() !== "") {
      setUserInfo({ ...userInfo, [field]: newValue });
    }
  };

  return (
    <div className="settings-container">
      <h1>Personal Settings Page</h1>

      <div className="profile-section">
        <VscAccount
          size={150}
          className="profile-icon clickable"
          onClick={() => {
            console.log("Profile icon clicked");
            navigate("/profile");
          }}
        />
        <h2
          className="fw-medium clickable"
          onClick={() => {
            console.log("Username clicked");
            navigate("/profile");
          }}
        >
          {userInfo.username}
        </h2>
      </div>

      <div className="info-container">
        {(["username", "phone", "about"] as (keyof typeof userInfo)[]).map(
          (field) => (
            <div key={field} className="info-row">
              <h2 className="fw-medium">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </h2>
              <div className="row">
                <span className="col-sm-auto field-value">
                  {userInfo[field]}
                </span>
                <button
                  className="col-sm btn edit-btn"
                  onClick={() => handleEdit(field)}
                >
                  Edit
                </button>
              </div>
              <hr />
            </div>
          )
        )}
      </div>

      <h2 className="fw-medium">Achievements</h2>
      <div className="achievements-container">
        <GrAchievement size={80} className="achievement-icon" />
        <GiAchievement size={80} className="achievement-icon" />
        <HiOutlineTrophy size={80} className="achievement-icon" />
      </div>
    </div>
  );
}
