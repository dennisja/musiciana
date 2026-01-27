import type { NodeTypes } from "@xyflow/react";
import { GenericNode } from "./generic-node";

const nodeTypes: NodeTypes = {
  oscillator: GenericNode,
  gain: GenericNode,
  audioOutput: GenericNode,
};

export { nodeTypes };
