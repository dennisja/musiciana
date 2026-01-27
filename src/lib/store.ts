import {
  applyEdgeChanges,
  applyNodeChanges,
  type Connection,
  type EdgeChange,
  type NodeChange,
} from "@xyflow/react";
import { createWithEqualityFn } from "zustand/traditional";
import { generateUUID } from "./uuid";
import type { Edge } from "./types";
import type {
  MuseFlowNode,
  MuseFlowNodeType,
  UpdateMuseFlowNodeData,
} from "./types/nodes";
import {
  connectAudioNodes,
  createAudioNode,
  isRunning,
  removeAudioNode,
  toggleAudio,
  updateAudioNode,
} from "./audio";

type Store = {
  nodes: MuseFlowNode[];
  edges: Edge[];
  isRunning: boolean;
  selectedNodeId: string | null;
  addNode: (node: MuseFlowNode) => void;
  addEdge: (edge: Connection) => void;
  onNodesChange: (changes: NodeChange<MuseFlowNode>[]) => void;
  onEdgesChange: (changes: EdgeChange<Edge>[]) => void;
  updateNodeData: (nodeData: UpdateMuseFlowNodeData) => void;
  toggleRunning: () => void;
  removeNodes: (nodes: MuseFlowNode[]) => void;
  createNode: (type: MuseFlowNodeType) => void;
  selectNode: (nodeId: string) => void;
  clearSelectedNode: () => void;
};

const useStore = createWithEqualityFn<Store>((set, get) => ({
  nodes: [],
  edges: [],
  selectedNodeId: null,
  addNode: (node: MuseFlowNode) => {
    set({ nodes: [...get().nodes, node] });
  },
  addEdge: (connection: Connection) => {
    const newEdge: Edge = {
      id: generateUUID(),
      ...connection,
    };
    connectAudioNodes(connection.source, connection.target);
    set({ edges: [...get().edges, newEdge] });
  },
  onNodesChange: (changes: NodeChange<MuseFlowNode>[]) => {
    set({ nodes: applyNodeChanges(changes, get().nodes) });
  },
  onEdgesChange: (changes: EdgeChange<Edge>[]) => {
    set({ edges: applyEdgeChanges(changes, get().edges) });
  },
  updateNodeData: (nodeData: UpdateMuseFlowNodeData) => {
    updateAudioNode(nodeData);
    set({
      nodes: get().nodes.map<MuseFlowNode>((node) =>
        node.id === nodeData.id
          ? ({
              ...node,
              ...nodeData,
              data: { ...node.data, ...nodeData.data },
            } as MuseFlowNode)
          : node
      ),
    });
  },
  removeNodes: (nodes: MuseFlowNode[]) => {
    nodes.forEach((node) => {
      removeAudioNode(node.id);
    });
    set({ nodes: get().nodes.filter((node) => !nodes.includes(node)) });
  },
  isRunning: isRunning(),
  toggleRunning: () => {
    toggleAudio().then(() => {
      set({ isRunning: isRunning() });
    });
  },
  createNode: (type: MuseFlowNodeType) => {
    const id = generateUUID();
    const position = { x: 0, y: 0 };

    switch (type) {
      case "oscillator": {
        const data = {
          frequency: 440,
          waveform: "sine" as OscillatorType,
          label: "Oscillator",
          type: "oscillator" as MuseFlowNodeType,
        };
        createAudioNode({
          id,
          data,
          type: "oscillator",
        });
        set({
          nodes: [...get().nodes, { id, type: "oscillator", data, position }],
        });
        break;
      }
      case "gain": {
        const data = {
          gain: 0.5,
          label: "Gain",
          type: "gain" as MuseFlowNodeType,
        };
        createAudioNode({
          id,
          data,
          type: "gain",
        });
        set({
          nodes: [...get().nodes, { id, type: "gain", data, position }],
        });
        break;
      }
      case "audioOutput": {
        // Only allow one output node
        const hasOutputNode = get().nodes.some(
          (node) => node.type === "audioOutput"
        );
        if (hasOutputNode) return;

        const data = {
          label: "Output",
          type: "audioOutput" as MuseFlowNodeType,
        };
        createAudioNode({
          id,
          data,
          type: "audioOutput",
        });
        set({
          nodes: [...get().nodes, { id, type: "audioOutput", data, position }],
        });
        break;
      }
      default:
        throw new Error(`Unknown node type: ${type}`);
    }
  },
  selectNode: (nodeId: string) => {
    set({ selectedNodeId: nodeId });
  },
  clearSelectedNode: () => {
    set({ selectedNodeId: null });
  },
}));

export { useStore };
export type { Store };
