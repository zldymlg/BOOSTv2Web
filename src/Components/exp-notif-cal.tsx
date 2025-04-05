import React from "react";
import { FaBell, FaCalendarAlt } from "react-icons/fa";
import "./exp-notif-cal.css";

export default function ExpNotifCal() {
  return (
    <React.Fragment>
      <div className="container">
        <div className="exp-container pt-5 pb-5">
          <div className="exp-content">
            <span className="level-text">Level: 0</span>
            <progress className="exp-bar" value={50} max={100}></progress>
            <span className="xp-text">0/0XP</span>
          </div>
          <div className="icons">
            <FaCalendarAlt className="icon" size={22} />
            <FaBell className="icon notif" size={22} />
          </div>
        </div>
        <hr />
      </div>
    </React.Fragment>
  );
}
