import { useStore } from "@/lib/store";
import type { AudioOutputNode } from "@/lib/types/nodes";
import { Speaker, Volume2, VolumeX } from "lucide-react";

type OutputSectionProps = {
  node: AudioOutputNode;
};

export const OutputSection = ({ node }: OutputSectionProps) => {
  const updateNodeData = useStore((state) => state.updateNodeData);
  const toggleRunning = useStore((state) => state.toggleRunning);
  const isRunning = useStore((state) => state.isRunning);

  const handleLabelChange = (value: string) => {
    updateNodeData({
      id: node.id,
      type: "audioOutput",
      data: { label: value },
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Node Info */}
      <div className="flex items-center gap-3 pb-4 border-b border-gray-200 dark:border-gray-700">
        <div className="w-12 h-12 bg-[#10b981] rounded-lg flex items-center justify-center">
          <Speaker className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">Output Node</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Route audio to speakers
          </p>
        </div>
      </div>

      {/* Label Input */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-900 dark:text-gray-100">Label</label>
        <input
          type="text"
          value={node.data.label}
          onChange={(e) => handleLabelChange(e.target.value)}
          className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-900 dark:text-gray-100"
          placeholder="Enter node label"
        />
      </div>

      {/* Audio Control */}
      <div className="space-y-4">
        <label className="text-sm font-semibold text-gray-900 dark:text-gray-100">
          Audio Playback
        </label>
        <div className="flex flex-col items-center gap-4 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <button
            onClick={toggleRunning}
            className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 ${
              isRunning
                ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300"
            }`}
          >
            {isRunning ? (
              <Volume2 className="w-10 h-10" />
            ) : (
              <VolumeX className="w-10 h-10" />
            )}
          </button>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {isRunning ? "Playing" : "Stopped"}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {isRunning ? "Audio is active" : "Click to start audio"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
