import { useStore } from "@/lib/store";
import type { AmplifierNode } from "@/lib/types/nodes";
import { Volume2 } from "lucide-react";

type GainSectionProps = {
  node: AmplifierNode;
};

export const GainSection = ({ node }: GainSectionProps) => {
  const updateNodeData = useStore((s) => s.updateNodeData);

  const handleGainChange = (value: number) => {
    updateNodeData({
      id: node.id,
      type: "gain",
      data: { gain: value },
    });
  };

  const handleLabelChange = (value: string) => {
    updateNodeData({
      id: node.id,
      type: "gain",
      data: { label: value },
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Node Info */}
      <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
        <div className="w-12 h-12 bg-[#3b82f6] rounded-lg flex items-center justify-center">
          <Volume2 className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">Gain Node</h3>
          <p className="text-sm text-gray-500">
            Adjust signal amplitude
          </p>
        </div>
      </div>

      {/* Label Input */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-900">Label</label>
        <input
          type="text"
          value={node.data.label}
          onChange={(e) => handleLabelChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          placeholder="Enter node label"
        />
      </div>

      {/* Gain Slider */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-900">Gain</label>
        <p className="text-xs text-gray-500">
          Control the volume/amplitude of the audio signal
        </p>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={node.data.gain}
          onChange={(e) => handleGainChange(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-4
            [&::-webkit-slider-thumb]:h-4
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-blue-500
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:shadow-md
            [&::-moz-range-thumb]:w-4
            [&::-moz-range-thumb]:h-4
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-blue-500
            [&::-moz-range-thumb]:border-0
            [&::-moz-range-thumb]:cursor-pointer"
        />
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">0%</span>
          <span className="text-gray-900 font-medium">
            {(node.data.gain * 100).toFixed(0)}%
          </span>
          <span className="text-gray-500">100%</span>
        </div>
      </div>
    </div>
  );
};
