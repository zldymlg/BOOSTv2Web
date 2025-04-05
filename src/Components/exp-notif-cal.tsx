import React, { useEffect, useState } from "react";
import { FaBell, FaCalendarAlt } from "react-icons/fa";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import "./exp-notif-cal.css";

export default function ExpNotifCal() {
  const [exp, setExp] = useState<number | null>(null);
  const [level, setLevel] = useState<number | null>(0);
  const [xp, setXp] = useState<string>("0/0XP");

  useEffect(() => {
    const fetchExp = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
          const db = getFirestore();
          const userDocRef = doc(db, "users", user.uid); // Accessing user's document
          const docSnap = await getDoc(userDocRef);

          if (docSnap.exists()) {
            const userData = docSnap.data();
            const currentExp = userData.exp || 0;
            const currentLevel = Math.floor(currentExp / 100); // Level based on every 100 XP
            const remainingXp = currentExp % 100; // The remaining XP after calculating the level
            setExp(currentExp);
            setLevel(currentLevel);
            setXp(`${remainingXp}/100XP`); // Show the remaining XP
          }
        }
      } catch (error) {
        console.error("Error fetching user exp:", error);
      }
    };

    fetchExp();
  }, []);

  return (
    <React.Fragment>
      <div className="container">
        <div className="exp-container pt-5 pb-5">
          <div className="exp-content">
            <span className="level-text">Level: {level}</span>
            <progress className="exp-bar" value={exp || 0} max={100}></progress>
            <span className="xp-text">{xp}</span>
          </div>
          <div className="icons">
            <FaCalendarAlt className="icon" size={22} />
            <FaBell className="icon notif" size={22} />
          </div>
        </div>
        <hr />
      </div>
    </React.Fragment>
  );
}
