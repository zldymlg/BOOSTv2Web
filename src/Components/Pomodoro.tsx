import React, { useState, useEffect, useRef } from "react";
import { Button, Form, Card, Nav, Modal } from "react-bootstrap";
import {
  FaPlus,
  FaPlay,
  FaPause,
  FaSave,
  FaCog,
  FaArrowLeft,
  FaTrash,
} from "react-icons/fa";
import "./Pomodoro.css";
import ExpBar from "./exp-notif-cal.tsx";
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

interface Task {
  id?: string;
  text: string;
  notes: string;
  priority: string;
  pomosEst: number;
  completed: boolean;
  pomodorosCompleted: number;
  createdAt?: any;
}

const PomodoroTimer: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([]);
  const startTimeRef = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);
  const [pomodoroDuration, setPomodoroDuration] = useState(25 * 60);
  const [shortBreakDuration, setShortBreakDuration] = useState(5 * 60);
  const [longBreakDuration, setLongBreakDuration] = useState(10 * 60);
  const [autoSwitch, setAutoSwitch] = useState(true);
  const [ringtone, setRingtone] = useState("ringtone1");
  const ringtones = ["ringtone1", "ringtone2", "ringtone3"];
  const [backgroundMusic, setBackgroundMusic] = useState("Time Ticking");
  const backgroundMusics = ["Time Ticking", "Rainy", "Cozy"];
  const [timeLeft, setTimeLeft] = useState(
    parseInt(localStorage.getItem("timeLeft") || `${25 * 60}`, 10)
  ); 
  const [isRunning, setIsRunning] = useState(
    JSON.parse(localStorage.getItem("isRunning") || "false")
  ); 
  const [mode, setMode] = useState(localStorage.getItem("mode") || "pomodoro"); //Load mode from localStorage
  const [showStartWarning, setShowStartWarning] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [showTaskInput, setShowTaskInput] = useState(false);
  const [task, setTask] = useState("");
  const [notes, setNotes] = useState("");
  const [priority, setPriority] = useState("Urgent");
  const [selectedPomosEst, setSelectedPomosEst] = useState(1);
  const [completedPomodoros, setCompletedPomodoros] = useState(0);
  const [totalTimeSpent, setTotalTimeSpent] = useState(0);
  const [tasksCompletedToday, setTasksCompletedToday] = useState(0);
  const ringtonePlayerRef = useRef<HTMLAudioElement | null>(null);
  const backgroundMusicPlayerRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const timeLeftRef = useRef(timeLeft);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        setUser(userAuth);
        await loadTasks(userAuth.uid);
      } else {
        console.log("User not authenticated");
        setTasks([]);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const loadTasks = async (uid: string) => {
    const tasksCollectionRef = collection(firestore, "users", uid, "Pomotask");
    const q = query(tasksCollectionRef, where("completed", "==", false));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newTasks: Task[] = [];
      querySnapshot.forEach((doc) => {
        newTasks.push({ id: doc.id, ...doc.data() } as Task);
      });
      setTasks(newTasks);
    });
    return () => unsubscribe();
  };

  const addTask = async () => {
    if (task.trim() !== "") {
      const newTask: Omit<Task, "id" | "createdAt"> = {
        text: task,
        notes,
        priority,
        pomosEst: selectedPomosEst,
        completed: false,
        pomodorosCompleted: 0,
      };

      // Optimistic update: Add task to the state immediately
      setTasks([...tasks, { ...newTask, id: Date.now().toString() }]); // Generate a temporary ID

      try {
        const userDocRef = doc(firestore, "users", user.uid);
        const tasksCollectionRef = collection(userDocRef, "Pomotask");
        const docRef = await addDoc(tasksCollectionRef, {
          ...newTask,
          createdAt: serverTimestamp(),
        });
        setTasks((prevTasks) =>
          prevTasks.map((t) =>
            t.id === Date.now().toString() ? { ...t, id: docRef.id } : t
          )
        );
        setTask("");
        setNotes("");
        setPriority("Urgent");
        setShowTaskInput(false);
        setSelectedPomosEst(1);
      } catch (error) {
        console.error("Error adding task:", error);
        // Rollback optimistic update if the write fails
        setTasks((prevTasks) =>
          prevTasks.filter((t) => t.id !== Date.now().toString())
        );
      }
    }
  };

  const updateTaskCompletion = async (
    tasks: Task[],
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>,
    setTasksCompletedToday: React.Dispatch<React.SetStateAction<number>>,
    currentTaskIndex: number,
    userId: string
  ) => {
    if (!userId) {
      console.error("User ID is missing");
      return;
    }

    const updatedTasks = [...tasks];
    const currentTask = updatedTasks[currentTaskIndex];

    if (!currentTask || !currentTask.id) {
      console.error("Task or Task ID is missing");
      return;
    }

    currentTask.pomodorosCompleted++;

    if (currentTask.pomodorosCompleted >= currentTask.pomosEst) {
      currentTask.completed = true;
    }

    try {
      const taskRef = doc(
        firestore,
        "users",
        userId,
        "Pomotask",
        currentTask.id
      );
      await updateDoc(taskRef, {
        pomodorosCompleted: currentTask.pomodorosCompleted,
        completed: currentTask.completed,
      });
    } catch (error) {
      console.error("Error updating task:", error);
    }

    setTasks(updatedTasks);
    setTasksCompletedToday((prev) => prev + 1);
  };

  const stopTimer = () => {
    setIsRunning(false);
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  };
  const resetTimer = () => {
    stopTimer();
    setTimeLeft(pomodoroDuration);
  };

  useEffect(() => {
    const storedSettings = JSON.parse(
      localStorage.getItem("pomodoroSettings") || "{}"
    );
    setPomodoroDuration(
      Math.max(storedSettings.pomodoroDuration || 25 * 60, 300)
    );
    setShortBreakDuration(
      Math.max(storedSettings.shortBreakDuration || 5 * 60, 120)
    );
    setLongBreakDuration(storedSettings.longBreakDuration || 10 * 60);
    setAutoSwitch(storedSettings.autoSwitch || true);
    setRingtone(storedSettings.ringtone || "ringtone1");
    setBackgroundMusic(storedSettings.backgroundMusic || "Time Ticking");
    //Load timeLeft from localStorage if available
    const storedTimeLeft = parseInt(
      localStorage.getItem("timeLeft") || `${25 * 60}`,
      10
    );
    if (storedTimeLeft > 0 && isRunning) {
      setTimeLeft(storedTimeLeft);
    }
  }, [isRunning]);

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = Date.now();
      const animate = () => {
        const elapsedTime = Date.now() - startTimeRef.current;
        const newTimeLeft = Math.max(
          0,
          timeLeft - Math.floor(elapsedTime / 1000)
        );
        setTimeLeft(newTimeLeft);
        if (newTimeLeft > 0) {
          animationFrameRef.current = requestAnimationFrame(animate);
        } else {
          handleSessionEnd();
          playRingtone();
        }
      };
      animationFrameRef.current = requestAnimationFrame(animate);
    } else {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    }
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isRunning, timeLeft]);

  useEffect(() => {
    return () => stopBackgroundMusic();
  }, [backgroundMusic]);

  useEffect(() => {
    if (isRunning) {
      playBackgroundMusic();
    } else {
      stopBackgroundMusic();
    }
  }, [isRunning, backgroundMusic]);

  const playBackgroundMusic = () => {
    if (backgroundMusicPlayerRef.current) {
      backgroundMusicPlayerRef.current.pause();
      backgroundMusicPlayerRef.current.currentTime = 0;
    }
    const newBackgroundMusicPlayer = new Audio(
      getBackgroundMusicURL(backgroundMusic)
    );
    newBackgroundMusicPlayer.loop = true;
    newBackgroundMusicPlayer.play().catch((error) => {
      console.error("Error playing background music:", error);
    });
    backgroundMusicPlayerRef.current = newBackgroundMusicPlayer;
  };

  const stopBackgroundMusic = () => {
    if (backgroundMusicPlayerRef.current) {
      backgroundMusicPlayerRef.current.pause();
      backgroundMusicPlayerRef.current.currentTime = 0;
      backgroundMusicPlayerRef.current = null;
    }
  };

  const playRingtone = () => {
    const newRingtonePlayer = new Audio(getRingtoneURL(ringtone));

    newRingtonePlayer.play().catch((error) => {
      console.error("Error playing ringtone:", error);
    });

    ringtonePlayerRef.current = newRingtonePlayer;

    setTimeout(() => {
      newRingtonePlayer.pause();
      newRingtonePlayer.currentTime = 0;
    }, 3000);
  };

  const getCurrentSessionDuration = () => {
    switch (mode) {
      case "pomodoro":
        return pomodoroDuration;
      case "shortBreak":
        return shortBreakDuration;
      case "longBreak":
        return longBreakDuration;
      default:
        return pomodoroDuration;
    }
  };

  const handleSessionEnd = () => {
    setCompletedPomodoros((prev) => prev + 1);
    setTotalTimeSpent((prev) => prev + getCurrentSessionDuration());

    if (!user || !user.uid) {
      console.error("User not authenticated");
      return;
    }

    updateTaskCompletion(
      tasks,
      setTasks,
      setTasksCompletedToday,
      currentTaskIndex,
      user.uid
    );

    if (autoSwitch && tasks.length > 0) {
      const currentTask = tasks[currentTaskIndex];

      if (currentTask) {
        if (mode === "pomodoro") {
          // Finish Pomodoro, increase counter
          currentTask.pomodorosCompleted++;

          if (currentTask.pomodorosCompleted >= currentTask.pomosEst) {
            // Task is fully completed, move to next task
            const nextTaskIndex = (currentTaskIndex + 1) % tasks.length;
            setCurrentTaskIndex(nextTaskIndex);
            setMode("pomodoro");
            setTimeLeft(pomodoroDuration);
          } else {
            // After every 4 Pomodoros → Long Break, otherwise → Short Break
            const nextMode =
              currentTask.pomodorosCompleted % 4 === 0
                ? "longBreak"
                : "shortBreak";
            setMode(nextMode);
            setTimeLeft(
              nextMode === "longBreak" ? longBreakDuration : shortBreakDuration
            );
          }
        } else {
          // If we are on a break, return to Pomodoro when break ends
          setMode("pomodoro");
          setTimeLeft(pomodoroDuration);
        }
      }
    } else {
      // No tasks available, reset timer and stop auto-switch
      setMode("pomodoro");
      setTimeLeft(pomodoroDuration);
      stopBackgroundMusic();
      setIsRunning(false);
    }
  };

  const getRingtoneURL = (ringtoneName: string): string => {
    switch (ringtoneName) {
      case "ringtone2":
        return "src/assets/Sound/ALARMCLOCK.mp3";
      case "ringtone3":
        return "src/assets/Sound/IPHONE.mp3";
      default:
        return "src/assets/Sound/IPHONE.mp3";
    }
  };
  const getBackgroundMusicURL = (musicName: string): string => {
    switch (musicName) {
      case "Rainy":
        return "src/assets/Sound/Rainy.mp3";
      case "Cozy":
        return "src/assets/Sound/Cozy.mp3";
      default:
        return "src/assets/Sound/Clock.mp3";
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handlePomosEstChange = (e: any) => {
    setSelectedPomosEst(parseInt(e.target.value, 10));
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    const priorityOrder = { Urgent: 1, Important: 2, "Not Urgent": 3 };
    return (
      priorityOrder[a.priority as keyof typeof priorityOrder] -
      priorityOrder[b.priority as keyof typeof priorityOrder]
    );
  });

  const toggleTimer = () => {
    if (tasks.length === 0) {
      setShowStartWarning(true);
      return;
    }
    setIsRunning(!isRunning);
  };

  const saveSettings = () => {
    localStorage.setItem(
      "pomodoroSettings",
      JSON.stringify({
        pomodoroDuration: Math.max(pomodoroDuration, 300),
        shortBreakDuration: Math.max(shortBreakDuration, 120),
        longBreakDuration,
        autoSwitch,
        ringtone,
        backgroundMusic,
      })
    );
    setShowSettings(false);
    setTimeLeft(pomodoroDuration);
    setMode("pomodoro");
  };

  const handleModeChange = (newMode: string) => {
    setMode(newMode);
    localStorage.setItem("mode", newMode); //Save mode to localStorage
    setIsRunning(false);
    setTimeLeft(
      newMode === "pomodoro"
        ? pomodoroDuration
        : newMode === "shortBreak"
        ? shortBreakDuration
        : longBreakDuration
    );
  };

  const handleDurationChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<number>>
  ) => {
    const value = parseInt(e.target.value, 10); // Parse as integer

    //Improved error handling:
    if (isNaN(value)) {
      console.error("Invalid input: Please enter a number.");
      return;
    }

    const newValueInSeconds = value * 60;
    const minValueInSeconds =
      e.target.id === "pomodoroDuration"
        ? 300
        : e.target.id === "shortBreakDuration"
        ? 120
        : 300; //Minimums in seconds

    setter(Math.max(newValueInSeconds, minValueInSeconds));
  };

  const deleteTask = async (taskId: string, userId: string) => {
    if (!userId || !taskId) {
      console.error("User ID or Task ID is missing");
      return;
    }

    try {
      const taskRef = doc(firestore, "users", userId, "Pomotask", taskId);
      await deleteDoc(taskRef);

      // Update state: Remove task from list
      setTasks((prevTasks) => {
        const updatedTasks = prevTasks.filter((task) => task.id !== taskId);

        // If no tasks left, stop & reset timer
        if (updatedTasks.length === 0) {
          stopTimer(); // Stops any running interval
          setTimeLeft(pomodoroDuration); // Reset to default Pomodoro time
          setMode("pomodoro");
          setIsRunning(false); // Explicitly stop the timer

          // Cancel any ongoing animations
          if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
            animationFrameRef.current = null;
          }
        }

        return updatedTasks;
      });

      // Handle the current task index
      setCurrentTaskIndex((prevIndex) => {
        if (prevIndex >= tasks.length - 1) {
          return 0; // Reset to first task if the last one is deleted
        }
        return prevIndex;
      });
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  useEffect(() => {
    localStorage.setItem("timeLeft", JSON.stringify(timeLeft)); // Save timeLeft to localStorage
    localStorage.setItem("isRunning", JSON.stringify(isRunning)); //Save isRunning to localStorage
  }, [timeLeft, isRunning]); // Add timeLeft and isRunning to the dependency array

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <React.Fragment>
      <ExpBar />
      <div className="d-flex justify-content-end">
        <Button
          onClick={() => setShowSettings(!showSettings)}
          className="mx-3 pt-1 border-0"
          style={{ backgroundColor: "transparent" }}
        >
          <FaCog style={{ color: "var(--bs-success)", fontSize: "30px" }} />
        </Button>
        {showSettings && (
          <Card
            id="SettingsPanel"
            className="p-4 rounded bg-light text-dark position-fixed end-0 top-0 mt-3"
            style={{ width: "300px", zIndex: "1999" }}
          >
            <div className="d-flex align-items-center mb-3">
              <Button
                onClick={() => setShowSettings(false)}
                variant="link"
                className="p-0 me-2"
              >
                <FaArrowLeft
                  style={{ fontSize: "24px", color: "var(--bs-dark)" }}
                />
              </Button>
              <h3 className="m-0">Settings</h3>
            </div>

            <Form.Label>Pomodoro Duration (minutes)</Form.Label>
            <Form.Control
              type="number"
              id="pomodoroDuration"
              value={Math.floor(pomodoroDuration / 60)}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleDurationChange(e, setPomodoroDuration)
              }
            />

            <Form.Label>Short Break (minutes)</Form.Label>
            <Form.Control
              type="number"
              id="shortBreakDuration"
              value={Math.floor(shortBreakDuration / 60)}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleDurationChange(e, setShortBreakDuration)
              }
            />

            <Form.Label>Long Break (minutes)</Form.Label>
            <Form.Control
              type="number"
              id="longBreakDuration"
              value={Math.floor(longBreakDuration / 60)}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleDurationChange(e, setLongBreakDuration)
              }
            />

            <Form.Check
              type="switch"
              label="Auto Switch Task"
              checked={autoSwitch}
              onChange={() => setAutoSwitch(!autoSwitch)}
            />

            <Form.Label>Ringtone</Form.Label>
            <Form.Select
              value={ringtone}
              onChange={(e) => setRingtone(e.target.value)}
            >
              {ringtones.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </Form.Select>

            <Form.Label>Background Music</Form.Label>
            <Form.Select
              value={backgroundMusic}
              onChange={(e) => setBackgroundMusic(e.target.value)}
            >
              {backgroundMusics.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </Form.Select>

            <Button className="mt-2" variant="light" onClick={saveSettings}>
              <FaSave /> Save Settings
            </Button>
          </Card>
        )}
      </div>
      <div className="text-center p-4">
        <Card
          id="Card"
          className={`p-4 rounded mt-3 ${
            mode === "longBreak" || mode === "shortBreak"
              ? "bg-warning"
              : "bg-success"
          } text-white d-flex `}
        >
          <Nav className="text-white justify-content-center p-2">
            <Nav.Item>
              <Nav.Link
                className={mode === "pomodoro" ? "active" : ""}
                onClick={() => handleModeChange("pomodoro")}
              >
                Pomodoro
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                className={mode === "longBreak" ? "active" : ""}
                onClick={() => handleModeChange("longBreak")}
              >
                Long Break
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                className={mode === "shortBreak" ? "active" : ""}
                onClick={() => handleModeChange("shortBreak")}
              >
                Short Break
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Modal
            show={showStartWarning}
            onHide={() => setShowStartWarning(false)}
            centered
            className="warning-modal"
          >
            <Modal.Header closeButton>
              <Modal.Title>
                <span style={{ fontWeight: "bold", color: "#FF6347" }}>
                  {" "}
                  Warning!{" "}
                </span>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p style={{ fontSize: "1.1rem" }}>
                Please add a task before starting the timer.
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="danger"
                onClick={() => setShowStartWarning(false)}
                style={{ border: "2px solid #FF6347", color: "#fff" }}
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal>
          <h1
            className="display-1"
            style={{
              fontSize: "9rem",
              fontWeight: "900",
            }}
          >
            {formatTime(timeLeft)}
          </h1>
          {currentTaskIndex < tasks.length && (
            <h5>Current Task: {sortedTasks[currentTaskIndex].text}</h5>
          )}

          <Button
            className="timer-btn rounded-circle"
            onClick={toggleTimer}
            variant="light"
            style={{
              width: "60px",
              height: "60px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {isRunning ? (
              <FaPause id="Pause" size={24} />
            ) : (
              <FaPlay id="Play" size={24} />
            )}
          </Button>
        </Card>
        <div className="row ">
          <Button
            className=" ms-auto mt-3 rounded-circle bg-success border-0 shadow "
            variant="success"
            onClick={() => setShowTaskInput(!showTaskInput)}
            style={{
              width: "60px",
              height: "60px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FaPlus />
          </Button>
        </div>
        {showTaskInput && (
          <Card className="mt-3 bg-success text-white p-3 rounded b">
            <Form>
              <Form>
                <Form.Group>
                  <Form.Control
                    as="textarea"
                    id="taskTitle"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    placeholder="What are you working on?"
                    className="transparent-input"
                    rows={1.5}
                    style={{
                      resize: "none",
                      whiteSpace: "pre-wrap",
                      overflowY: "auto",
                    }}
                  />
                </Form.Group>
              </Form>

              <Form.Group className="mb-3">
                <Form.Control
                  as="textarea"
                  rows={2}
                  id="taskNotes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Write any additional notes here..."
                  className="tasknotes"
                />
              </Form.Group>
              <div className="row">
                <Form.Group className="col">
                  <Form.Select
                    id="taskPriority"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                  >
                    <option value="Urgent">High Priority</option>
                    <option value="Important">Medium Priority</option>
                    <option value="Not Urgent">Low Priority</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="col">
                  <Form.Select
                    id="taskPomosEst"
                    value={selectedPomosEst}
                    onChange={handlePomosEstChange}
                  >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                    <option value={7}>7</option>
                    <option value={8}>8</option>
                    <option value={9}>9</option>
                    <option value={10}>10</option>
                  </Form.Select>
                </Form.Group>
                <Button className="col" variant="light" onClick={addTask}>
                  <FaSave /> Save Task
                </Button>
              </div>
            </Form>
          </Card>
        )}
        {sortedTasks.map((t, index) => (
          <Card
            key={t.id}
            className="mt-3 p-3 rounded d-flex flex-row align-items-start bg-success shadow text-start"
            style={{ color: "white" }}
          >
            <div
              className="bg-warning"
              style={{ width: "10px", height: "100%" }}
            ></div>
            <div className="p-2 w-100">
              <h5>
                Task {index + 1}: {t.text}
              </h5>
              <div
                className="p-2 mb-2 rounded text-dark"
                style={{
                  backgroundColor: mode !== "pomodoro" ? "#FFFFE0" : "",
                }}
              >
                {t.notes}
              </div>
              <span className="badge bg-light text-dark me-2">
                {t.priority}
              </span>
              <span className="badge bg-light text-dark">
                Pomos Est.: {t.pomosEst} / Completed: {t.pomodorosCompleted}
              </span>
              <Button
                variant="danger"
                onClick={() => deleteTask(t.id!, user.uid)}
                className="ms-auto"
              >
                <FaTrash />
              </Button>
            </div>
          </Card>
        ))}

        <Card className="mt-3 p-2 bg-success text-white rounded">
          <p className="mb-0">
            POMOS: <strong>{completedPomodoros}</strong> | Hours Taken:{" "}
            <strong>{Math.floor(totalTimeSpent / 3600)} hrs</strong> | Tasks
            Completed Today: {tasksCompletedToday}
          </p>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default PomodoroTimer;
