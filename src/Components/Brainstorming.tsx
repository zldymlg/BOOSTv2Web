import React, { useState } from "react";
import "./Brainstorming.css";
import SmartGoals from "./SmartGoals";
import Mindmap from "./Mindmap";
import MindFlow from "./MindFlow";
import { BsSearch } from "react-icons/bs";
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
          </div>
          <div className="row ms-5 me-5 bgcolor1 rounded-2 p-2">
            <span className="col-sm-auto">Name</span>
            <span className="col-sm d-flex justify-content-center">
              Date Created
            </span>
          </div>
        </>
      ) : activeComponent === "mindmap" ? (
        <Mindmap onBack={() => setActiveComponent("brainstorming")} />
      ) : activeComponent === "smartgoals" ? (
        <SmartGoals onBack={() => setActiveComponent("brainstorming")} />
      ) : activeComponent === "mindflow" ? (
        <MindFlow onBack={() => setActiveComponent("brainstorming")} />
      ) : (
        <>
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
          </div>
        </>
      )}
    </React.Fragment>
  );
}
