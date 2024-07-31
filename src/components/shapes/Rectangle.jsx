import React, { memo, useState } from "react";
import { Handle, Position, NodeToolbar } from "@xyflow/react";

const CustomShape = ({ data, isConnectable }) => {
  const [bgColor, setBgColor] = useState("bg-lime-400");

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
        isVisible={data.forceToolbarVisible || undefined}
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
        isVisible={data.forceToolbarVisible || undefined}
        position={Position.Right}
        className="flex-auto p-2 bg-slate-600 rounded-lg"
      >
        <button
          className="w-8 h-8 rounded-full bg-red-500 text-white ms-2"
          onClick={() => data.deleteSelectedNode()}
        >
          X
        </button>
      </NodeToolbar>
      <div className={`w-12 h-12 ${bgColor}`}></div>
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
    </>
  );
};

export default memo(CustomShape);
