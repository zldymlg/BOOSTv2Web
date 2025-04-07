import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import SmartGoals from "./SmartGoals";
import Mindmap from "./Mindmap";
<<<<<<< HEAD
import MindFlow from "./MindFlow";
=======
import MindFlow from "./MindFlow"; // Import the new MindFlow component
import { BsSearch } from "react-icons/bs";
>>>>>>> 6d4d9c9ac10daa2900f3b7d56d33052b38a9e31a
import "./SmartGoals.css";

export default function Brainstorming() {
  const [activeComponent, setActiveComponent] = useState("brainstorming");

  return (
    <React.Fragment>
      {activeComponent === "brainstorming" ? (
        <>
          <div className="row w-50 ps-5">
            <button
              className="btn col-sm-auto border rounded-5 me-2"
              id="search"
            >
              <BsSearch />
            </button>
            <input
              className="col-sm-10 rounded-5 border"
              id="searchinput"
              placeholder="Search..."
            />
          </div>
          <div className="row flex gap-4 p-4 justify-content-center">
            <div
              className="col-sm-auto card rounded-5 btn"
              id="design-btn"
              onClick={() => setActiveComponent("mindmap")}
            >
              <span>Mind Map</span>
            </div>
            <div
              className="col-sm-auto card rounded-5 btn"
              id="design-btn"
              onClick={() => setActiveComponent("smartgoals")}
            >
              <span>Smart Goals</span>
            </div>
            <div
              className="col-sm-auto card rounded-5 btn"
              id="design-btn"
              onClick={() => setActiveComponent("mindflow")}
            >
              <span>Mind Flow</span>
            </div>
            {/* add the code here copilot */}
            <div className="d-flex justify-content-between align-items-center p-2 border rounded-4 bg-light">
              <span className="ps-3">Name</span>
              <span className="pe-3">Date Created</span>
            </div>
          </div>
        </>
      ) : activeComponent === "mindmap" ? (
        <Mindmap onBack={() => setActiveComponent("brainstorming")} />
      ) : activeComponent === "smartgoals" ? (
        <SmartGoals onBack={() => setActiveComponent("brainstorming")} />
<<<<<<< HEAD
=======
      ) : activeComponent === "mindflow" ? (
        <MindFlow onBack={() => setActiveComponent("brainstorming")} />
>>>>>>> 6d4d9c9ac10daa2900f3b7d56d33052b38a9e31a
      ) : (
        <MindFlow onBack={() => setActiveComponent("brainstorming")} />
      )}
    </React.Fragment>
  );
}