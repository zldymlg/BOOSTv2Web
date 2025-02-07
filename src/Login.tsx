import React, { useState } from "react";
import Header from "./Components/Header.tsx";
import LandingNav from "./Components/LandingPageNavigation.tsx";
import Footer from "./Components/Footer.tsx";
import "bootstrap/dist/css/bootstrap.css";
import "/src/Login.css";
import { Eye, EyeOff } from "lucide-react"; // Assuming you're using lucide-react for icons
import { motion } from "framer-motion"; // For smooth animations

function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);

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
          className="col-md-auto card mt-5 mb-5 p-5"
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
            Login
          </h2>
          <motion.span
            id="color-text2"
            className="text-center pb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Welcome Back! Please Log in to access your account.
          </motion.span>
          <span className="pt-2 pb-2" style={{ fontWeight: 500 }}>
            Email
          </span>
          <motion.input
            className="rounded p-2 border-0"
            name="Email"
            placeholder="Enter your Email"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          />
          <span className="pt-2 pb-2" style={{ fontWeight: 500 }}>
            Password
          </span>
          <motion.div
            className="d-flex align-items-center position-relative"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <input
              className="rounded p-2 border-0 w-100"
              name="Password"
              type={passwordVisible ? "text" : "password"}
              placeholder="Enter your Password"
            />
            <motion.button
              type="button"
              className="position-absolute end-0 me-2 bg-transparent border-0"
              onClick={() => setPasswordVisible(!passwordVisible)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              {passwordVisible ? <EyeOff /> : <Eye />}
            </motion.button>
          </motion.div>
          <a className="text-end p-0">Forget Password?</a>
          <motion.label
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <input type="checkbox" />
            Remember me
          </motion.label>
          <motion.button
            id="login-btn"
            className="rounded p-2 mt-2 border-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            Log In
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            Don't have an account? <a className="p-0">Sign Up</a>
            <img className="ps-1" src="/src/assets/Arrow_btn.svg" />
          </motion.div>
        </motion.div>
      </motion.div>
      <Footer />
    </React.Fragment>
  );
}
export default Login;
