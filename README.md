# MineMod - Minecraft Modding Platform

A comprehensive web platform for Minecraft server creation and mod development with an AI-assisted generator.

![MineMod Platform](https://img.shields.io/badge/MineMod-Platform-44bd32?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)

## Features

- **User-friendly Dashboard**: Monitor server performance, player activity, and system resources
- **Server Management**: Create, configure, and manage Minecraft servers with various distributions
- **Visual Mod Editor**: Drag-and-drop node-based editor for creating Minecraft mods without coding
- **AI-Assisted Mod Generation**: Create mods by describing what you want in natural language
- **Dark-themed UI**: Beautiful, intuitive interface designed specifically for modders

## Architecture

### Frontend

- **Framework**: React with TypeScript
- **UI Library**: Material UI
- **State Management**: Redux
- **Routing**: React Router
- **Visual Editor**: React Flow
- **Code Editor**: Monaco Editor
- **Charts**: Recharts
- **WebGL Support**: Three.js

### Backend

- **Framework**: Node.js with Express
- **Database**: PostgreSQL with Sequelize ORM
- **Authentication**: JWT
- **Container Management**: Docker and Dockerode
- **Logging**: Winston

### AI Integration

- **Model Format**: GGUF (GPU/CPU optimized)
- **WebAssembly Integration**: WebLLM
- **Model Fine-tuning**: Custom model trained on Minecraft modding code

## Screenshots

*Coming soon*

## Getting Started

See our [Setup Guide](SETUP.md) for detailed instructions on how to install and run the platform.

### Prerequisites

- Node.js 16 or higher
- Docker and Docker Compose
- PostgreSQL
- Java Development Kit (JDK) 17 or higher (for running Minecraft servers)

### Quick Start

```bash
# Clone the repository
git clone https://github.com/GrizzFuOnYou/MineMod.git
cd MineMod

# Install dependencies
cd client && npm install
cd ../server && npm install

# Start development servers
# Terminal 1
cd client && npm run dev

# Terminal 2
cd server && npm run dev
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [React Flow](https://reactflow.dev/) for the node-based editor
- [Material UI](https://mui.com/) for the UI components
- [WebLLM](https://github.com/mlc-ai/web-llm) for browser-based AI models
- [Three.js](https://threejs.org/) for WebGL rendering
- [Docker](https://www.docker.com/) for containerization
- And all the amazing contributors to the Minecraft modding community!
