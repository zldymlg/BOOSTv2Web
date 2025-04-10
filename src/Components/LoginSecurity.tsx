import React, { useState, useEffect } from "react";
import { Button, Form, Row, Col, Container, Alert } from "react-bootstrap";
import {
  signInWithPopup,
  deleteUser,
  updateEmail,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { auth, facebookProvider, googleProvider } from "../firebase";
// note: connect the facebook provider
import { User } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";


export default function LogSec() {
  const [showInput, setShowInput] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // Facebook Login
  const handleFacebookLogin = () => {
    signInWithPopup(auth, facebookProvider)
      .then((result) => setUser(result.user))
      .catch((err) => console.log(err));
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
    if (!auth.currentUser) return alert("No user is logged in.");
    if (!window.confirm("Delete your account? This is irreversible.")) return;

    try {
      await deleteUser(auth.currentUser);
      alert("Account deleted.");
      setUser(null);
    } catch (err) {
      console.error(err);
      alert("Error deleting account.");
    }
  };

  // Handle data download
  const handleDownloadData = async () => {
    if (!auth.currentUser) return alert("No user is logged in.");
    if (!window.confirm("Download your data?")) return;

    try {
      const userDoc = doc(db, "users", auth.currentUser.uid);
      const snap = await getDoc(userDoc);
      if (!snap.exists()) return alert("No data found.");

      const blob = new Blob([JSON.stringify(snap.data(), null, 2)], {
        type: "application/json",
      });

      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `${auth.currentUser.displayName}_data.json`;
      a.click();
      URL.revokeObjectURL(a.href);
    } catch (err) {
      console.error(err);
      alert("Error downloading data.");
    }
  };

  // Handle email update
  const handleEmailUpdate = async () => {
    if (!user) return;

    try {
      // Update the email in Firebase Authentication
      await updateEmail(user, newEmail);

      // Update the email in Firestore
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, { email: newEmail });

      alert("Email updated successfully.");
      setUser(auth.currentUser); // Refresh user data
    } catch (err) {
      console.error(err);
      alert("Error updating email.");
    }
  };

  // Handle password update
  const handlePasswordUpdate = async () => {
    if (!user) return;

    if (!oldPassword || !newPassword) {
      return alert("Both old and new password are required.");
    }

    try {
      // Reauthenticate the user with the old password
      const credential = EmailAuthProvider.credential(user.email!, oldPassword);
      await reauthenticateWithCredential(user, credential);

      // Update the password in Firebase Authentication
      await updatePassword(user, newPassword);

      alert("Password updated successfully.");
      setOldPassword(""); // Clear the old password field
      setNewPassword(""); // Clear the new password field
    } catch (err) {
      console.error(err);
      alert("Error updating password. Please check your old password.");
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
    <Container className="pt-4" style={{ maxWidth: "1000px" }}>
      <Row className="align-items-center mb-3">
        <Col sm="auto">
          <strong>Email</strong>
        </Col>
        <Col sm="auto">
          {showInput ? (
            <Form.Control
              size="sm"
              type="email"
              placeholder="Enter new email..."
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
          ) : (
            <span>{user?.email}</span>
          )}
        </Col>
        <Col sm="auto">
          <Button
            variant="outline-secondary"
            size="sm"
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
            <p>Welcome, {user.displayName}</p>
            <p>Email: {user.email}</p>
          </div>
        )}

        <div className="row gap-5 mt-5">
          <li className="w-50 btn">Download Data</li>
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
