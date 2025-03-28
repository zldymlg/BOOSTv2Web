import React, { useState, useCallback } from "react";
import "./MindFlow.css";
import { IoIosArrowBack } from "react-icons/io";
import { Save } from "lucide-react";
import ReactFlow, {
  Controls,
  Background,
  addEdge,
  useNodesState,
  useEdgesState,
  Connection,
  Edge,
  Node,
} from "reactflow";
import "reactflow/dist/style.css";

interface MindFlowProps {
  onBack: () => void;
}

const initialNodes: Node[] = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "Start" }, type: "input" },
  { id: "2", position: { x: 200, y: 100 }, data: { label: "Process" } },
  { id: "3", position: { x: 400, y: 200 }, data: { label: "End" }, type: "output" },
];

const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e2-3", source: "2", target: "3" },
];

export default function MindFlow({ onBack }: MindFlowProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const toggleToolbox = () => {
    setIsExpanded(!isExpanded);
  };

  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  const addNode = () => {
    const newNode: Node = {
      id: `${nodes.length + 1}`,
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: { label: `Node ${nodes.length + 1}` },
      type: "default",
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const onNodeDoubleClick = (event: React.MouseEvent, node: Node) => {
    const newLabel = prompt("Enter new label:", node.data.label);
    if (newLabel) {
      setNodes((nds) =>
        nds.map((n) => (n.id === node.id ? { ...n, data: { ...n.data, label: newLabel } } : n))
      );
    }
  };

  const changeNodeColor = (nodeId: string, color: string) => {
    setNodes((nds) =>
      nds.map((n) =>
        n.id === nodeId ? { ...n, style: { ...n.style, backgroundColor: color } } : n
      )
    );
  };

  const onNodeClick = (event: React.MouseEvent, node: Node) => {
    setSelectedNodeId(node.id);
  };

  return (
    <React.Fragment>
      <div className="mindflow-container">
        <IoIosArrowBack size={30} onClick={onBack} style={{ cursor: "pointer" }} />
        <span id="title">Mind Flow</span>
        <Save size={30} />
      </div>
      <div id="flow">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeDoubleClick={onNodeDoubleClick}
          onNodeClick={onNodeClick}
          fitView
        >
          <Controls />
          <Background />
        </ReactFlow>
      </div>
      <div
        className={`toolbox ${isExpanded ? "expanded" : ""}`}
        onClick={toggleToolbox}
      >
        {isExpanded ? (
          <div className="toolbox-content">
            <button onClick={addNode}>Add Node</button>
            {selectedNodeId && (
              <div>
                <p>Change Node Color:</p>
                <input
                  type="color"
                  onChange={(e) => changeNodeColor(selectedNodeId, e.target.value)}
                />
              </div>
            )}
          </div>
        ) : (
          <span>Toolbox</span>
        )}
      </div>
    </React.Fragment>
  );
}