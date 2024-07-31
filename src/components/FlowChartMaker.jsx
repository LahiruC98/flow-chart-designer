import React, { useState, useEffect, useCallback } from "react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  MiniMap,
  Controls,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import "./index.css";
import Circle from "./shapes/Circle";
import RoundRectangle from "./shapes/RoundRectangle";
import Diamond from "./shapes/Diamond";
import Rectangle from "./shapes/Rectangle";

const initBgColor = "#1A192B";

const connectionLineStyle = { stroke: "#fff" };
const snapGrid = [20, 20];
const nodeTypes = {
  circle: Circle,
  roundRectangle: RoundRectangle,
  diamond: Diamond,
  rectangle: Rectangle,
};

const defaultViewport = { x: 0, y: 0, zoom: 1.5 };

const FlowChartMaker = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [bgColor, setBgColor] = useState(initBgColor);

  useEffect(() => {
    const onChange = (event) => {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id !== "2") {
            return node;
          }

          const color = event.target.value;

          setBgColor(color);

          return {
            ...node,
            data: {
              ...node.data,
              color,
            },
          };
        }),
      );
    };

    setNodes([
      {
        id: "1",
        type: "roundRectangle",
        data: { label: "An input node", id: "1", deleteSelectedNode },
        position: { x: 0, y: 50 },
        sourcePosition: "right",
      },
      {
        id: "2",
        type: "circle",
        data: { onChange: onChange, color: initBgColor, deleteSelectedNode },
        position: { x: 300, y: 50 },
      },
      {
        id: "3",
        type: "diamond",
        data: { label: "Output A", id: "1", deleteSelectedNode },
        position: { x: 650, y: 25 },
        targetPosition: "left",
      },
      {
        id: "4",
        type: "rectangle",
        data: { label: "Output B", id: "1", deleteSelectedNode },
        position: { x: 650, y: 100 },
        targetPosition: "left",
      },
    ]);

    setEdges([
      {
        id: "e1-2",
        source: "1",
        target: "2",
        animated: true,
        style: { stroke: "#fff" },
      },
      {
        id: "e2a-3",
        source: "2",
        target: "3",
        sourceHandle: "a",
        animated: true,
        style: { stroke: "#fff" },
      },
      {
        id: "e2b-4",
        source: "2",
        target: "4",
        sourceHandle: "b",
        animated: true,
        style: { stroke: "#fff" },
      },
    ]);
  }, [setEdges, setNodes]);

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge({ ...params, animated: true, style: { stroke: "#fff" } }, eds),
      ),
    [setEdges],
  );

  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node);
  }, []);

  const deleteSelectedNode = () => {
    if (selectedNode) {
      setNodes((nds) => nds.filter((node) => node.id !== selectedNode.id));
      setEdges((eds) =>
        eds.filter(
          (edge) =>
            edge.source !== selectedNode.id && edge.target !== selectedNode.id,
        ),
      );
      setSelectedNode(null);
    }
  };

  return (
    <>
      <ReactFlow
        nodes={nodes.map((node) => ({
          ...node,
          data: { ...node.data, deleteSelectedNode: deleteSelectedNode },
        }))}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        style={{ background: bgColor }}
        nodeTypes={nodeTypes}
        connectionLineStyle={connectionLineStyle}
        snapToGrid={true}
        snapGrid={snapGrid}
        defaultViewport={defaultViewport}
        fitView
        attributionPosition="bottom-left"
        onNodeClick={onNodeClick}
      >
        <MiniMap
          nodeStrokeColor={(n) => {
            if (n.type === "input") return "#0041d0";
            if (n.type === "selectorNode") return bgColor;
            if (n.type === "output") return "#ff0072";
          }}
          nodeColor={(n) => {
            if (n.type === "selectorNode") return bgColor;
            return "#fff";
          }}
        />
        <Controls />
      </ReactFlow>
    </>
  );
};

export default FlowChartMaker;
