import React from "react";
import "./SmartGoals.css";
import { FaPlus } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";
import { Save } from "lucide-react";

export default function SmartGoals() {
  return (
    <React.Fragment>
      <div className="smart-goals-container">
        <div className="flex items-center space-x-2 text-base font-bold">
          <IoIosArrowBack className="text-black cursor-pointer" />
          <span className="title">SMART goals</span>
          <Save className="w-4 h-4 text-black" />
        </div>
        <div className="goal specific">
          <button className="plus-btn">
            <FaPlus size="20" />
          </button>
          Specific
        </div>
        <div className="goal measurable">
          <button className="plus-btn">
            <FaPlus size="20" />
          </button>
          Measurable
        </div>
        <div className="goal achievable">
          <button className="plus-btn">
            <FaPlus size="20" />
          </button>
          Achievable
        </div>
        <div className="goal relevant">
          <button className="plus-btn">
            <FaPlus size="20" />
          </button>
          Relevant
        </div>
        <div className="goal time-bound">
          <button className="plus-btn">
            <FaPlus size="20" />
          </button>
          Time-bound
        </div>
      </div>
    </React.Fragment>
  );
}
