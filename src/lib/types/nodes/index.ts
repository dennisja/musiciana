import type { Node } from "@xyflow/react";

type MuseFlowNodeType = "gain" | "oscillator" | "audioOutput";

type AmplifierNodeData = {
  gain: number;
  label: string;
};

type OscillatorNodeData = {
  frequency: number;
  label: string;
  waveform: OscillatorType;
};

type AudioOutputNodeData = {
  label: string;
};

type AmplifierNode = Node<AmplifierNodeData> & {
  data: AmplifierNodeData;
  type: "gain";
};

type AmplifierNodeUpdate = Pick<AmplifierNode, "id" | "type"> & {
  data: Partial<AmplifierNodeData>;
};

type AmplifierNodeCreateData = Pick<AmplifierNode, "id" | "type"> & {
  data: Partial<AmplifierNodeData>;
};

type OscillatorNode = Node<OscillatorNodeData> & {
  data: OscillatorNodeData;
  type: "oscillator";
};

type OscillatorNodeCreateData = Pick<OscillatorNode, "id" | "type"> & {
  data: Partial<OscillatorNodeData>;
};

type OscillatorNodeUpdate = Pick<OscillatorNode, "id" | "type"> & {
  data: Partial<OscillatorNodeData>;
};

type AudioOutputNodeCreateData = Pick<AudioOutputNode, "id" | "type"> & {
  data: Partial<AudioOutputNodeData>;
};

type AudioOutputNode = Node<AudioOutputNodeData> & {
  data: AudioOutputNodeData;
  type: "audioOutput";
};

type AudioOutputNodeUpdate = Pick<AudioOutputNode, "id" | "type"> & {
  data: Partial<AudioOutputNodeData>;
};

type MuseFlowNode = AmplifierNode | OscillatorNode | AudioOutputNode;

type UpdateMuseFlowNodeData =
  | AmplifierNodeUpdate
  | OscillatorNodeUpdate
  | AudioOutputNodeUpdate;

type CreateMuseFlowNodeData =
  | AmplifierNodeCreateData
  | OscillatorNodeCreateData
  | AudioOutputNodeCreateData;

const isAmplifierNode = (node: unknown): node is AmplifierNode => {
  return (
    typeof node === "object" &&
    node !== null &&
    "type" in node &&
    node.type === "gain"
  );
};

const isOscillatorNode = (node: unknown): node is OscillatorNode => {
  return (
    typeof node === "object" &&
    node !== null &&
    "type" in node &&
    node.type === "oscillator"
  );
};

const isAudioOutputNode = (node: unknown): node is AudioOutputNode => {
  return (
    typeof node === "object" &&
    node !== null &&
    "type" in node &&
    node.type === "audioOutput"
  );
};

export type {
  UpdateMuseFlowNodeData,
  MuseFlowNode,
  AmplifierNode,
  OscillatorNode,
  AudioOutputNode,
  MuseFlowNodeType,
  AmplifierNodeData,
  OscillatorNodeData,
  AudioOutputNodeData,
  CreateMuseFlowNodeData,
};

export { isAmplifierNode, isOscillatorNode, isAudioOutputNode };
