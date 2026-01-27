import { useStore, type Store } from "@/lib/store";
import type { OscillatorNode } from "@/lib/types/nodes";
import { Waves, ChevronDown } from "lucide-react";
import { shallow } from "zustand/shallow";

const selector = (store: Store) => ({
  updateNodeData: store.updateNodeData,
});

type OscillatorSectionProps = {
  node: OscillatorNode;
};

type Waveform = "sine" | "square" | "triangle" | "sawtooth";

export const OscillatorSection = ({ node }: OscillatorSectionProps) => {
  const { updateNodeData } = useStore(selector, shallow);

  const handleFrequencyChange = (value: number) => {
    updateNodeData({
      id: node.id,
      type: "oscillator",
      data: { frequency: value },
    });
  };

  const handleWaveformChange = (value: Waveform) => {
    updateNodeData({
      id: node.id,
      type: "oscillator",
      data: { waveform: value },
    });
  };

  const handleLabelChange = (value: string) => {
    updateNodeData({
      id: node.id,
      type: "oscillator",
      data: { label: value },
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Node Info */}
      <div className="flex items-center gap-3 pb-4 border-b border-gray-200 dark:border-gray-700">
        <div className="w-12 h-12 bg-[#c94d8c] rounded-lg flex items-center justify-center">
          <Waves className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">Oscillator Node</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Generate audio waveforms</p>
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

      {/* Frequency Slider */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-900 dark:text-gray-100">
          Frequency
        </label>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Set the oscillation frequency in Hertz
        </p>
        <input
          type="range"
          min={20}
          max={2000}
          step={1}
          value={node.data.frequency}
          onChange={(e) => handleFrequencyChange(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full appearance-none cursor-pointer
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
          <span className="text-gray-500 dark:text-gray-400">20 Hz</span>
          <span className="text-gray-900 dark:text-gray-100 font-medium">
            {node.data.frequency} Hz
          </span>
          <span className="text-gray-500 dark:text-gray-400">2000 Hz</span>
        </div>
      </div>

      {/* Waveform Select */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-900 dark:text-gray-100">
          Waveform
        </label>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Choose the oscillator waveform shape
        </p>
        <div className="relative">
          <select
            value={node.data.waveform}
            onChange={(e) => handleWaveformChange(e.target.value as Waveform)}
            className="w-full appearance-none bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 pr-8 text-gray-900 dark:text-gray-100 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          >
            <option value="sine">Sine</option>
            <option value="square">Square</option>
            <option value="triangle">Triangle</option>
            <option value="sawtooth">Sawtooth</option>
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};
