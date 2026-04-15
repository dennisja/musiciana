import { useStore } from "../lib/store";
import type { Cursor as CursorType } from "../lib/store";

const COLORS = [
  "#E57373",
  "#9575CD",
  "#4FC3F7",
  "#81C784",
  "#FFD54F",
  "#FF8A65",
  "#F06292",
  "#7986CB",
];

export function Cursors() {
  const others = useStore((state) => state.liveblocks.others);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 1000,
      }}
    >
      {others.map(({ connectionId, presence }) => {
        const cursor = presence.cursor as CursorType;
        if (!cursor) {
          return null;
        }

        return (
          <Cursor
            key={connectionId}
            color={COLORS[connectionId % COLORS.length]}
            x={cursor.x}
            y={cursor.y}
          />
        );
      })}
    </div>
  );
}

function Cursor({ color, x, y }: { color: string; x: number; y: number }) {
  return (
    <svg
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        transform: `translate(${x}px, ${y}px)`,
        pointerEvents: "none",
      }}
      width="24"
      height="36"
      viewBox="0 0 24 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
        fill={color}
      />
    </svg>
  );
}
