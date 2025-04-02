import React, { useState } from "react";
import "./LoginSecurity.css";
import { signInWithPopup, deleteUser } from "firebase/auth";
import { auth, facebookProvider, googleProvider } from "./FirebaseConfig";
import { User } from "firebase/auth";

export default function LogSec() {
  const [showInput, setShowInput] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // Facebook Login
  const handleFacebookLogin = () => {
    signInWithPopup(auth, facebookProvider)
      .then((result) => {
        setUser(result.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Google Login
  const handleGoogleLogin = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        setUser(result.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Account Deletion Function
  const handleDeleteAccount = async () => {
    if (!auth.currentUser) {
      alert("No user is logged in.");
      return;
    }
  
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action is irreversible!"
    );
  
    if (!confirmDelete) return;
  
    try {
      await deleteUser(auth.currentUser);
      alert("Your account has been deleted.");
      setUser(null);
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("Error deleting account. Please log in again and try.");
    }
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
            <input type="text" className="col-sm-auto" placeholder="Enter text..." />
          )}
        </div>
        <div className="row pt-2">
          <span className="col-sm-auto fw-medium">Password</span>
          <span>Set a password to protect your account</span>
        </div>
        <h3>Social Media Login</h3>
        <ul className="row gap-2">
          <li className="w-50 btn">
            <button className="btn btn-primary btn-md" onClick={handleFacebookLogin}>
              Facebook
            </button>
          </li>
          <li className="w-50 btn">Instagram</li>
          <li className="w-50 btn">
            <button className="btn btn-primary btn-md" onClick={handleGoogleLogin}>
              Google
            </button>
          </li>
        </ul>

        {user && (
          <div className="user-info">
            <p>Welcome, {user.displayName}</p>
            <p>Email: {user.email}</p>
          </div>
        )}

        <div className="row gap-5 mt-5">
          <li className="w-50 btn">Download Data</li>
          <li className="w-50 btn">
            <button className="btn btn-danger btn-md" onClick={handleDeleteAccount}>
              Delete Account
            </button>
          </li>
        </div>
      </div>
    </React.Fragment>
  );
}
