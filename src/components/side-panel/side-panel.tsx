import { useStore, type Store } from "@/lib/store";
import { X } from "lucide-react";
import { useEffect } from "react";
import { GainSection } from "./sections/gain-section";
import { OscillatorSection } from "./sections/oscillator-section";
import { OutputSection } from "./sections/output-section";
import { shallow } from "zustand/shallow";

const selector = (store: Store) => ({
  selectedNodeId: store.selectedNodeId,
  nodes: store.nodes,
  clearSelectedNode: store.clearSelectedNode,
});

export const SidePanel = () => {
  const store = useStore(selector, shallow);
  const selectedNode = store.nodes.find((n) => n.id === store.selectedNodeId);

  // Close on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        store.clearSelectedNode();
      }
    };

    if (store.selectedNodeId) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [store.selectedNodeId, store.clearSelectedNode]);

  if (!selectedNode) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 animate-in fade-in duration-200"
        onClick={store.clearSelectedNode}
      />

      {/* Side Panel */}
      <div className="fixed inset-y-0 right-0 w-96 bg-white shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Node Settings</h2>
          <button
            onClick={store.clearSelectedNode}
            className="p-1 hover:bg-gray-100 rounded-md transition-colors"
            aria-label="Close panel"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          {selectedNode.type === "gain" && <GainSection node={selectedNode} />}
          {selectedNode.type === "oscillator" && (
            <OscillatorSection node={selectedNode} />
          )}
          {selectedNode.type === "audioOutput" && (
            <OutputSection node={selectedNode} />
          )}
        </div>
      </div>
    </>
  );
};
