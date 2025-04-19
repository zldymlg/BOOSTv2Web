import React, { useRef, useState } from "react";
import "./Blackboard.css";

interface BlackboardProps {
  onBack: () => void;
}

export default function Blackboard({ onBack }: BlackboardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawing, setDrawing] = useState(false);
  const [tool, setTool] = useState<"draw" | "eraser">("draw");
  const [color, setColor] = useState("#000000");
  const [lineWidth, setLineWidth] = useState(5);
  const [brushType, setBrushType] = useState<"round" | "square">("round");
  const [zoom, setZoom] = useState(1);
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo((e.clientX - rect.left) / zoom, (e.clientY - rect.top) / zoom);
    setDrawing(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!drawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    ctx.lineTo((e.clientX - rect.left) / zoom, (e.clientY - rect.top) / zoom);

    if (tool === "eraser") {
      ctx.strokeStyle = "#ffffff"; // Eraser color (white background)
    } else {
      ctx.strokeStyle = color;
    }

    ctx.lineWidth = lineWidth;
    ctx.lineCap = brushType;
    ctx.stroke();
  };

  const handleMouseUp = () => {
    setDrawing(false);
  };

  const handleZoom = (direction: "in" | "out") => {
    setZoom((prevZoom) => (direction === "in" ? prevZoom * 1.2 : prevZoom / 1.2));
  };

  const handleResizeCanvas = (width: number, height: number) => {
    setCanvasSize({ width, height });
  };

  return (
    <div className="blackboard-container">
      <div className="toolbar">
        <button onClick={() => setTool("draw")}>✏️ Draw</button>
        <button onClick={() => setTool("eraser")}>🩹 Eraser</button>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          title="Choose Color"
        />
        <input
          type="range"
          min="1"
          max="20"
          value={lineWidth}
          onChange={(e) => setLineWidth(Number(e.target.value))}
          title="Line Width"
        />
        <select
          value={brushType}
          onChange={(e) => setBrushType(e.target.value as "round" | "square")}
          title="Brush Type"
        >
          <option value="round">Round</option>
          <option value="square">Square</option>
        </select>
        <button onClick={() => handleZoom("in")}>🔍 Zoom In</button>
        <button onClick={() => handleZoom("out")}>🔍 Zoom Out</button>
        <label>
          Width:
          <input
            type="number"
            value={canvasSize.width}
            onChange={(e) => handleResizeCanvas(Number(e.target.value), canvasSize.height)}
            style={{ width: "60px" }}
          />
        </label>
        <label>
          Height:
          <input
            type="number"
            value={canvasSize.height}
            onChange={(e) => handleResizeCanvas(canvasSize.width, Number(e.target.value))}
            style={{ width: "60px" }}
          />
        </label>
      </div>
      <div className="canvas-container">
        <canvas
          ref={canvasRef}
          width={canvasSize.width}
          height={canvasSize.height}
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: "0 0",
            backgroundColor: "#ffffff",
            cursor: tool === "draw" || tool === "eraser" ? "crosshair" : "default",
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        ></canvas>
      </div>
    </div>
  );
}