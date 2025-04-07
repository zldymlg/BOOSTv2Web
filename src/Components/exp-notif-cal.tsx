import React, { useEffect, useState } from "react";
import { FaBell, FaCalendarAlt } from "react-icons/fa";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { faTasks, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaBell } from "react-icons/fa";
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  query,
  getDocs,
  orderBy,
  limit,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { format } from "date-fns";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./exp-notif-cal.css";

export default function ExpNotifCal() {
  const [exp, setExp] = useState<number | null>(null);
  const [level, setLevel] = useState<number | null>(0);
  const [xp, setXp] = useState<string>("0/0XP");

  useEffect(() => {
    const fetchExp = async () => {

  const [dueNotifications, setDueNotifications] = useState<any[]>([]);
  const [xpNotifications, setXpNotifications] = useState<any[]>([]);
  const [isNotifFloating, setIsNotifFloating] = useState(false);
  const [isCalFloating, setIsCalFloating] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [tasksDueDates, setTasksDueDates] = useState<Date[]>([]);
  const [tasksForSelectedDate, setTasksForSelectedDate] = useState<any[]>([]);

  useEffect(() => {
    const fetchExpAndTodoList = async () => {
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
            const tensPlaceXp = Math.floor(currentExp / 10) * 10; // Get the tens place
            const remainingXp = currentExp % 10; // The remaining XP after calculating tens place
            setExp(currentExp);
            setLevel(currentLevel);
            setXp(`${remainingXp}/10XP`); // Show the remaining XP based on the tens place
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
            <progress
              className="exp-bar"
              value={exp ? exp % 10 : 0}
              max={100}
            ></progress>{" "}
            {/* Adjusting progress for tens place */}
            <span className="xp-text">{xp}</span>
          </div>
          <div className="icons">
            <FaCalendarAlt className="icon mx-4" size={22} />
            <FaBell className="icon notif" size={22} />
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

          // Query the user's todolist subcollection
          const todoQuery = query(
            collection(db, "users", user.uid, "todolist")
          );
          const querySnapshot = await getDocs(todoQuery);
          const upcomingTasks: any[] = [];
          const taskDueDates: Date[] = [];

          const now = new Date();
          const startOfToday = new Date(now);
          startOfToday.setHours(0, 0, 0, 0);
          const oneDayLater = new Date(now);
          oneDayLater.setDate(now.getDate() + 1);

          querySnapshot.forEach((doc) => {
            const todoData = doc.data();
            if (todoData.dueDate) {
              const dueDate = todoData.dueDate.toDate();
              if (dueDate >= startOfToday && dueDate <= oneDayLater) {
                upcomingTasks.push({
                  title: todoData.title,
                  dueDate: dueDate,
                });
                taskDueDates.push(dueDate);
              }
            }
          });

          upcomingTasks.sort((a, b) => a.dueDate - b.dueDate);

          if (upcomingTasks.length > 0) {
            const soonest = upcomingTasks[0];
            const formattedDate = format(soonest.dueDate, "MMMM d, yyyy");
            const formattedTime = format(soonest.dueDate, "hh:mm a");
            setDueNotifications([
              {
                title: soonest.title,
                date: formattedDate,
                time: formattedTime,
              },
            ]);
          } else {
            setDueNotifications([]);
          }

          const xpHistoryRef = collection(db, "users", user.uid, "xpHistory");
          const xpHistoryQuery = query(
            xpHistoryRef,
            orderBy("timestamp", "desc"),
            limit(10)
          );
          const xpHistorySnapshot = await getDocs(xpHistoryQuery);
          const xpNotifs: any[] = [];

          xpHistorySnapshot.forEach((doc) => {
            const xpData = doc.data();
            const formattedDate = format(
              xpData.timestamp.toDate(),
              "MMMM d, yyyy"
            );
            const formattedTime = format(xpData.timestamp.toDate(), "hh:mm a");
            xpNotifs.push({
              title: `You earned ${xpData.xpAdded} XP!`,
              date: formattedDate,
              time: formattedTime,
            });
          });

          setXpNotifications(xpNotifs);
          setTasksDueDates(taskDueDates);
        }
      } catch (error) {
        console.error("Error fetching user data or to-do list:", error);
      }
    };

    fetchExpAndTodoList();
  }, []);

  const toggleNotifFloating = () => {
    setIsNotifFloating(!isNotifFloating);
    setIsCalFloating(false);
  };

  const toggleCalFloating = () => {
    setIsCalFloating(!isCalFloating);
    setIsNotifFloating(false);
  };

  // Helper function to extract year, month, and day for comparison
  const getDateKey = (date: Date) => {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  };

  // Function to highlight the dates with due tasks
  const tileClassName = ({ date }: { date: Date }) => {
    return tasksDueDates.some(
      (taskDate) => getDateKey(taskDate) === getDateKey(date)
    )
      ? "highlight"
      : "";
  };

  const handleCalendarChange = (newDate: Date) => {
    setSelectedDate(newDate);
    fetchTasksForSelectedDate(newDate); // Fetch tasks for the new selected date
  };

  // Fetch tasks for the selected date
  const fetchTasksForSelectedDate = async (date: Date) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const db = getFirestore();
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        const todoQuery = query(
          collection(db, "users", user.uid, "todolist"),
          orderBy("dueDate")
        );

        const querySnapshot = await getDocs(todoQuery);
        const tasks: any[] = [];

        querySnapshot.forEach((doc) => {
          const todoData = doc.data();
          if (todoData.dueDate) {
            const dueDate = todoData.dueDate.toDate();
            if (dueDate >= startOfDay && dueDate <= endOfDay) {
              tasks.push({
                title: todoData.title,
                dueDate: dueDate,
              });
            }
          }
        });

        setTasksForSelectedDate(tasks);
      }
    } catch (error) {
      console.error("Error fetching tasks for selected date:", error);
    }
  };

  return (
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

        <div className="icons d-flex gap-3 align-items-center">
          <div className="bell-container position-relative">
            <FaBell
              className="icon notif"
              size={22}
              onClick={toggleNotifFloating}
            />
            {(dueNotifications.length > 0 || xpNotifications.length > 0) && (
              <div className="notification-dot"></div>
            )}
          </div>
          <div className="calendar-icon">
            <FontAwesomeIcon
              icon={faCalendarAlt}
              size="lg"
              className="icon notif"
              onClick={toggleCalFloating}
            />
          </div>
        </div>
      </div>

      {isNotifFloating && (
        <div className="floating-popup">
          <div className="popup-header">
            <h3>Notifications</h3>
            <button
              onClick={toggleNotifFloating}
              className="close-btn"
            ></button>
          </div>
          <hr />
          <h5>Due Tasks</h5>
          <div className="todo-list">
            {dueNotifications.length === 0 ? (
              <p>No upcoming tasks within a day.</p>
            ) : (
              dueNotifications.map((note, index) => (
                <div key={index} className="todo-card">
                  <h5 className="task-title">
                    <FontAwesomeIcon
                      icon={faTasks}
                      className="pe-2"
                      size="sm"
                    />
                    {note.title}
                  </h5>
                  <p className="due-date-time">
                    Due on {note.date} at {note.time}
                  </p>
                </div>
              ))
            )}
          </div>

          <hr />
          <h5>XP Notifications</h5>
          <div className="todo-list">
            {xpNotifications.length === 0 ? (
              <p>No recent XP updates.</p>
            ) : (
              xpNotifications.map((note, index) => (
                <div key={index} className="todo-card">
                  <h5 className="task-title">
                    <FontAwesomeIcon
                      icon={faTasks}
                      className="pe-2"
                      size="sm"
                    />
                    {note.title}
                  </h5>
                  <p className="due-date-time">
                    Earned on {note.date} at {note.time}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {isCalFloating && (
        <div className="floating-calendar-popup">
          <div className="popup-header">
            <h3>Calendar</h3>
            <button onClick={toggleCalFloating} className="close-btn"></button>
          </div>
          <div className="calendar-body d-flex">
            <div className="calendar-monthly">
              <Calendar
                onChange={handleCalendarChange}
                value={selectedDate}
                tileClassName={tileClassName}
              />
              {tasksForSelectedDate.length > 0 ? (
                <ul>
                  {tasksForSelectedDate.map((task, index) => (
                    <li key={index}>{task.title}</li>
                  ))}
                </ul>
              ) : (
                <p>You're free today!</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
