import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./dashboard-content.css";
import ExpBar from "./exp-notif-cal.tsx";
import { Calendar, Clock } from "lucide-react";

export default function HomePage() {
  return (
    <React.Fragment>
      <div>
        <ExpBar />
        <h2 className="pt-5">Upcoming Work</h2>
        <div className="row flex-nowrap overflow-x-auto">
          <div className="col-sm-auto">
            <div
              className="col-sm-auto card ms-3 p-3"
              style={{ width: "22rem" }}
            >
              <div className="d-flex justify-content-between align-items-center">
                <span className="badge bg-success">12 Min Left</span>
                <button className="btn btn-light border-0">...</button>
              </div>
              <h5 className="mt-2">Brainstorming</h5>
              <p className="text-muted">
                Brainstorming with team on storlly app
              </p>
              <span className="badge bg-light text-dark text-wrap">Medium</span>
              <div className="d-flex justify-content-between align-items-center mt-3 p-2 bg-light rounded">
                <div className="d-flex align-items-center">
                  <Calendar size={16} className="me-1" /> 23 Mar 2024
                </div>
                <div className="d-flex align-items-center">
                  <Clock size={16} className="me-1" /> 12:45 pm
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-auto">
            <div
              className="col-sm-auto card ms-3 p-3"
              style={{ width: "22rem" }}
            >
              <div className="d-flex justify-content-between align-items-center">
                <span className="badge bg-success">12 Min Left</span>
                <button className="btn btn-light border-0">...</button>
              </div>
              <h5 className="mt-2">Brainstorming</h5>
              <p className="text-muted">
                Brainstorming with team on storlly app
              </p>
              <span className="badge bg-light text-dark text-wrap">Medium</span>
              <div className="d-flex justify-content-between align-items-center mt-3 p-2 bg-light rounded">
                <div className="d-flex align-items-center">
                  <Calendar size={16} className="me-1" /> 23 Mar 2024
                </div>
                <div className="d-flex align-items-center">
                  <Clock size={16} className="me-1" /> 12:45 pm
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
