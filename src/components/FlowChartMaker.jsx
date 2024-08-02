import React, { useState, useEffect, useCallback } from "react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  MiniMap,
  Controls,
  Panel,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import "./index.css";
import Circle from "./shapes/Circle";
import RoundRectangle from "./shapes/RoundRectangle";
import Diamond from "./shapes/Diamond";
import Rectangle from "./shapes/Rectangle";
import Parallelogram from "./shapes/Parallelogram";
const initBgColor = "#1A192B";

const connectionLineStyle = { stroke: "#fff" };
const snapGrid = [20, 20];
const nodeTypes = {
  circle: Circle,
  roundRectangle: RoundRectangle,
  diamond: Diamond,
  rectangle: Rectangle,
  parallelogram: Parallelogram,
};

const defaultViewport = { x: 0, y: 0, zoom: 1.5 };

const FlowChartMaker = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [bgColor, setBgColor] = useState(initBgColor);
  const [colorMode, setColorMode] = useState("dark");

  useEffect(() => {
    setNodes([
      {
        id: "1",
        type: "circle",
        data: {
          label: "An input node",
          id: "1",
          deleteSelectedNode,
          createNewNode,
        },
        position: { x: 0, y: 50 },
        sourcePosition: "right",
      },
    ]);
  }, [setNodes]);

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

  const createNewNode = (type) => {
    const newNodeId = (nodes.length + 1).toString();
    const newNode = {
      id: newNodeId,
      type: type,
      data: {
        label: `Node ${newNodeId}`,
        id: newNodeId,
        deleteSelectedNode,
        createNewNode,
      },
      position: {
        x: selectedNode.position.x + Math.random() * 300 + 50,
        y: selectedNode.position.y + Math.random() * 200 + 50,
      },
      targetPosition: "left",
    };

    const newEdge = {
      type: "smoothstep",
      id: `e${selectedNode.id}-${newNodeId}`,
      source: selectedNode.id,
      target: newNodeId,
      animated: false,
      style: { stroke: "#6121c2", strokeWidth: 3 },
    };

    setNodes((nds) => [...nds, newNode]);
    setEdges((eds) => [...eds, newEdge]);
  };

  const onChange = (evt) => {
    setBgColor(() => (bgColor === initBgColor ? "#ccc" : initBgColor));
    setColorMode(evt.target.value);
  };

  return (
    <>
      <ReactFlow
        nodes={nodes.map((node) => ({
          ...node,
          data: {
            ...node.data,
            deleteSelectedNode: deleteSelectedNode,
            createNewNode: createNewNode,
          },
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
        colorMode={colorMode}
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
        <Panel position="top-right">
          <select onChange={onChange} data-testid="colormode-select">
            <option value="dark">dark</option>
            <option value="light">light</option>
            <option value="system">system</option>
          </select>
        </Panel>
      </ReactFlow>
    </>
  );
};

export default FlowChartMaker;
