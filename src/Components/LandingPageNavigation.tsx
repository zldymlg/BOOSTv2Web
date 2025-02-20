import React from "react";
import vectorImage from "/src/assets/Logo.png";
import "./LandingPageNavigation.css";

function LandingNav() {
  return (
    <React.Fragment>
      <nav className="mx-2 py-3 row align-items-center" id="Nav">
        <div className="col">
          <img
            className="p-2 img-fluid"
            src={vectorImage}
            id="Logo"
            alt="Logo"
          />
        </div>

        <div className="col-auto ms-auto d-flex justify-content-end">
          <ul className="list-group-horizontal">
            <li className=" btn m-1">
              <a href="signup.html" className="text-decoration-none">
                Sign-up
              </a>
            </li>
            <li className=" btn m-1">
              <a href="login.html" className="text-decoration-none">
                Log-in
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <hr className="mt-0 mb-0 ms-4 me-4" style={{ color: "wheat" }} />
    </React.Fragment>
  );
}

export default LandingNav;
