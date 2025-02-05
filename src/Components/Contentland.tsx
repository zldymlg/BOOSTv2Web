import React from "react";
import "./Contentland.css";
import Logo from "/src/assets/Logo.svg";
import Arrowbtn from "/src/assets/Arrow_btn.svg";

function Contentland() {
  return (
    <React.Fragment>
      <h2 className="text-center fw-semibold">
        <img className="img-fluid" src={Logo} />
        <span id="color1">Unlock</span> Your Potential, Boost Yourself!
      </h2>
      <h4 id="text1" className="text-center pb-1 medium-weight">
        From Brainstorming to Focused Study
      </h4>
      <h6 className="text-center pb-4">Unlock Your Full Potential.</h6>
      <div className="container">
        <ul className="list-unstyled d-flex justify-content-center">
          <li className="btn p-3 m-1" id="abtus-btn">
            About Us
          </li>
          <li className="btn p-3 m-1" id="serv-btn">
            Services
          </li>
        </ul>
      </div>
      <img alt="Place Holder" className="align-items-center" src="" />

      <div className="container">
        <div className="row">
          <h2 className="fw-semibold">Benefits</h2>
        </div>
        <div className="row">
          <div className="col-sm-8">
            Lorem ipsum dolor sit amet consectetur. Tempus tincidunt etiam eget
            elit id imperdiet et. Cras eu sit dignissim lorem nibh et. Ac cum
            habitasse in velit fringilla feugiat senectus in.
          </div>
          <div className="col-sm">
            <li className="btn d-flex justify-content-end">View All</li>
          </div>
        </div>
        <div className="row pt-5">
          <div className="col-sm m-3 card">
            <h1 className="fw-bold text-end p-4">01</h1>
            <h5>Focus on your work task </h5>
            <span>
              Fit your coursework around your existing commitments and
              obligations.
            </span>
            <a id="arr-btn">
              <img src={Arrowbtn} className="btn m-3 p-4" />
            </a>
          </div>
          <div className="col-sm m-3 card">
            <h1 className="fw-bold text-end p-4">02</h1>
            <h5>Improve your productivity</h5>
            <span>
              Learn from industry experts who have hands-on experience in design
              and development.
            </span>
            <a id="arr-btn">
              <img src={Arrowbtn} className="btn m-3 p-4" />
            </a>
          </div>
          <div className="col-sm m-3 card">
            <h1 className="fw-bold text-end p-4">03</h1>
            <h5>Example</h5>
            <span>Example</span>
            <a id="arr-btn">
              <img src={Arrowbtn} className="btn m-3 p-4" />
            </a>
          </div>
        </div>
        <div className="row pt-2">
          <div className="col-sm m-3 card">
            <h1 className="fw-bold text-end p-4">04</h1>
            <h5>Example</h5>
            <span>Example</span>
            <a id="arr-btn">
              <img src={Arrowbtn} className="btn m-3 p-4" />
            </a>
          </div>
          <div className="col-sm m-3 card">
            <h1 className="fw-bold text-end p-4">05</h1>
            <h5>Example</h5>
            <span>Example</span>
            <a id="arr-btn">
              <img src={Arrowbtn} className="btn m-3 p-4" />
            </a>
          </div>
          <div className="col-sm m-3 card">
            <h1 className="fw-bold text-end p-4">06</h1>
            <h5>Example</h5>
            <span>Example</span>
            <a id="arr-btn">
              <img src={Arrowbtn} className="btn m-3 p-4" />
            </a>
          </div>
        </div>
        <div className="row">
          <h2 className="fw-semibold">Our Services</h2>
          <div className="col-sm-8">
            <span>
              Lorem ipsum dolor sit amet consectetur. Tempus tincidunt etiam
              eget elit id imperdiet et. Cras eu sit dignissim lorem nibh et. Ac
              cum eget habitasse in velit fringilla feugiat senectus in.
            </span>
          </div>
          <div className="col-sm">
            <li className="btn d-flex justify-content-end">View All</li>
          </div>
        </div>
        <div className="row d-flex justify-content-center">
          <div className="col-md-5 m-1 card">
            <img alt="place holder"></img>
            <h5 className="fw-semibold m-3">Pomodoro Timer</h5>
            <span>Example</span>
            <a className="btn m-2 mb-4" id="serv-btns">
              Know more!
            </a>
          </div>
          <div className="col-md-5 m-1 card">
            <img alt="place holder"></img>
            <h5 className="fw-semibold m-3">To-Do List</h5>
            <span>Example</span>
            <a className="btn m-2 mb-4" id="serv-btns">
              Know more!
            </a>
          </div>
        </div>
        <div className="row d-flex justify-content-center">
          <div className="col-md-5 m-1 card">
            <img alt="place holder"></img>
            <h5 className="fw-semibold m-3">Brainstorming</h5>
            <span>Example</span>
            <a className="btn m-2 mb-4" id="serv-btns">
              Know more!
            </a>
          </div>
          <div className="col-md-5 m-1 card">
            <img alt="place holder"></img>
            <h5 className="fw-semibold m-3">Tracker</h5>
            <span>Example</span>
            <a className="btn m-2 mb-4" id="serv-btns">
              Know more!
            </a>
          </div>
        </div>
        <div className="row d-flex justify-content-center">
          <div className="col-md-5 m-1 card">
            <img alt="place holder"></img>
            <h5 className="fw-semibold m-3">Gamification Features</h5>
            <span>Example</span>
            <a className="btn m-2 mb-4" id="serv-btns">
              Know more!
            </a>
          </div>
          <div className="col-md-5 m-1 card">
            <img alt="place holder"></img>
            <h5 className="fw-semibold m-3">Focus Mode</h5>
            <span>Example</span>
            <a className="btn m-2 mb-4" id="serv-btns">
              Know more!
            </a>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Contentland;
