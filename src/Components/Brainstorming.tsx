import React from "react";
import "./Brainstorming.css";
import { BsSearch } from "react-icons/bs";

export default function Brainstorming() {
  return (
    <React.Fragment>
      <div id="lvlprogress">
        Level 0 <progress value="10" max="100" id="xpbar" /> 0/0xp
      </div>
      <hr className="m-5" />
      <div className="row w-50 ps-5">
        <button className="btn col-sm-auto border rounded-5 me-2" id="search">
          <BsSearch />
        </button>
        <input
          className="col-sm-10 rounded-5 border"
          id="searchinput"
          placeholder="Search..."
        />
      </div>
      <div className="row flex gap-4 p-4 justify-content-center">
        <div className="col-sm-auto card rounded-5 btn" id="design-btn">
          <span>Mind Map</span>
        </div>
        <div className="col-sm-auto card rounded-5 btn" id="design-btn">
          <span>Smart Goals</span>
        </div>
        <div className="col-sm-auto card rounded-5 btn" id="design-btn">
          <span>Mind Flow</span>
        </div>
      </div>
      <div className="row ms-5 me-5 bgcolor1 rounded-2 p-2">
        <span className="col-sm-auto">Name</span>
        <span className="col-sm d-flex justify-content-center">
          Date Created
        </span>
      </div>
    </React.Fragment>
  );
}
