import "@xyflow/react/dist/style.css";

import { Background, Panel, ReactFlow } from "@xyflow/react";
import { shallow } from "zustand/shallow";
import { nodeTypes } from "./components/nodes/node-types";
import type { Store } from "./lib/store";
import { useStore } from "./lib/store";
import { Waves, Volume2, Speaker } from "lucide-react";
import { SidePanel } from "./components/side-panel/side-panel";

const selector = (store: Store) => ({
  nodes: store.nodes,
  edges: store.edges,
  addNode: store.addNode,
  addEdge: store.addEdge,
  onNodesChange: store.onNodesChange,
  onEdgesChange: store.onEdgesChange,
  removeNodes: store.removeNodes,
  createNode: store.createNode,
  hasOutputNode: store.nodes.some((node) => node.type === "audioOutput"),
});

function App() {
  // helps us avoid re-rendering the entire app when the store changes
  const store = useStore(selector, shallow);

  return (
    <>
      <ReactFlow
        nodes={store.nodes}
        edges={store.edges}
        nodeTypes={nodeTypes}
        onNodesChange={store.onNodesChange}
        onEdgesChange={store.onEdgesChange}
        onConnect={store.addEdge}
        onNodesDelete={store.removeNodes}
      >
        <Panel position="top-center">
          <div className="flex gap-2 bg-white/90 backdrop-blur-sm p-2 rounded-xl shadow-lg border border-gray-200">
            <button
              onClick={() => store.createNode("oscillator")}
              className="flex items-center gap-2 px-4 py-2 bg-[#c94d8c] hover:bg-[#b33d7c] text-white text-sm font-medium rounded-lg transition-colors"
            >
              <Waves className="w-4 h-4" />
              Oscillator
            </button>
            <button
              onClick={() => store.createNode("gain")}
              className="flex items-center gap-2 px-4 py-2 bg-[#3b82f6] hover:bg-[#2563eb] text-white text-sm font-medium rounded-lg transition-colors"
            >
              <Volume2 className="w-4 h-4" />
              Gain
            </button>
            <button
              onClick={() => store.createNode("audioOutput")}
              disabled={store.hasOutputNode}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                store.hasOutputNode
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-[#10b981] hover:bg-[#059669] text-white"
              }`}
            >
              <Speaker className="w-4 h-4" />
              Output
            </button>
          </div>
        </Panel>
        <Background />
      </ReactFlow>
      <SidePanel />
    </>
  );
}

export default App;
