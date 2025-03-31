import React, { useState } from "react";
import "./LoginSecurity.css";
import { signInWithPopup } from "firebase/auth";
import { auth, facebookProvider,googleProvider } from "./FirebaseConfig";
import { User } from "firebase/auth"; 

export default function LogSec() {
  const [showInput, setShowInput] = useState(false);
  const [user, setUser] = useState<User | null>(null); 

  const handleFacebookLogin: () => void = () => {
    signInWithPopup(auth, facebookProvider)
      .then((result) => {
        setUser(result.user); 
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleGoogleLogin: () => void = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        setUser(result.user); 
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <React.Fragment>
      <div>
        <div className="row pt-4">
          <span className="col-sm-auto fw-medium">Email</span>
          <li
            className="col-sm-auto btn"
            onClick={() => setShowInput(!showInput)}
          >
            {showInput ? "Cancel" : "Edit"}
          </li>
          <li
            className="col-sm-auto btn"
            onClick={() => setShowInput(!showInput)}
          >
            {showInput ? "Confirm" : ""}
          </li>
          {showInput && (
            <input
              type="text"
              className="col-sm-auto"
              placeholder="Enter text..."
            />
          )}
        </div>
        <div className="row pt-2">
          <span className="col-sm-auto fw-medium">Password</span>
          <span>Set a password to protect your account </span>
        </div>
        <h3>Social Media Login</h3>
        <ul className="row gap-2">
          <li className="w-50 btn">
            <button
              className="btn btn-primary btn-md"
              onClick={handleFacebookLogin}
            >
              Facebook
            </button>
          </li>
          <li className="w-50 btn">Instagram</li>
          <li className="w-50 btn">
          <button
              className="btn btn-primary btn-md"
              onClick={handleGoogleLogin}
            >
              Google
              
            </button>
          </li>
        </ul>
        
        {user && (
          <div className="user-info">
            <p>Welcome, {user.displayName}</p> {/* Display user name */}
            <p>Email: {user.email}</p> {/* Display email */}
          </div>
        )}

        <div className="row gap-5 mt-5">
          <li className="w-50 btn">Download Data</li>
          <li className="w-50 btn">Account Deletion</li>
        </div>
      </div>
    </React.Fragment>
  );
}
