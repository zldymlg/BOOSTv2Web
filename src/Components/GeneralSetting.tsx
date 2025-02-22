import React from "react";
import { BsFillMoonFill } from "react-icons/bs";
import { AiFillQuestionCircle } from "react-icons/ai";

import "./GeneralSetting.css";

export default function General() {
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-sm-auto" id="leftside">
          <div>
            <h3 className="mb-4">Theme & Appearance</h3>
            <BsFillMoonFill size={20} className="ms-5" />
            <span className="p-2 me-5">Dark mode</span>
            <label className="switch ms-5 me-5">
              <input type="checkbox" />
              <span className="slider round"></span>
            </label>
          </div>
          <div className="mt-5">
            <h3>Language Preferences</h3>
            <ul className="row gap-3">
              <li className="w-50 btn fw-medium" id="gen-btn">
                Filipino
              </li>
              <li className="w-50 btn fw-medium" id="gen-btn">
                English
              </li>
            </ul>
          </div>
          <div className="mt-5">
            <h3>Feedback and Support</h3>
            <ul className="row gap-3">
              <li className="w-50 btn" id="gen-btn">
                Send Feedback
              </li>
              <li className="w-50 btn" id="gen-btn">
                <AiFillQuestionCircle size={20} className="me-2" />
                help
              </li>
            </ul>
          </div>
        </div>
        <div className="col-sm-auto ms-3">
          <h3 className="text-center pb-4">Date & Time</h3>
          <span>Set Date & Time automatically</span>
          <label className="switch ms-5 me-5">
            <input type="checkbox" />
            <span className="slider round"></span>
          </label>
        </div>
      </div>
    </React.Fragment>
  );
}
