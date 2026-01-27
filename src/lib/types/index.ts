import type { MuseFlowNode, MuseFlowNodeType } from "./nodes";

export type Edge = {
  id: string;
  source: string;
  target: string;
};

export type { MuseFlowNode, MuseFlowNodeType };
