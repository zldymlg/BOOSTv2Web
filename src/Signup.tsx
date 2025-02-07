import React, { useState } from "react";
import Header from "./Components/Header.tsx";
import LandingNav from "./Components/LandingPageNavigation.tsx";
import Footer from "./Components/Footer.tsx";
import "bootstrap/dist/css/bootstrap.css";
import "/src/Signup.css";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

function Signup() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);

  return (
    <React.Fragment>
      <Header />
      <LandingNav />
      <motion.div
        className="d-flex justify-content-center"
        id="bg"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="col-md-auto card mt-3 mb-3 pt-4 ps-5 pe-5"
          id="card-bg"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2
            id="color-text1"
            className="text-center"
            style={{ fontWeight: 900 }}
          >
            Sign Up
          </h2>
          <motion.span
            id="color-text2"
            className="text-center pb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Create an account to unlock exclusive features
          </motion.span>
          <span className="pt-2 pb-2" style={{ fontWeight: 500 }}>
            Full Name
          </span>
          <motion.input
            className="rounded p-2 border-0"
            name="Name"
            placeholder="Enter your Name"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          />
          <span className="pt-2 pb-2" style={{ fontWeight: 500 }}>
            Email
          </span>
          <motion.input
            className="rounded p-2 border-0"
            name="Email"
            placeholder="Enter your Email"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          />
          <span className="pt-2 pb-2" style={{ fontWeight: 500 }}>
            Password
          </span>
          <motion.div
            className="position-relative"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <input
              className="rounded p-2 border-0 w-100"
              name="Password"
              id="Password"
              type={passwordVisible ? "text" : "password"}
              placeholder="Enter your Password"
              style={{ paddingRight: "3rem" }}
            />
            <motion.div
              className="position-absolute d-flex align-items-center justify-content-center"
              style={{
                top: "20%",
                right: "10px",
                transform: "translateY(-50%)",
                cursor: "pointer",
                color: "gray",
              }}
              onClick={() => setPasswordVisible(!passwordVisible)}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.95 }}
            >
              {passwordVisible ? (
                <motion.div
                  key="eyeOff"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.3 }}
                >
                  <EyeOff size={20} />
                </motion.div>
              ) : (
                <motion.div
                  key="eye"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Eye size={20} />
                </motion.div>
              )}
            </motion.div>
          </motion.div>
          <motion.label
            className="p-2"
            style={{ color: "white" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <input
              type="checkbox"
              checked={termsChecked}
              onChange={(e) => setTermsChecked(e.target.checked)}
            />
            I agree with
            <a className="p-1">Terms of Use</a>
            and
            <a className="p-1">Privacy Policy</a>
          </motion.label>
          <motion.button
            id="login-btn"
            className="rounded p-2 mt-2 border-0"
            disabled={!termsChecked}
            style={{
              cursor: termsChecked ? "pointer" : "not-allowed",
              opacity: termsChecked ? 1 : 0.6,
            }}
            whileHover={termsChecked ? { scale: 1.05 } : {}}
            whileTap={termsChecked ? { scale: 0.95 } : {}}
            transition={{ duration: 0.2 }}
          >
            Sign Up
          </motion.button>
          <div className="line-container mt-3 mb-3" id="-or-line">
            <motion.div
              className="line"
              id="-line-"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.6 }}
            ></motion.div>
            <span className="text" id="-or-">
              OR
            </span>
            <motion.div
              className="line"
              id="-line-"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.6 }}
            ></motion.div>
          </div>
          <motion.button
            className="rounded p-2 border-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            Google
          </motion.button>
          <motion.div
            className="text-center mt-4"
            style={{ color: "#305029" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            Already have an account? <a className="p-0">Login</a>
            <img className="ps-1" src="/src/assets/Arrow_btn.svg" />
          </motion.div>
        </motion.div>
      </motion.div>
      <Footer />
    </React.Fragment>
  );
}

export default Signup;
