import type { MuseFlowNode } from "./types";
import {
  type CreateMuseFlowNodeData,
  type UpdateMuseFlowNodeData,
} from "./types/nodes";

const context = new AudioContext();
const nodes = new Map<string, AudioNode>();

const updateAudioNode = (data: UpdateMuseFlowNodeData) => {
  const node = nodes.get(data.id);
  if (!node) return;

  if (data.type === "oscillator" && node instanceof OscillatorNode) {
    node.frequency.value = data.data.frequency ?? node.frequency.value;
    node.type = data.data.waveform ?? node.type;
  } else if (data.type === "gain" && node instanceof GainNode) {
    node.gain.value = data.data?.gain ?? node.gain.value;
  }
};

const removeAudioNode = (nodeId: string) => {
  const node = nodes.get(nodeId);
  if (!node) return;
  node.disconnect();
  if ("stop" in node && typeof node.stop === "function") node.stop();
  nodes.delete(nodeId);
};

const connectAudioNodes = (sourceId: string, targetId: string) => {
  const sourceNode = nodes.get(sourceId);
  const targetNode = nodes.get(targetId);
  if (!sourceNode || !targetNode) return;
  sourceNode.connect(targetNode);
};

function isRunning() {
  console.log("isRunning", context.state);
  return context.state === "running";
}

async function toggleAudio() {
  if (isRunning()) {
    await context.suspend();
  } else {
    await context.resume();
  }
}

function createAudioNode(node: CreateMuseFlowNodeData) {
  console.log("createAudioNode", node);
  switch (node.type) {
    case "oscillator": {
      const oscillator = context.createOscillator();
      oscillator.frequency.value = node.data?.frequency ?? 440;
      oscillator.type = node.data?.waveform ?? "sine";
      oscillator.start();
      nodes.set(node.id, oscillator);
      return oscillator;
    }
    case "gain": {
      const gain = context.createGain();
      gain.gain.value = node.data?.gain ?? 0.5;
      nodes.set(node.id, gain);
      return gain;
    }
    case "audioOutput":
      nodes.set(node.id, context.destination);
      return context.destination;
    default:
      throw new Error(
        `Unknown node type: ${(node as unknown as MuseFlowNode).type}`
      );
  }
}

export {
  isRunning,
  toggleAudio,
  nodes,
  updateAudioNode,
  removeAudioNode,
  connectAudioNodes,
  createAudioNode,
};
