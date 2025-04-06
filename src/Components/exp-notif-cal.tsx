import React, { useEffect, useState } from "react";
import { faTasks } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { FaBell } from "react-icons/fa";
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  query,
  getDocs,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { format } from "date-fns";
import "./exp-notif-cal.css";

export default function ExpNotifCal() {
  const [exp, setExp] = useState<number | null>(null);
  const [level, setLevel] = useState<number | null>(0);
  const [xp, setXp] = useState<string>("0/0XP");
  const [todoList, setTodoList] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isFloating, setIsFloating] = useState(false);

  useEffect(() => {
    const fetchExpAndTodoList = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
          const db = getFirestore();
          const userDocRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(userDocRef);
          if (docSnap.exists()) {
            const userData = docSnap.data();
            const currentExp = userData.exp || 0;
            const currentLevel = Math.floor(currentExp / 100);
            setExp(currentExp);
            setLevel(currentLevel);
            setXp(`${currentExp % 100}/100XP`);
          }

          const todoQuery = query(
            collection(db, "users", user.uid, "todolist")
          );
          const querySnapshot = await getDocs(todoQuery);
          const todos: any[] = [];
          const upcomingTasks: any[] = [];

          const now = new Date();
          const startOfToday = new Date(now);
          startOfToday.setHours(0, 0, 0, 0);

          const oneDayLater = new Date(now);
          oneDayLater.setDate(now.getDate() + 1);

          querySnapshot.forEach((doc) => {
            const todoData = doc.data();
            todos.push(todoData);

            if (todoData.dueDate) {
              const dueDate = todoData.dueDate.toDate();
              if (dueDate >= startOfToday && dueDate <= oneDayLater) {
                upcomingTasks.push({
                  title: todoData.title,
                  dueDate: dueDate,
                });
              }
            }
          });

          // Sort by soonest due date
          upcomingTasks.sort((a, b) => a.dueDate - b.dueDate);

          // Pick the task with the nearest due date
          if (upcomingTasks.length > 0) {
            const soonest = upcomingTasks[0];
            const formattedDate = format(soonest.dueDate, "MMMM d, yyyy");
            const formattedTime = format(soonest.dueDate, "hh:mm a");
            setNotifications([
              {
                title: soonest.title,
                date: formattedDate,
                time: formattedTime,
              },
            ]);
          } else {
            setNotifications([]);
          }

          setTodoList(todos);
        }
      } catch (error) {
        console.error("Error fetching user data or to-do list:", error);
      }
    };

    fetchExpAndTodoList();
  }, []);

  const toggleFloating = () => {
    setIsFloating(!isFloating);
  };

  return (
    <React.Fragment>
      <div className="container">
        <div className="exp-container pt-5 pb-5">
          <div className="exp-content">
            <span className="level-text">Level: {level}</span>
            <progress
              className="exp-bar"
              value={exp ? exp % 100 : 0}
              max={100}
            ></progress>
            <span className="xp-text">{xp}</span>
          </div>
          <div className="icons">
            <div className="bell-container">
              <FaBell
                className="icon notif"
                size={22}
                onClick={toggleFloating}
              />
              {notifications.length > 0 && (
                <div className="notification-dot"></div>
              )}
            </div>
          </div>
        </div>

        {isFloating && (
          <div className="floating-popup">
            <div className="popup-header">
              <h3>Notifications</h3>
              <button onClick={toggleFloating} className="close-btn"></button>
            </div>
            <hr />
            <h5> Due Task </h5>

            <div className="todo-list">
              {notifications.length === 0 ? (
                <p>No upcoming tasks within a day.</p>
              ) : (
                notifications.map((note, index) => (
                  <div key={index} className="todo-card">
                    <div className="todo-card-content">
                      <h5 className="task-title">
                        <FontAwesomeIcon
                          icon={faTasks}
                          className="icon notif pe-2"
                          size="sm" // or any size you prefer, 'lg', 'sm', '2x', etc.
                        />
                        {note.title}
                      </h5>
                      <p className="due-date-time">
                        Due on {note.date} at {note.time}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        <hr />
      </div>
    </React.Fragment>
  );
}
