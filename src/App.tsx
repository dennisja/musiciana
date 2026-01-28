import "@xyflow/react/dist/style.css";

import { Background, ReactFlow, useReactFlow } from "@xyflow/react";
import { nodeTypes } from "./components/nodes/node-types";
import { useStore } from "./lib/store";
import { SidePanel } from "./components/side-panel/side-panel";
import type { MuseFlowNodeType } from "./lib/types/nodes";
import { useCallback, useEffect, useRef } from "react";
import { Cursors } from "./components/cursors";
import { DebugPanel } from "./components/debug-panel";

function App() {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);
  const onNodesChange = useStore((state) => state.onNodesChange);
  const onEdgesChange = useStore((state) => state.onEdgesChange);
  const addEdge = useStore((state) => state.addEdge);
  const removeNodes = useStore((state) => state.removeNodes);
  const createNode = useStore((state) => state.createNode);
  const setCursor = useStore((state) => state.setCursor);
  const { enterRoom, leaveRoom } = useStore((state) => state.liveblocks);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { screenToFlowPosition } = useReactFlow();
  
  // Enter Liveblocks room
  useEffect(() => {
    enterRoom("musiciana-room");
    return () => {
      leaveRoom();
    };
  }, [enterRoom, leaveRoom]);

  const theme = useStore((state) => state.theme);

  // Initialize theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme && savedTheme !== theme) {
      useStore.getState().toggleTheme();
    } else if (theme === "dark") {
      document.documentElement.classList.add("dark");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist theme changes
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Update cursor position for presence
  const onPointerMove = useCallback(
    (event: React.PointerEvent) => {
      if (!reactFlowWrapper.current) return;
      const rect = reactFlowWrapper.current.getBoundingClientRect();
      setCursor({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      });
    },
    [setCursor]
  );

  const onPointerLeave = useCallback(() => {
    setCursor(null);
  }, [setCursor]);

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      const type = event.dataTransfer.getData(
        "application/reactflow"
      ) as MuseFlowNodeType;

      if (!type) return;

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      createNode(type, position);
    },
    [screenToFlowPosition, createNode]
  );

  return (
    <div
      ref={reactFlowWrapper}
      style={{ width: "100%", height: "100%", paddingRight: "384px", position: "relative" }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={addEdge}
        onNodesDelete={removeNodes}
        onDrop={onDrop}
        onDragOver={onDragOver}
      >
        <Background />
      </ReactFlow>
      <Cursors />
      <DebugPanel />
      <SidePanel />
    </div>
  );
}

export default App;
