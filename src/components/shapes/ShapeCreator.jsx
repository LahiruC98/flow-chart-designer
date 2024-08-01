import React, { memo, useEffect, useState } from "react";
import { Handle, Position, NodeToolbar } from "@xyflow/react";
import SelectNewNodeType from "../models/SelectNewNodeType";

export default memo(({ data, isConnectable, shapeType }) => {
  console.log("/???????", shapeType);
  const [bgColor, setBgColor] = useState("bg-lime-400");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [shape, setShape] = useState(null);
  const [isToolBarVisible, setIsToolBarVisible] = useState(
    data.forceToolbarVisible || undefined,
  );
  const handleCreateNewNode = () => {
    setIsToolBarVisible(false);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsToolBarVisible(data.forceToolbarVisible || undefined);
    setIsModalVisible(false);
  };

  useEffect(() => {
    switch (shapeType) {
      case "circle":
        setShape(<div className={`w-12 h-12 rounded-full ${bgColor}`}></div>);
        break;

      case "diamond":
        setShape(<div className={`w-12 h-12 rotate-45 ${bgColor}`}></div>);
        break;

      case "rectangle":
        setShape(<div className={`w-12 h-12 ${bgColor}`}></div>);
        break;

      case "roundRectangle":
        setShape(<div className={`w-20 h-12 rounded-lg ${bgColor}`}></div>);
        break;

      case "parallelogram":
        setShape(
          <div
            className={`w-20 h-12 ${bgColor}`}
            style={{
              transform: "skew(-30deg)",
            }}
          ></div>,
        );
        break;

      default:
        break;
    }
    console.log("-------------", shape);
  }, [shapeType, bgColor]);

  return (
    <>
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: "#555" }}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      />
      <NodeToolbar
        isVisible={isToolBarVisible}
        position={Position.Top}
        className="flex-auto p-2 bg-slate-600 rounded-lg"
      >
        <button
          className="w-8 h-8 rounded-full bg-orange-400"
          onClick={() => setBgColor("bg-orange-400")}
        ></button>
        <button
          className="w-8 h-8 rounded-full mx-2 bg-lime-400"
          onClick={() => setBgColor("bg-lime-400")}
        ></button>
        <button
          className="w-8 h-8 rounded-full bg-fuchsia-400"
          onClick={() => setBgColor("bg-fuchsia-400")}
        ></button>
      </NodeToolbar>
      <NodeToolbar
        isVisible={isToolBarVisible}
        position={Position.Right}
        className="flex-auto p-2 bg-slate-600 rounded-lg"
      >
        <button
          className="w-8 h-8 rounded-full bg-red-500 text-white ms-2"
          onClick={() => data.deleteSelectedNode()}
        >
          X
        </button>
        <button
          className="w-8 h-8 rounded-full bg-green-500 text-white ms-2"
          onClick={handleCreateNewNode}
        >
          +
        </button>
      </NodeToolbar>
      <div className={`w-12 h-12 rounded-full ${bgColor}`}></div>
      <Handle
        type="source"
        position={Position.Right}
        id="a"
        style={{ top: 10, background: "#555" }}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="b"
        style={{ bottom: 10, top: "auto", background: "#555" }}
        isConnectable={isConnectable}
      />
      <SelectNewNodeType
        isVisible={isModalVisible}
        onClose={closeModal}
        onCreateNewNode={data.createNewNode}
      />
    </>
  );
});
