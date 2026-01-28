# Musiciana

A collaborative visual audio programming environment built with React, TypeScript, and Liveblocks.

## Features

- 🎵 **Visual Audio Programming**: Create audio synthesizers by connecting nodes
- 🤝 **Real-time Collaboration**: Multiple users can work together simultaneously
- 🎨 **Modern UI**: Beautiful dark/light theme with responsive design
- ⚡ **Fast & Responsive**: Built with Vite and optimized for performance

## Getting Started

### Prerequisites

- Node.js 18+ and pnpm installed
- A Liveblocks account (free tier available)

### Installation

1. Clone the repository
2. Install dependencies:

```bash
pnpm install
```

3. Set up Liveblocks (see [LIVEBLOCKS_SETUP.md](./LIVEBLOCKS_SETUP.md) for detailed instructions):
   - Create a Liveblocks account at [liveblocks.io](https://liveblocks.io/)
   - Get your public API key from the dashboard
   - Add it to `.env.local`:

```env
VITE_LIVEBLOCKS_PUBLIC_KEY=your_public_key_here
```

4. Start the development server:

```bash
pnpm dev
```

5. Open [http://localhost:5173](http://localhost:5173) in multiple browser windows to test collaboration

## Available Nodes

- **Oscillator**: Generates audio waveforms (sine, square, sawtooth, triangle)
- **Gain**: Controls volume/amplitude
- **Audio Output**: The final output node (connects to speakers)

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Zustand** - State management
- **React Flow** - Node-based UI
- **Liveblocks** - Real-time collaboration
- **Tailwind CSS** - Styling
- **Web Audio API** - Audio processing

## Project Structure

```
src/
├── components/
│   ├── nodes/          # Audio node components
│   ├── side-panel/     # Settings panel and node library
│   ├── cursors.tsx     # Collaborative cursors
│   └── room.tsx        # Liveblocks room provider
├── lib/
│   ├── audio.ts        # Web Audio API integration
│   ├── store.ts        # Zustand store with Liveblocks
│   └── types/          # TypeScript type definitions
├── liveblocks.config.ts # Liveblocks configuration
└── App.tsx             # Main application component
```

## Collaboration

This project uses [Liveblocks](https://liveblocks.io/) for real-time collaboration. See [LIVEBLOCKS.md](./LIVEBLOCKS.md) for:

- Setup instructions
- How collaboration works
- Architecture overview
- Troubleshooting guide

## Development

```bash
# Start dev server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Lint code
pnpm lint
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT
