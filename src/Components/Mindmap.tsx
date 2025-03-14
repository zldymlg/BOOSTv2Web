import React, { useState } from "react";
import "./Mindmap.css";

interface Node {
  id: number;
  x: number;
  y: number;
}

const Mindmap: React.FC = () => {
  const [nodes, setNodes] = useState<Node[]>([
    { id: 1, x: 250, y: 150 },
    { id: 2, x: 150, y: 250 },
    { id: 3, x: 350, y: 250 },
  ]);

  const addNode = (parentX: number, parentY: number) => {
    const newX = parentX + Math.random() * 100 - 50;
    const newY = parentY + Math.random() * 100 - 50;
    setNodes((prevNodes) => [
      ...prevNodes,
      { id: prevNodes.length + 1, x: newX, y: newY },
    ]);
  };

  return (
    <div className="mindmap-container">
      <h1 className="mindmap-title">Mind Map</h1>

      <div className="mindmap-wrapper">
        <svg className="mindmap-svg" width="600" height="400">
          <circle
            cx="300"
            cy="200"
            r="30"
            fill="#ffeb3b"
            stroke="#000"
            strokeWidth="2"
          />
          <text x="290" y="205" fontSize="12" fontWeight="bold">
            Idea
          </text>

          {nodes.map((node) => (
            <React.Fragment key={node.id}>
              <line
                x1="300"
                y1="200"
                x2={node.x}
                y2={node.y}
                stroke="#000"
                strokeWidth="2"
              />
              <circle
                cx={node.x}
                cy={node.y}
                r="20"
                fill="#fff"
                stroke="#000"
                strokeWidth="2"
              />
              <text x={node.x - 10} y={node.y + 5} fontSize="12">
                Node {node.id}
              </text>

              <circle
                cx={node.x + 30}
                cy={node.y}
                r="10"
                fill="black"
                stroke="white"
                strokeWidth="2"
                onClick={() => addNode(node.x, node.y)}
                style={{ cursor: "pointer" }}
              />
              <text x={node.x + 25} y={node.y + 5} fontSize="14" fill="white">
                +
              </text>
            </React.Fragment>
          ))}
        </svg>
      </div>
    </div>
  );
};

export default Mindmap;
