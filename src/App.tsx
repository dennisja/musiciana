import "@xyflow/react/dist/style.css";

import { Background, ReactFlow, useReactFlow } from "@xyflow/react";
import { shallow } from "zustand/shallow";
import { nodeTypes } from "./components/nodes/node-types";
import type { Store } from "./lib/store";
import { useStore } from "./lib/store";
import { SidePanel } from "./components/side-panel/side-panel";
import type { MuseFlowNodeType } from "./lib/types/nodes";
import { useCallback, useEffect, useRef } from "react";

const selector = (store: Store) => ({
  nodes: store.nodes,
  edges: store.edges,
  addNode: store.addNode,
  addEdge: store.addEdge,
  onNodesChange: store.onNodesChange,
  onEdgesChange: store.onEdgesChange,
  removeNodes: store.removeNodes,
  createNode: store.createNode,
  theme: store.theme,
});

function App() {
  const store = useStore(selector, shallow);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { screenToFlowPosition } = useReactFlow();

  // Initialize theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme && savedTheme !== store.theme) {
      useStore.getState().toggleTheme();
    } else if (store.theme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Persist theme changes
  useEffect(() => {
    localStorage.setItem("theme", store.theme);
  }, [store.theme]);

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

      store.createNode(type, position);
    },
    [screenToFlowPosition, store]
  );

  return (
    <div
      ref={reactFlowWrapper}
      style={{ width: "100%", height: "100%", paddingRight: "384px" }}
    >
      <ReactFlow
        nodes={store.nodes}
        edges={store.edges}
        nodeTypes={nodeTypes}
        onNodesChange={store.onNodesChange}
        onEdgesChange={store.onEdgesChange}
        onConnect={store.addEdge}
        onNodesDelete={store.removeNodes}
        onDrop={onDrop}
        onDragOver={onDragOver}
      >
        <Background />
      </ReactFlow>
      <SidePanel />
    </div>
  );
}

export default App;
