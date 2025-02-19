import React, { useState } from "react";
import "./Contentland.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "/src/assets/LOGO.png";
import Video from "/src/assets/TeamworkLandingPage.mp4";
import Pomodoro from "/src/assets/Pomodoro.png";
import Todo from "/src/assets/Todolist.jpeg";
import Brainstorming from "/src/assets/Brainstorming.jpg";
import Tracker from "/src/assets/Tracker.jpeg";
import Reward from "/src/assets/Reward.png";
import Focus from "/src/assets/Focus.jpg";

function Contentland() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    const video = document.getElementById("custom-video") as HTMLVideoElement;
    if (video) {
      video.play();
      setIsPlaying(true);
    }
  };

  return (
    <React.Fragment>
      <h2 className=" text-center fw-semibold" id="boost-tagline">
        <img className="img-fluid" src={Logo} alt="Logo" id="Logostart" />
        <span id="color1">Unlock</span> Your Potential, Boost Yourself!
      </h2>
      <h4 id="text1" className="text-center pb-1 medium-weight">
        From Brainstorming to Focused Study
      </h4>
      <h6 className="text-center pb-4">Unlock Your Full Potential.</h6>
      <div className="container" id="button-row">
        <ul className="list-unstyled d-flex justify-content-center">
          <li className="btn p-3 m-1" id="abtus-btn">
            About Us
          </li>
          <li className="btn p-3 m-1" id="serv-btn">
            Services
          </li>
        </ul>
      </div>
      <div className="video-container d-flex justify-self-center mt-5 pt-5">
        <video
          id="custom-video"
          className="video-player"
          src={Video}
          loop
          onClick={handlePlay}
        ></video>

        {!isPlaying && (
          <button className="play-button" onClick={handlePlay}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              fill="white"
              viewBox="0 0 16 16"
            >
              <path d="M6.271 4.055a.5.5 0 0 1 .759-.424l4.5 3.25a.5.5 0 0 1 0 .838l-4.5 3.25A.5.5 0 0 1 6 10.25v-6.5a.5.5 0 0 1 .271-.445z" />
            </svg>
          </button>
        )}
      </div>

      <div className="container">
        <div className="row">
          <div className="col-sm">
            <h2 className="fw-semibold">Benefits</h2>
          </div>
          <div className="col-sm text-end">
            <li className="btn" id="viewall">
              View All
            </li>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-8">
            Lorem ipsum dolor sit amet consectetur. Tempus tincidunt etiam eget
            elit id imperdiet et. Cras eu sit dignissim lorem nibh et. Ac cum
            habitasse in velit fringilla feugiat senectus in.
          </div>
        </div>
        <div className="row pt-5">
          <div className="col-sm m-3 card">
            <h1 className="fw-bold text-end p-4">01</h1>
            <h5>Focus on your work task </h5>
            <span className="pb-5">
              Fit your coursework around your existing commitments and
              obligations.
            </span>
          </div>
          <div className="col-sm m-3 card">
            <h1 className="fw-bold text-end p-4">02</h1>
            <h5>Improve your productivity</h5>
            <span className="pb-5">
              Learn from industry experts who have hands-on experience in design
              and development.
            </span>
          </div>
          <div className="col-sm m-3 card">
            <h1 className="fw-bold text-end p-4">03</h1>
            <h5>Less Stress</h5>
            <span className="pb-5">
              When you ave better organization and task management. It help you
              feel less overwhelmed and lowers stress level.
            </span>
          </div>
        </div>
        <div className="row pt-2">
          <div className="col-sm m-3 card">
            <h1 className="fw-bold text-end p-4">04</h1>
            <h5>Quality of your work</h5>
            <span className="pb-5">
              Productivity tools often include feature like automated reminders
              and version control to help you minizie errors and maintain
              quality of work.
            </span>
          </div>
          <div className="col-sm m-3 card">
            <h1 className="fw-bold text-end p-4">05</h1>
            <h5>Growth Opportunities</h5>
            <span className="pb-5">
              Many individuals are motivated by career growth and professional
              development opportunities.
            </span>
          </div>
          <div className="col-sm m-3 card">
            <h1 className="fw-bold text-end p-4">06</h1>
            <h5>Reduce Burnout</h5>
            <span className="pb-5">
              Spending the right amount of time on daily processes makes you
              cope better with your worklaod, allowing you to complete tasks.
            </span>
          </div>
        </div>
        <div className="row mb-5 mt-5 pt-5">
          <div className="row mb-2">
            <div className="col-sm">
              <h2 className="fw-semibold">Our Services</h2>
            </div>
            <div className="col-sm text-end">
              <li className="btn" id="viewall">
                View All
              </li>
            </div>
          </div>

          <div className="col-sm-8">
            <span>
              Lorem ipsum dolor sit amet consectetur. Tempus tincidunt etiam
              eget elit id imperdiet et. Cras eu sit dignissim lorem nibh et. Ac
              cum eget habitasse in velit fringilla feugiat senectus in.
            </span>
          </div>
        </div>
        <div className="row d-flex justify-content-center">
          <div className="col-md-5 m-1 card">
            <img
              alt="place holder"
              src={Pomodoro}
              className="rounded mt-3"
              height={300}
            />
            <h5 className="fw-semibold m-3">Pomodoro Timer</h5>
            <span>
              A time management method based on 25-minute stretches of focused
              work broken by five-minute brakes.
            </span>
            <a className="btn m-2 mb-4" id="serv-btns">
              Know more!
            </a>
          </div>
          <div className="col-md-5 m-1 card">
            <img src={Todo} className="rounded mt-3" height={300} />
            <h5 className="fw-semibold m-3">To-Do List</h5>
            <span>
              A list of things you have to-do. That means basically anything and
              everything can be on your to-do list-but just because you've
              written your to-dos down doesn't mean your to-do list actually
              usefull.
            </span>
            <a className="btn m-2 mb-4" id="serv-btns">
              Know more!
            </a>
          </div>
        </div>
        <div className="row d-flex justify-content-center">
          <div className="col-md-5 m-1 card">
            <img
              alt="place holder"
              src={Brainstorming}
              className="rounded mt-3"
              height={300}
            />
            <h5 className="fw-semibold m-3">Brainstorming</h5>
            <span>
              A group problem-solving method that involves the spontaneous
              contribution of creative ideas and solutions.
            </span>
            <a className="btn m-2 mb-4" id="serv-btns">
              Know more!
            </a>
          </div>
          <div className="col-md-5 m-1 card">
            <img src={Tracker} className="rounded mt-3" height={300} />
            <h5 className="fw-semibold m-3">Tracker</h5>
            <span>
              Porvides individuals and teams with tools to plan, prioritize, and
              track their activities efficiently
            </span>
            <a className="btn m-2 mb-4" id="serv-btns">
              Know more!
            </a>
          </div>
        </div>
        <div className="row d-flex justify-content-center">
          <div className="col-md-5 m-1 card">
            <img src={Reward} className="rounded mt-3" height={300} />
            <h5 className="fw-semibold m-3">EXP and Achievement</h5>
            <span>A rewad systems for completing tasks</span>
            <a className="btn m-2 mb-4" id="serv-btns">
              Know more!
            </a>
          </div>
          <div className="col-md-5 m-1 card">
            <img src={Focus} className="rounded mt-3" height={300} />
            <h5 className="fw-semibold m-3">Focus Mode</h5>
            <span>A mode that turns off any distraction on your device</span>
            <a className="btn m-2 mb-4" id="serv-btns">
              Know more!
            </a>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Contentland;
