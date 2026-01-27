import { useStore, type Store } from "@/lib/store";
import { Library, Settings } from "lucide-react";
import { GainSection } from "./sections/gain-section";
import { OscillatorSection } from "./sections/oscillator-section";
import { OutputSection } from "./sections/output-section";
import { NodeLibrary } from "./node-library";
import { ThemeSwitcher } from "../theme-switcher";
import { shallow } from "zustand/shallow";

const selector = (store: Store) => ({
  selectedNodeId: store.selectedNodeId,
  nodes: store.nodes,
  activeTab: store.activeTab,
  setActiveTab: store.setActiveTab,
});

export const SidePanel = () => {
  const store = useStore(selector, shallow);
  const selectedNode = store.nodes.find((n) => n.id === store.selectedNodeId);

  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-white dark:bg-gray-900 shadow-2xl z-40 flex flex-col border-l border-gray-200 dark:border-gray-800">
      {/* Header with Theme Switcher */}
      <div className="flex items-center justify-end px-4 py-2 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
        <ThemeSwitcher />
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
        <button
          onClick={() => store.setActiveTab("library")}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-all ${
            store.activeTab === "library"
              ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 bg-white dark:bg-gray-900"
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
          }`}
        >
          <Library className="w-4 h-4" />
          Node Library
        </button>
        <button
          onClick={() => store.setActiveTab("settings")}
          disabled={!selectedNode}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-all ${
            store.activeTab === "settings" && selectedNode
              ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 bg-white dark:bg-gray-900"
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
          } ${!selectedNode ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <Settings className="w-4 h-4" />
          Node Settings
        </button>
      </div>

      {/* Content - Scrollable */}
      <div className="flex-1 overflow-y-auto">
        {store.activeTab === "library" && <NodeLibrary />}
        {store.activeTab === "settings" && selectedNode && (
          <>
            {selectedNode.type === "gain" && <GainSection node={selectedNode} />}
            {selectedNode.type === "oscillator" && (
              <OscillatorSection node={selectedNode} />
            )}
            {selectedNode.type === "audioOutput" && (
              <OutputSection node={selectedNode} />
            )}
          </>
        )}
        {store.activeTab === "settings" && !selectedNode && (
          <div className="flex items-center justify-center h-full p-8">
            <div className="text-center">
              <Settings className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Select a node to view its settings
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
