import React, { useRef, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Save } from "lucide-react";

interface Shape {
  type: string;
  x: number;
  y: number;
  color: string;
}

interface MindFlowProps {
  onBack: () => void;
}

export default function MindFlow({ onBack }: MindFlowProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [color, setColor] = useState<string>("#ffffff");
  const [drawingColor, setDrawingColor] = useState<string>("#000000");
  const [drawingShape, setDrawingShape] = useState<string>("circle");
  const [drawMode, setDrawMode] = useState<boolean>(true); // Default to draw mode
  const [lineWidth, setLineWidth] = useState<number>(5); // Default line width
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [draggingShapeIndex, setDraggingShapeIndex] = useState<number | null>(
    null
  );

  const drawShapes = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    shapes.forEach((shape) => {
      ctx.fillStyle = shape.color;
      if (shape.type === "circle") {
        ctx.beginPath();
        ctx.arc(shape.x, shape.y, 20, 0, 2 * Math.PI);
        ctx.fill();
      } else if (shape.type === "rectangle") {
        ctx.fillRect(shape.x - 20, shape.y - 20, 40, 40);
      }
    });
  };

  const handleAddShape = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = rect.width / 2; // Center of the canvas
    const y = rect.height / 2;

    const newShape: Shape = {
      type: drawingShape,
      x,
      y,
      color: drawingColor,
    };

    setShapes((prevShapes) => [...prevShapes, newShape]);
    drawShapes();
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const shapeIndex = shapes.findIndex((shape) => {
      if (shape.type === "circle") {
        const dx = x - shape.x;
        const dy = y - shape.y;
        return Math.sqrt(dx * dx + dy * dy) <= 20;
      } else if (shape.type === "rectangle") {
        return (
          x >= shape.x - 20 &&
          x <= shape.x + 20 &&
          y >= shape.y - 20 &&
          y <= shape.y + 20
        );
      }
      return false;
    });

    if (shapeIndex !== -1) {
      setDraggingShapeIndex(shapeIndex);
    } else if (drawMode) {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      isDrawing.current = true;
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (draggingShapeIndex !== null) {
      setShapes((prevShapes) =>
        prevShapes.map((shape, index) =>
          index === draggingShapeIndex ? { ...shape, x, y } : shape
        )
      );
      drawShapes();
    } else if (drawMode && isDrawing.current) {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.lineTo(x, y);
      ctx.strokeStyle = drawingColor;
      ctx.lineWidth = lineWidth;
      ctx.stroke();
    }
  };

  const handleMouseUp = () => {
    setDraggingShapeIndex(null);
    isDrawing.current = false;
  };

  const handleBackgroundColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColor(event.target.value);
    drawShapes();
  };

  const handleShapeColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (draggingShapeIndex !== null) {
      const newColor = event.target.value;
      setShapes((prevShapes) =>
        prevShapes.map((shape, index) =>
          index === draggingShapeIndex ? { ...shape, color: newColor } : shape
        )
      );
      drawShapes();
    }
  };

  const isDrawing = useRef<boolean>(false);

  return (
    <React.Fragment>
      <div className="mindflow-container">
        <IoIosArrowBack
          size={30}
          onClick={onBack}
          style={{ cursor: "pointer" }}
        />
        <span id="title">Blackboard</span>
        <Save size={30} />
      </div>
      <div className="controls">
        <label>
          Background Color:
          <input
            type="color"
            value={color}
            onChange={handleBackgroundColorChange}
          />
        </label>
        <label>
          Drawing Color:
          <input
            type="color"
            value={drawingColor}
            onChange={(e) => setDrawingColor(e.target.value)}
          />
        </label>
        <label>
          Line Width:
          <input
            type="range"
            min="1"
            max="20"
            value={lineWidth}
            onChange={(e) => setLineWidth(Number(e.target.value))}
          />
        </label>
        <label>
          Shape:
          <select
            value={drawingShape}
            onChange={(e) => setDrawingShape(e.target.value)}
          >
            <option value="circle">Circle</option>
            <option value="rectangle">Rectangle</option>
          </select>
        </label>
        <button onClick={handleAddShape}>Add Shape</button>
        {draggingShapeIndex !== null && (
          <label>
            Change Shape Color:
            <input type="color" onChange={handleShapeColorChange} />
          </label>
        )}
      </div>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        style={{
          border: "1px solid black",
          backgroundColor: color,
          cursor: draggingShapeIndex !== null ? "move" : drawMode ? "crosshair" : "default",
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp} // Stop drawing if the mouse leaves the canvas
      ></canvas>
    </React.Fragment>
  );
}