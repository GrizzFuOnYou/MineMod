# Minecraft Modding Platform - Setup Guide

This guide will walk you through the setup process for the Minecraft Modding Platform, a comprehensive web application for creating and managing Minecraft mods and servers.

## Prerequisites

Before you begin, make sure you have the following installed:

- Node.js (v16 or later)
- npm (v8 or later)
- Docker and Docker Compose
- PostgreSQL (if running locally without Docker)
- Java Development Kit (JDK) 17 or higher (for running Minecraft servers)

## Project Structure

The project consists of several main components:

- **client**: React frontend application
- **server**: Node.js backend API
- **server-manager**: Docker-based Minecraft server manager
- **ai-service**: Service for AI-assisted mod generation

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/GrizzFuOnYou/MineMod.git
cd MineMod
```

### 2. Set Up Environment Variables

Create the following `.env` files:

For the client (`client/.env`):

```
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

For the server (`server/.env`):

```
NODE_ENV=development
PORT=5000
DATABASE_URL=postgres://postgres:postgres@localhost:5432/minecraft_mod_db
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_secure_jwt_secret_here
JWT_EXPIRES_IN=7d
SERVERS_PATH=./data/servers
CLIENT_URL=http://localhost:5173
```

### 3. Install Dependencies

Install dependencies for both client and server:

```bash
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install

# Return to root directory
cd ..
```

### 4. Set Up Database

If running PostgreSQL locally:

```bash
# Create the database
createdb minecraft_mod_db

# The server will automatically sync the database schema on startup
```

### 5. Start the Development Environment

#### Option 1: Run Individually

Start the backend server:

```bash
cd server
npm run dev
```

In a new terminal, start the frontend client:

```bash
cd client
npm run dev
```

#### Option 2: Using Docker Compose

Build and start all services using Docker Compose:

```bash
docker-compose up --build
```

### 6. Access the Application

- Frontend: http://localhost:5173 (or http://localhost:80 with Docker)
- Backend API: http://localhost:5000/api

## Development Workflow

### Client Development

The frontend is built with React, TypeScript, and Material UI. Use the following commands in the `client` directory:

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Server Development

The backend is built with Node.js, Express, and TypeScript. Use the following commands in the `server` directory:

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Database Management

The project uses Sequelize ORM for database operations. Database migrations and seed scripts are located in the `server/src/database` directory.

## Feature Areas

### 1. User Authentication

- Register, login, and user management
- JWT-based authentication
- Password reset functionality

### 2. Server Management

- Create, configure, and manage Minecraft servers
- Start/stop/restart server operations
- Real-time server monitoring
- Mod installation on servers

### 3. Visual Mod Editor

- Node-based visual programming for mods
- Drag-and-drop interface
- Code generation from visual nodes

### 4. AI-Assisted Mod Generation

- Natural language processing for mod creation
- Code suggestions and improvements
- Template-based generation

## Troubleshooting

### Common Issues

1. **Database Connection Error**: Ensure PostgreSQL is running and the connection string in `.env` is correct.

2. **Port Conflicts**: If you encounter port conflicts, modify the port numbers in the `.env` files or `docker-compose.yml`.

3. **Docker Issues**: If Docker containers fail to start, check Docker logs:
   ```bash
   docker-compose logs
   ```

4. **WebAssembly Error**: If you encounter WebAssembly-related errors for the AI model, ensure your browser supports WebAssembly and you're using HTTPS in production.

## Deployment

### Production Setup

For production deployment, follow these steps:

1. Build the client application:
   ```bash
   cd client
   npm run build
   ```

2. Build the server application:
   ```bash
   cd server
   npm run build
   ```

3. Deploy using Docker Compose:
   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```

### Server Requirements

Recommended server specifications for production:

- CPU: 4+ cores
- RAM: 8GB+ (more if hosting Minecraft servers)
- Storage: 50GB+ (depending on the number of Minecraft servers)
- OS: Ubuntu 20.04 LTS or newer
