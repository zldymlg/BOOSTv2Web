import React, { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { firestore, auth } from "../firebase";
import {
  collection,
  doc,
  query,
  where,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import SmartGoals from "./SmartGoals";
import Mindmap from "./Mindmap";
import MindFlow from "./MindFlow";
import ExpBar from "./exp-notif-cal.tsx";
import "./Brainstorming.css";

export default function Brainstorming() {
  const [activeComponent, setActiveComponent] = useState("brainstorming");
  const [sessions, setSessions] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        setUser(userAuth);
        await fetchSessions(userAuth.uid);
      } else {
        setUser(null);
        setSessions([]);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const fetchSessions = async (uid) => {
    const sessionsRef = collection(firestore, "users", uid, "BrainstormingSessions");
    const q = query(sessionsRef);
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const sessionsList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setSessions(sessionsList);
    });
    return () => unsubscribe();
  };

  const addSession = async () => {
    if (!user) return;
    const sessionRef = collection(firestore, "users", user.uid, "BrainstormingSessions");
    await addDoc(sessionRef, {
      name: "New Session",
      createdAt: serverTimestamp(),
    });
  };

  const deleteSession = async (id) => {
    if (!user) return;
    const sessionDoc = doc(firestore, "users", user.uid, "BrainstormingSessions", id);
    await deleteDoc(sessionDoc);
  };

  return (
    <React.Fragment>
      <ExpBar />
      {activeComponent === "brainstorming" ? (
        <>
          <div className="row w-50 ps-5">
            <button className="btn col-sm-auto border rounded-5 me-2" id="search">
              <BsSearch />
            </button>
            <input className="col-sm-10 rounded-5 border" id="searchinput" placeholder="Search..." />
          </div>
          <div className="row flex gap-4 p-4 justify-content-center">
            <div className="col-sm-auto card rounded-5 btn" id="design-btn" onClick={() => setActiveComponent("mindmap")}>
              <span>Mind Map</span>
            </div>
            <div className="col-sm-auto card rounded-5 btn" id="design-btn" onClick={() => setActiveComponent("smartgoals")}>
              <span>Smart Goals</span>
            </div>
            <div className="col-sm-auto card rounded-5 btn" id="design-btn" onClick={() => setActiveComponent("mindflow")}>
              <span>Mind Flow</span>
            </div>
          </div>
          <button className="btn btn-primary mb-3" onClick={addSession}>Add Session</button>
          {loading ? (
            <p>Loading...</p>
          ) : (
            sessions.map((session) => (
              <div key={session.id} className="row ms-5 me-5 bgcolor1 rounded-2 p-2">
                <span className="col-sm-auto">{session.name}</span>
                <span className="col-sm d-flex justify-content-center">
                  {session.createdAt?.toDate().toLocaleDateString() || "N/A"}
                </span>
                <button className="btn btn-danger" onClick={() => deleteSession(session.id)}>Delete</button>
              </div>
            ))
          )}
        </>
      ) : activeComponent === "mindmap" ? (
        <Mindmap onBack={() => setActiveComponent("brainstorming")} />
      ) : activeComponent === "smartgoals" ? (
        <SmartGoals onBack={() => setActiveComponent("brainstorming")} />
      ) : (
        <MindFlow onBack={() => setActiveComponent("brainstorming")} />
      )}
    </React.Fragment>
  );
}
