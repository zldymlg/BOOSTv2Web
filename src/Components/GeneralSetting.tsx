import React, { useState, useEffect } from "react";
import { BsFillMoonFill } from "react-icons/bs";
import { AiFillQuestionCircle } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";

import "./GeneralSetting.css";

export default function General() {
  const [theme, setTheme] = useState("light");
  const [date, setDate] = useState<string>(formatDate(new Date()));
  const [time, setTime] = useState<string>(formatTime(new Date()));
  const [autoUpdate, setAutoUpdate] = useState<boolean>(true); // ✅ Default to ON
  const [showDateInput, setShowDateInput] = useState<boolean>(false);
  const [showTimeInput, setShowTimeInput] = useState<boolean>(false);

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
      minute: "2-digit", // Ensure minutes are included
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

  const getUserTimeZone = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          )
            .then((res) => res.json())
            .then(() => updateDateTime())
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
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              />
              <span className="slider round"></span>
            </label>
          </div>
          <div className="mt-5">
            <h3>Language Preferences</h3>
            <ul className="row gap-3">
              <li className="w-50 btn fw-medium" id="gen-btn">
                Filipino
              </li>
              <li className="w-50 btn fw-medium" id="gen-btn">
                English
              </li>
            </ul>
          </div>
          <div className="mt-5">
            <h3>Feedback and Support</h3>
            <ul className="row gap-3">
              <li className="w-50 btn" id="gen-btn">
                Send Feedback
              </li>
              <li className="w-50 btn" id="gen-btn">
                <AiFillQuestionCircle size={20} className="me-2" />
                Help
              </li>
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

          {/* Date Display & Picker */}
          <div className="mt-3 d-flex align-items-center justify-content-between w-75">
            <h4 className="mb-0">Date</h4>
            {showDateInput && !autoUpdate ? (
              <input
                type="date"
                onChange={(e) => setDate(formatDate(new Date(e.target.value)))}
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

          {/* Time Display & Picker */}
          <div className="mt-3 d-flex align-items-center justify-content-between w-75">
            <h4 className="mb-0">Time</h4>
            {showTimeInput && !autoUpdate ? (
              <input
                type="time"
                onChange={(e) => {
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
