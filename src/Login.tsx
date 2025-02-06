import React from "react";
import Header from "./Components/Header.tsx";
import LandingNav from "./Components/LandingPageNavigation.tsx";
import Footer from "./Components/Footer.tsx";
import "bootstrap/dist/css/bootstrap.css";
import "/src/Login.css";

function Login() {
  return (
    <React.Fragment>
      <Header />
      <LandingNav />
      <div className="d-flex justify-content-center" id="bg">
        <div className="col-md-auto card mt-5 mb-5 p-5" id="card-bg">
          <h2 id="color-text1" className="text-center">
            Login
          </h2>
          <span id="color-text2" className="text-center pb-2">
            Welcome Back! Please Log in to access your account.
          </span>
          <span>Email</span>
          <input
            className="rounded p-2 border-0"
            name="Email"
            placeholder="Enter your Email"
          ></input>
          <span>Password</span>
          <input
            className="rounded p-2 border-0"
            name="Password"
            placeholder="Enter your Password"
          ></input>
          <a className="text-end p-0">Forget Password?</a>
          <label>
            <input type="checkbox" />
            Remeber me
          </label>
          <button id="login-btn" className="rounded p-2 mt-2 border-0">
            Log In
          </button>
          <div className="line-container mt-3 mb-3" id="-or-line">
            <div className="line" id="-line-"></div>
            <span className="text" id="-or-">
              OR
            </span>
            <div className="line" id="-line-"></div>
          </div>
          <button className="rounded p-2 border-0">Google</button>
          <div className="text-center">
            Don't have an account? <a className="p-0">Sign Up</a>
            <img className="ps-1" src="/src/assets/Arrow_btn.svg" />
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
}
export default Login;
