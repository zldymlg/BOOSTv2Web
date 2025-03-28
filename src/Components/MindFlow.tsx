import React, { useState } from "react";
import "./MindFlow.css";
import { IoIosArrowBack } from "react-icons/io";
import { Save } from "lucide-react";
import ReactFlow, { Controls, Background } from "reactflow";
import "reactflow/dist/style.css";

interface MindFlowProps {
  onBack: () => void;
}

const initialNodes = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "Start" }, type: "input" },
  { id: "2", position: { x: 200, y: 100 }, data: { label: "Process" } },
  { id: "3", position: { x: 400, y: 200 }, data: { label: "End" }, type: "output" }
];

const initialEdges = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e2-3", source: "2", target: "3" }
];

export default function MindFlow({ onBack }: MindFlowProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleToolbox = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <React.Fragment>
      <div className="mindflow-container">
        <IoIosArrowBack size={30} onClick={onBack} style={{ cursor: "pointer" }} />
        <span id="title">Mind Flow</span>
        <Save size={30} />
      </div>
      {/* mindflow here */}
      <div id="flow">
        <ReactFlow nodes={initialNodes} edges={initialEdges} fitView>
          <Controls />
          <Background />
        </ReactFlow>
      </div>
      {/* Toolbox */}
      <div
        className={`toolbox ${isExpanded ? "expanded" : ""}`}
        onClick={toggleToolbox}
      >
        {isExpanded ? (
          <div className="toolbox-content">
            <p>Toolbox Content</p>
            <p>Additional Options</p>
          </div>
        ) : (
          <span>Toolbox</span>
        )}
      </div>
    </React.Fragment>
  );
};