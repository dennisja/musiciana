# Liveblocks Integration

This project uses [Liveblocks](https://liveblocks.io/) for real-time collaboration, allowing multiple users to work on the same audio flowchart simultaneously.

## Setup

### 1. Get Your API Key

1. Create an account at [liveblocks.io](https://liveblocks.io/)
2. Go to your [dashboard](https://liveblocks.io/dashboard/apikeys)
3. Copy your **public** API key

### 2. Configure Environment

Create or update `.env.local`:

```env
VITE_LIVEBLOCKS_PUBLIC_KEY=pk_dev_xxxxxxxxxxxxxxxxxxxxxxxx
```

### 3. Run the App

```bash
pnpm install
pnpm dev
```

Open http://localhost:5173 in multiple windows to test collaboration!

## Features

### Real-time Sync
- **Nodes**: All audio nodes (oscillators, gain, output) sync across users
- **Edges**: Connections between nodes sync in real-time
- **Cursors**: See other users' cursor positions as they work

### Room Management

By default, all users connect to `"musiciana-room"`. To create separate sessions, add a `?room=` parameter:

```
http://localhost:5173/?room=my-session
```

Each unique room name creates a separate collaborative space.

## Architecture

### Zustand Middleware Pattern

We use the official Liveblocks Zustand middleware:

```typescript
// src/lib/store.ts
import { liveblocks } from "@liveblocks/zustand";
import { client } from "../liveblocks.config";

const useStore = create<WithLiveblocks<Store>>()(
  liveblocks(
    (set, get) => ({
      cursor: null,        // For presence
      nodes: [],          // Synced storage
      edges: [],          // Synced storage
      // ... other state
    }),
    {
      client,
      presenceMapping: { cursor: true },           // Real-time cursors
      storageMapping: { nodes: true, edges: true }, // Persistent sync
    }
  )
);
```

### How It Works

1. **Presence Mapping**: The `cursor` state is mapped to Liveblocks presence, giving us real-time cursor positions
2. **Storage Mapping**: The `nodes` and `edges` are mapped to Liveblocks storage, providing persistent real-time sync
3. **Automatic Sync**: The middleware automatically syncs all mapped state - no manual sync code needed!

### Entering/Leaving Rooms

```typescript
// src/App.tsx
const { enterRoom, leaveRoom } = useStore((state) => state.liveblocks);

useEffect(() => {
  enterRoom("musiciana-room");
  return () => leaveRoom();
}, [enterRoom, leaveRoom]);
```

### Accessing Collaboration Data

All Liveblocks data is available through the store:

```typescript
// Get connection status
const status = useStore((state) => state.liveblocks.status);

// Get other users
const others = useStore((state) => state.liveblocks.others);

// Get room instance
const room = useStore((state) => state.liveblocks.room);
```

## What's Synced

✅ **Synced Across Users:**
- Node positions and data
- Node connections (edges)
- Cursor positions
- Node creation/deletion

❌ **Local Only:**
- Theme preference (light/dark)
- Selected node
- Active side panel tab
- Audio playback state
- Audio parameter values

## Testing

1. Open the app in two browser windows
2. Add a node in window 1 → appears in window 2
3. Move nodes → position updates in real-time
4. Connect nodes → connections sync instantly
5. Move your cursor → see it in the other window

## Debug Panel

In development mode, a debug panel appears in the top-left showing:
- Connection status (should be green "connected")
- Number of connected users
- Number of nodes and edges in the store

## Deployment

When deploying, set the `VITE_LIVEBLOCKS_PUBLIC_KEY` environment variable:

- **Vercel**: Project Settings → Environment Variables
- **Netlify**: Site Settings → Environment Variables
- **Other platforms**: Follow their environment variable setup

## Learn More

- [Liveblocks Documentation](https://liveblocks.io/docs)
- [Zustand Middleware Guide](https://liveblocks.io/docs/api-reference/liveblocks-zustand)
- [Collaborative Flowchart Example](https://liveblocks.io/examples/collaborative-flowchart/zustand-flowchart)

## Troubleshooting

### "Status: connecting" or "disconnected"

1. Check your API key in `.env.local`
2. Restart the dev server
3. Check browser console for errors
4. Verify key is valid at [liveblocks.io/dashboard](https://liveblocks.io/dashboard)

### Changes not syncing

1. Verify all windows use the same room ID
2. Check debug panel shows "connected" status
3. Try refreshing both windows
4. Check [Liveblocks status](https://status.liveblocks.io)

### Build errors

If you see TypeScript errors with the middleware, make sure:
1. You're using `create()()` with double parentheses
2. The store is typed with `WithLiveblocks<Store>`
3. You import `client` from `liveblocks.config.ts`

---

**Built with:** Liveblocks, Zustand, React Flow, Web Audio API
