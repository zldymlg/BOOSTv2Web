import React, { useState, ChangeEvent } from "react";
import {
  auth,
  createUserWithEmailAndPassword,
  signInWithPopup,
  googleProvider,
} from "./firebaseConfig";
import Header from "./Components/Header";
import LandingNav from "./Components/LandingPageNavigation";
import Footer from "./Components/Footer";
import TermsPolicy from "./Components/TermsPolicy";
import "bootstrap/dist/css/bootstrap.css";
import "/src/Signup.css";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

interface UserInfo {
  name: string;
  email: string;
  password: string;
}

const Signup: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [termsChecked, setTermsChecked] = useState<boolean>(false);
  const [showTerms, setShowTerms] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    if (!userInfo.email || !userInfo.password) {
      setError("Email and password are required.");
      return;
    }
    try {
      await createUserWithEmailAndPassword(
        auth,
        userInfo.email,
        userInfo.password
      );
      alert("Signup successful! Redirecting to dashboard...");
      window.location.href = "dashboard.html";
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert("Google sign-up successful! Redirecting to dashboard...");
      window.location.href = "dashboard.html";
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <>
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
          {error && <p className="text-danger text-center">{error}</p>}

          <label className="pt-2 pb-2" style={{ fontWeight: 500 }}>
            Username
          </label>
          <motion.input
            className="rounded p-2 border-0"
            name="name"
            placeholder="Enter your Name"
            value={userInfo.name}
            onChange={handleChange}
          />

          <label className="pt-2 pb-2" style={{ fontWeight: 500 }}>
            Email
          </label>
          <motion.input
            className="rounded p-2 border-0"
            name="email"
            placeholder="Enter your Email"
            value={userInfo.email}
            onChange={handleChange}
          />

          <label className="pt-2 pb-2" style={{ fontWeight: 500 }}>
            Password
          </label>
          <motion.div className="position-relative">
            <input
              className="rounded p-2 border-0 w-100"
              name="password"
              type={passwordVisible ? "text" : "password"}
              placeholder="Enter your Password"
              value={userInfo.password}
              onChange={handleChange}
            />
            <motion.button
              type="button"
              className="position-absolute end-0 me-3 mt-1 bg-transparent border-0"
              onClick={() => setPasswordVisible(!passwordVisible)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              {passwordVisible ? <EyeOff /> : <Eye />}
            </motion.button>
          </motion.div>

          <motion.label className="p-2" style={{ color: "white" }}>
            <input
              type="checkbox"
              checked={termsChecked}
              onChange={(e) => setTermsChecked(e.target.checked)}
            />
            I agree with{" "}
            <a className="p-1" onClick={() => setShowTerms(true)}>
              Terms of Use
            </a>{" "}
            and{" "}
            <a className="p-1" onClick={() => setShowTerms(true)}>
              Privacy Policy
            </a>
          </motion.label>

          <motion.button
            id="login-btn"
            className="rounded p-2 mt-2 border-0"
            disabled={!termsChecked}
            style={{
              cursor: termsChecked ? "pointer" : "not-allowed",
              opacity: termsChecked ? 1 : 0.6,
            }}
            onClick={handleSignup}
          >
            Sign Up
          </motion.button>

          {/* OR Separator */}
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
            onClick={handleGoogleSignup}
          >
            Sign Up with Google
          </motion.button>

          <motion.div className="text-center mt-4" style={{ color: "#305029" }}>
            Already have an account? <a className="p-0">Login</a>
            <img className="ps-1" src="/src/assets/Arrow_btn.svg" />
          </motion.div>
        </motion.div>
      </motion.div>
      {showTerms && <TermsPolicy onClose={() => setShowTerms(false)} />}
      <Footer />
    </>
  );
};

export default Signup;
