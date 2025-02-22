import React, { useState, useEffect } from "react";
import { Button, Form, Card, Nav } from "react-bootstrap";
import {
  FaPlus,
  FaPlay,
  FaPause,
  FaSave,
  FaCog,
  FaArrowLeft,
} from "react-icons/fa";
import "./Pomodoro.css";
import { color } from "framer-motion";

const PomodoroTimer: React.FC = () => {
  const [time, setTime] = useState<number>(1500);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [task, setTask] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [priority, setPriority] = useState<string>("Urgent");
  const [tasks, setTasks] = useState<
    { text: string; notes: string; priority: string }[]
  >([]);
  const [completedPomodoros, setCompletedPomodoros] = useState<number>(0);
  const [totalTimeSpent, setTotalTimeSpent] = useState<number>(0);
  const [showTaskInput, setShowTaskInput] = useState<boolean>(false);
  const [currentTask, setCurrentTask] = useState<{
    text: string;
    notes: string;
    priority: string;
  } | null>(null);
  const [mode, setMode] = useState<string>("pomodoro");
  const [showSettings, setShowSettings] = useState(false);
  var [pomodoroDuration, setPomodoroDuration] = useState(25);
  const [shortBreakDuration, setShortBreakDuration] = useState(5);
  const [longBreakDuration, setLongBreakDuration] = useState(15);
  const [autoSwitch, setAutoSwitch] = useState(false);

  const handleModeChange = (newMode: string , duration: number) => {
    setMode(newMode);
    setTime(duration * 60);
    setCurrentTask(null);
    setIsRunning(false);
  };
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime === 0) {
            clearInterval(timer)
            setIsRunning(false);
            setCompletedPomodoros((prev) => prev + 1);
            setTotalTimeSpent(
              (prev) =>
                prev +
                
            );
            setTasks((prevTasks) => prevTasks.filter((t) => t !== currentTask));
            setCurrentTask(null);
            return 1500;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRunning, mode, currentTask]);

  var formatTime = (seconds) => {
    var mins = Math.floor(seconds / 60);
    var secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const addTask = () => {
    if (task.trim() !== "") {
      const newTask = { text: task, notes, priority };
      setTasks([...tasks, newTask]);
      setTask("");
      setNotes("");
      setPriority("Urgent");
      setShowTaskInput(false);
      setCurrentTask(newTask);
    }
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    const priorityOrder = { Urgent: 1, Important: 2, "Not Urgent": 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  return (
    <React.Fragment>
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
              value={pomodoroDuration}
              onChange={(e) => setPomodoroDuration(Number(e.target.value))}
            />

            <Form.Label>Short Break (minutes)</Form.Label>
            <Form.Control
              type="number"
              value={shortBreakDuration}
              onChange={(e) => setShortBreakDuration(Number(e.target.value))}
            />

            <Form.Label>Long Break (minutes)</Form.Label>
            <Form.Control
              type="number"
              value={longBreakDuration}
              onChange={(e) => setLongBreakDuration(Number(e.target.value))}
            />

            <Form.Check
              type="switch"
              label="Auto Switch Task"
              checked={autoSwitch}
              onChange={() => setAutoSwitch(!autoSwitch)}
            />
          </Card>
        )}
      </div>
      <div className="text-center p-4 ">
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
                onClick={() => handleModeChange("pomodoro", 1500)}
              >
                Pomodoro
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                className={mode === "longBreak" ? "active" : ""}
                onClick={() => handleModeChange("longBreak", 600)}
              >
                Long Break
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                className={mode === "shortBreak" ? "active" : ""}
                onClick={() => handleModeChange("shortBreak", 300)}
              >
                Short Break
              </Nav.Link>
            </Nav.Item>
          </Nav>

          <h1
            className="display-1"
            style={{
              fontSize: "9rem",
              fontWeight: "900",
            }}
          >
            {formatTime(time)}
          </h1>
          {currentTask && <h5>Current Task: {currentTask.text}</h5>}

          <Button
            className="timer-btn rounded-circle"
            onClick={() => setIsRunning(!isRunning)}
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
          <Card
            className="mt-3 bg-success text-white p-3 rounded"
            style={{
              backgroundColor: "",
            }}
          >
            <h5>What are you working on?</h5>
            <Form>
              <Form.Group>
                <Form.Control
                  type="text"
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                  placeholder="Enter task"
                />
              </Form.Group>
              <Form.Group className="mt-2">
                <Form.Control
                  as="textarea"
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Additional notes"
                />
              </Form.Group>
              <Form.Group className="mt-2">
                <Form.Select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="Urgent">Urgent</option>
                  <option value="Important">Important</option>
                  <option value="Not Urgent">Not Urgent</option>
                </Form.Select>
              </Form.Group>
              <Button className="mt-2" variant="light" onClick={addTask}>
                <FaSave /> Save Task
              </Button>
            </Form>
          </Card>
        )}

        {sortedTasks.map((t, index) => (
          <Card
            key={index}
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
                style={{ backgroundColor: "#FDE9D8" }}
              >
                {t.notes}
              </div>
              <span className="badge bg-light text-dark me-2">
                {t.priority}
              </span>
            </div>
          </Card>
        ))}

        <Card className="mt-3 p-2 bg-success text-white rounded">
          <p className="mb-0">
            POMOS: <strong>{completedPomodoros}</strong> | Hours Taken:{" "}
            <strong>{(totalTimeSpent / 60).toFixed(1)} hrs</strong>
          </p>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default PomodoroTimer;
