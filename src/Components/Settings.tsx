import React from "react";

export default function SettingsTab() {
  return (
    <React.Fragment>
      <div className="p-5">
        <h2>Settings</h2>
        <ul>
          <li className="btn border-0">General</li>
          <li className="btn border-0">Personal Info</li>
          <li className="btn border-0">Login & Security</li>
        </ul>
      </div>
    </React.Fragment>
  );
}
