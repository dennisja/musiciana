import { Waves, SlidersHorizontal, Speaker } from "lucide-react";
import type { MuseFlowNodeType } from "@/lib/types/nodes";

type NodeLibraryItem = {
  type: MuseFlowNodeType;
  label: string;
  description: string;
  icon: typeof Waves;
  color: string;
};

const nodeLibraryItems: NodeLibraryItem[] = [
  {
    type: "oscillator",
    label: "Oscillator",
    description: "Generate audio waveforms",
    icon: Waves,
    color: "#c94d8c",
  },
  {
    type: "gain",
    label: "Gain",
    description: "Control audio volume",
    icon: SlidersHorizontal,
    color: "#3b82f6",
  },
  {
    type: "audioOutput",
    label: "Output",
    description: "Audio output destination",
    icon: Speaker,
    color: "#10b981",
  },
];

export const NodeLibrary = () => {
  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: MuseFlowNodeType
  ) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Available Nodes
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Drag and drop nodes to the canvas
        </p>
      </div>

      <div className="space-y-3">
        {nodeLibraryItems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.type}
              draggable
              onDragStart={(event) => onDragStart(event, item.type)}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 cursor-grab active:cursor-grabbing hover:shadow-md transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600"
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: item.color }}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
                    {item.label}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{item.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <p className="text-xs text-blue-700 dark:text-blue-300">
          <span className="font-medium">Tip:</span> Connect nodes by dragging
          from output handles (bottom) to input handles (top)
        </p>
      </div>
    </div>
  );
};
