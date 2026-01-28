import { useStore } from "../lib/store";

export function DebugPanel() {
  const liveblocks = useStore((state) => state.liveblocks);
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);

  // Only show in development
  if (import.meta.env.PROD) return null;

  const status = liveblocks.status;
  const others = liveblocks.others;

  return (
    <div className="fixed top-4 left-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg text-xs font-mono z-50 max-w-md">
      <div className="font-bold mb-2">Liveblocks Debug</div>
      <div className="space-y-1">
        <div>Status: <span className={status === "connected" ? "text-green-500" : "text-yellow-500"}>{status}</span></div>
        <div>Connected users: {others.length + 1}</div>
        <div>Nodes in store: {nodes.length}</div>
        <div>Edges in store: {edges.length}</div>
        {status !== "connected" && (
          <div className="mt-2 text-red-500">
            ⚠️ Not connected. Check your API key in .env.local
          </div>
        )}
      </div>
    </div>
  );
}
