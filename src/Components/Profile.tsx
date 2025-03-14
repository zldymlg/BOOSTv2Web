import React from "react";
import { FaMedal } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import "./Profile.css";

const Profile: React.FC = () => {
  return (
    <div className="profile-container">
      {/* Header */}
      <div className="profile-header">
        <img
          src="/path-to-avatar.png"
          alt="User Avatar"
          className="profile-avatar"
        />
        <div className="profile-info">
          <h2>@User</h2>
          <p>Name</p>
          <span>Joined on 3/9/2025</span>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="profile-section">
        <h3>Achievements</h3>
        <div className="achievements">
          <div className="achievement">
            <FaMedal size={40} color="orange" />
            <p>First of Many</p>
          </div>
          <div className="achievement">
            <FaMedal size={40} color="green" />
            <p>Ten of Many</p>
          </div>
          <span className="more-text">More</span>
        </div>
      </div>

      {/* Contact Info */}
      <div className="profile-section">
        <h3>Contact Info</h3>
        <p>
          <MdOutlineEmail /> Gmail: a##########@gmail.com
        </p>
        <p>
          <FiPhone /> Phone No.: 09########9
        </p>
      </div>

      {/* Bio Section */}
      <div className="profile-section">
        <h3>Bio</h3>
        <p>...</p>
      </div>

      {/* About Section */}
      <div className="profile-section">
        <h3>About</h3>
        <p>...</p>
      </div>
    </div>
  );
};

export default Profile;
