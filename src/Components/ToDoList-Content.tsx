import React from "react";
import { BsThreeDots } from "react-icons/bs";
import "./ToDoList-Content.css";

const tasks = {
  onProgress: [
    {
      title: "Change copies",
      description: "Change copies of website",
      progress: 37,
    },
    {
      title: "User Research",
      description: "Discussion on branding research",
      progress: 77,
    },
  ],
  pending: [
    {
      title: "Re-branding Discussion",
      description: "Discussion on branding strategy",
      timeLeft: "55 Min Left",
    },
    {
      title: "Brainstorming",
      description: "Studying new ideas",
      timeLeft: "10 Min Left",
    },
    {
      title: "UI/UX testing",
      description: "Testing performance",
      timeLeft: "3 Days Left",
    },
  ],
  completed: [
    { title: "Schedule Post", description: "Scheduled post for Dusk&Dawn" },
    { title: "Holi Post", description: "Design post for Holi" },
  ],
};

export default function FcTodoList() {
  return (
    <React.Fragment>
      <div>
        <div id="lvlprogress">
          Level 0 <progress value="10" max="100" id="xpbar" /> 0/0xp
        </div>
        <hr className="m-5" />
        <h2 className="pt-5 ps-3">Board</h2>
        <div className="board-container flex gap-4">
          <div className="task-column">
            <h3 className="text-blue-500 text">On Progress</h3>
            {tasks.onProgress.map((task, index) => (
              <div key={index} className="task-card">
                <h4>{task.title}</h4>
                <p>{task.description}</p>
                <span className="status-label ongoing">Ongoing</span>
                <progress value={task.progress} max="100"></progress>
                <span>{task.progress}%</span>
              </div>
            ))}
            <button className="add-task">+ Add Task</button>
          </div>

          <div className="task-column">
            <h3 className="text-yellow-500 text">Pending</h3>
            {tasks.pending.map((task, index) => (
              <div key={index} className="task-card">
                <h4>{task.title}</h4>
                <p>{task.description}</p>
                <span className="status-label pending">{task.timeLeft}</span>
              </div>
            ))}
            <button className="add-task">+ Add Task</button>
          </div>

          <div className="task-column">
            <div className="row">
              <span className="icons col-sm-auto">
                <svg height={13} width={10}>
                  <circle fill="green" cx={5} cy={5} r={5} />
                </svg>
              </span>
              <span className="ps-2 fw-medium text col-sm-auto">Completed</span>
              <li className="btn col-sm-auto" id="dot-btn">
                <BsThreeDots />
              </li>
            </div>
            <svg height="2%" width="100%" className="mb-4 mt-2">
              <line x1="0" y1="10" x2="100%" y2="10" id="custom-line3" />
            </svg>
            {tasks.completed.map((task, index) => (
              <div key={index} className="task-card completed">
                <h4>{task.title}</h4>
                <p>{task.description}</p>
                <span className="status-label completed">✔ Done</span>
              </div>
            ))}
            <button className="add-task">+ Add Task</button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
