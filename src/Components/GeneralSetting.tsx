import React, { useState, useEffect } from "react";
import { BsFillMoonFill } from "react-icons/bs";
import { AiFillQuestionCircle } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";

import "./GeneralSetting.css";

export default function General() {
  const [theme, setTheme] = useState<string>(localStorage.getItem("theme") || "light");
  const [date, setDate] = useState<string>(formatDate(new Date()));
  const [time, setTime] = useState<string>(formatTime(new Date()));
  const [autoUpdate, setAutoUpdate] = useState<boolean>(true);
  const [showDateInput, setShowDateInput] = useState<boolean>(false);
  const [showTimeInput, setShowTimeInput] = useState<boolean>(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [showHelpModal, setShowHelpModal] = useState(false);

  function formatDate(dateObj: Date): string {
    return dateObj.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }

  function formatTime(dateObj: Date): string {
    return dateObj.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }

  useEffect(() => {
    if (autoUpdate) {
      getUserTimeZone();
      const interval = setInterval(() => {
        updateDateTime();
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [autoUpdate]);

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const getUserTimeZone = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log("Latitude:", latitude);
          console.log("Longitude:", longitude);
          
          const URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en';
          fetch (URL)
          .then((res) => res.json())
            .then((data) => {
              console.log("Timezone data:", data);
              updateDateTime(); // Optional: gamitin ang data kung kinakailangan
            })
            .catch((err) => console.error("Error fetching timezone:", err));
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const updateDateTime = () => {
    const localDate = new Date();
    setDate(formatDate(localDate));
    setTime(formatTime(localDate));
  };

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-sm-auto" id="leftside">
          <div>
            <h3 className="mb-4">Theme & Appearance</h3>
            <BsFillMoonFill size={20} className="ms-5" />
            <span className="p-2 me-5">Dark mode</span>
            <label className="switch ms-5 me-5">
              <input
                type="checkbox"
                checked={theme === "dark"}
                onChange={() => setTheme(theme === "light" ? "dark" : "light")}
              />
              <span className="slider round"></span>
            </label>
          </div>

         

          <div className="mt-5">
            <h3>Feedback and Support</h3>
            <ul className="row gap-3">
              <li
                className="w-50 btn"
                id="gen-btn"
                onClick={() => setShowFeedbackModal(true)}
              >
                Send Feedback
              </li>

              {showFeedbackModal && (
                <div className="modal-backdrop">
                  <div className="modal-box">
                    <h4>Send us your Feedback</h4>
                    <textarea
                      className="form-control my-2"
                      rows={4}
                      value={feedbackText}
                      onChange={(e) => setFeedbackText(e.target.value)}
                      placeholder="Type your feedback here..."
                    ></textarea>
                    <div className="d-flex justify-content-end gap-2">
                      <button
                        className="btn btn-secondary"
                        onClick={() => setShowFeedbackModal(false)}
                      >
                        Cancel
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          console.log("Submitted Feedback:", feedbackText);
                          alert("Thank you for your feedback!");
                          setFeedbackText("");
                          setShowFeedbackModal(false);
                        }}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <li
                className="w-50 btn"
                id="gen-btn"
                onClick={() => setShowHelpModal(true)}
              >
                <AiFillQuestionCircle size={20} className="me-2" />
                Help
              </li>

              {showHelpModal && (
                <div className="modal-backdrop">
                  <div className="modal-box">
                    <h4>Need Help?</h4>
                    <p className="my-2">
                      For assistance or more information, please contact our support team at:
                    </p>
                    <ul>
                      <li>Email: support@example.com</li>
                      <li>Phone: +63 912 345 6789</li>
                      <li>Facebook: /ourpage</li>
                    </ul>
                    <div className="d-flex justify-content-end gap-2 mt-3">
                      <button
                        className="btn btn-secondary"
                        onClick={() => setShowHelpModal(false)}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </ul>
          </div>
        </div>

        <div className="col-sm-auto ms-3">
          <h3 className="text-center pb-4">Date & Time</h3>
          <span>Set Date & Time automatically</span>
          <label className="switch ms-5 me-5">
            <input
              type="checkbox"
              checked={autoUpdate}
              onChange={() => setAutoUpdate(!autoUpdate)}
            />
            <span className="slider round"></span>
          </label>

          <div className="mt-3 d-flex align-items-center justify-content-between w-75">
            <h4 className="mb-0">Date</h4>
            {showDateInput && !autoUpdate ? (
              <input
                type="date"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setDate(formatDate(new Date(e.target.value)))
                }
                disabled={autoUpdate}
                className="form-control w-50"
              />
            ) : (
              <span>{date}</span>
            )}
            <IoIosArrowForward
              size={20}
              className="ms-2 cursor-pointer"
              onClick={() => setShowDateInput(!showDateInput)}
            />
          </div>

          <div className="mt-3 d-flex align-items-center justify-content-between w-75">
            <h4 className="mb-0">Time</h4>
            {showTimeInput && !autoUpdate ? (
              <input
                type="time"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const [hour, minute] = e.target.value.split(":");
                  const dateObj = new Date();
                  dateObj.setHours(parseInt(hour), parseInt(minute));
                  setTime(formatTime(dateObj));
                }}
                disabled={autoUpdate}
                className="form-control w-50"
              />
            ) : (
              <span>{time}</span>
            )}
            <IoIosArrowForward
              size={20}
              className="ms-2 cursor-pointer"
              onClick={() => setShowTimeInput(!showTimeInput)}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
} 