import { useStore } from "@/lib/store";
import { Handle, Position } from "@xyflow/react";
import { SlidersHorizontal, Waves, Speaker } from "lucide-react";
import type { MuseFlowNode } from "@/lib/types/nodes";

type GenericNodeProps = {
  id: string;
  data: MuseFlowNode["data"];
};

// Color and icon mapping based on node type
const nodeConfig = {
  gain: {
    color: "#3b82f6",
    icon: SlidersHorizontal,
    hasInput: true,
    hasOutput: true,
  },
  oscillator: {
    color: "#c94d8c",
    icon: Waves,
    hasInput: false,
    hasOutput: true,
  },
  audioOutput: {
    color: "#10b981",
    icon: Speaker,
    hasInput: true,
    hasOutput: false,
  },
} as const;

export const GenericNode = ({ id, data }: GenericNodeProps) => {
  const node = useStore((s) => s.nodes.find((n) => n.id === id));
  const selectNode = useStore((s) => s.selectNode);
  const selectedNodeId = useStore((s) => s.selectedNodeId);

  if (!node) return null;

  const config = nodeConfig[node.type];
  const Icon = config.icon;
  const isSelected = selectedNodeId === id;

  return (
    <div
      onClick={() => selectNode(id)}
      className={`w-[200px] rounded-xl bg-white dark:bg-gray-800 shadow-lg overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-xl ${
        isSelected ? "ring-2 ring-blue-500 dark:ring-blue-400 ring-offset-2 dark:ring-offset-gray-900" : ""
      }`}
    >
      {/* Input Handle */}
      {config.hasInput && (
        <Handle
          type="target"
          position={Position.Top}
          className="!w-3 !h-3 !bg-gray-800 dark:!bg-gray-300 !border-2 !border-white dark:!border-gray-800 hover:!w-4 hover:!h-4 transition-all"
        />
      )}

      {/* Header */}
      <div
        className="px-4 py-2 flex items-center gap-2"
        style={{ backgroundColor: config.color }}
      >
        <Icon className="w-5 h-5 text-white" />
        <span className="text-white text-lg font-medium">{data.label}</span>
      </div>

      {/* Content - Minimal display, editing happens in side panel */}
      <div className="p-4 text-center text-sm text-gray-500 dark:text-gray-400">
        Click to edit
      </div>

      {/* Output Handle */}
      {config.hasOutput && (
        <Handle
          type="source"
          position={Position.Bottom}
          className="!w-3 !h-3 !bg-gray-800 dark:!bg-gray-300 !border-2 !border-white dark:!border-gray-800 hover:!w-4 hover:!h-4 transition-all"
        />
      )}
    </div>
  );
};
