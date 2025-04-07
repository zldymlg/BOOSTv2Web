import React, { useState } from "react";
import "./LoginSecurity.css";
import { signInWithPopup, deleteUser } from "firebase/auth";
import { auth, facebookProvider, googleProvider } from "../firebase";
import { User } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";


export default function LogSec() {
  const [showInput, setShowInput]  = useState(false);
  const [user, setUser] = useState<User | null>(null);


  const db = getFirestore();

 
  const handleFacebookLogin = () => {
    signInWithPopup(auth, facebookProvider)
      .then((result) => {
        setUser(result.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const handleGoogleLogin = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        setUser(result.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

 
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

  
  const handleDownloadData = async () => {
    if (!auth.currentUser) {
      alert("No user is logged in.");
      return;
    }
  
    const confirmDownload = window.confirm(
      "Are you sure you want to download your data?"
    );
  
    if (!confirmDownload) return;
  
    try {
     
      const userDocRef = doc(db, "users", auth.currentUser.uid);  
      const userDocSnap = await getDoc(userDocRef);
  
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
  
        
        const dataStr = JSON.stringify(userData, null, 2);
        const blob = new Blob([dataStr], { type: "application/json" });
  
        
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = '${auth.currentUser.displayName}_data.json';  
  
       
        a.click();
  
        
        URL.revokeObjectURL(url);
      } else {
        alert("No additional data found for this user.");
      }
    } catch (error) {
      console.error("Error downloading data:", error);
      alert("There was an error downloading your data. Please try again.");
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
            <input
              type="text"
              className="col-sm-auto"
              placeholder="Enter text..."
            />
          )}
        </div>
        <div className="row pt-2">
          <span className="col-sm-auto fw-medium">Password</span>
          <span>Set a password to protect your account</span>
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
            <p>Welcome, {user.displayName}</p>
            <p>Email: {user.email}</p>
          </div>
        )}

        <div className="row gap-5 mt-5">
          <li className="w-50 btn">
            <button
              className="btn btn-success btn-md"
              onClick={handleDownloadData}
            >
              Download Data
            </button>
          </li>
          <li className="w-50 btn">
            <button
              className="btn btn-danger btn-md"
              onClick={handleDeleteAccount}
            >
              Delete Account
            </button>
          </li>
        </div>
      </div>
    </React.Fragment>
  );
}
