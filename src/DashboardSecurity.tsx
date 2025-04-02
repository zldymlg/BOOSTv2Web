import React, { useEffect, useState } from "react";
import { auth } from "../firebasegmail"; 
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";  

export default function DashboardSecurity() {
  const [user, setUser] = useState<any>(null); 
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => { 
      if (!currentUser) {
        navigate("/");
      } else {
        setUser(currentUser);
      }
    });

  
    return () => unsubscribe();
  }, [navigate]);

  return (
    <div>
      <h1>Welcome to Dashboard Security</h1>
      {user ? (
        <p>Logged in as: {user.displayName ? user.displayName : "No display name"}</p> 
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}