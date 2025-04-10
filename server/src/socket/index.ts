// server/src/socket/index.ts
import { Server, Socket } from 'socket.io';
import { authenticateSocket } from './middleware';
import serverHandlers from './serverHandlers';
import logger from '../utils/logger';

export default function setupSocketHandlers(io: Server): void {
  // Use authentication middleware
  io.use(authenticateSocket);
  
  io.on('connection', (socket: Socket) => {
    const userId = socket.data.userId;
    logger.info(`User ${userId} connected to socket ${socket.id}`);
    
    // Join user's room
    socket.join(`user:${userId}`);
    
    // Set up server handlers
    serverHandlers(io, socket);
    
    // Handle disconnection
    socket.on('disconnect', () => {
      logger.info(`User ${userId} disconnected from socket ${socket.id}`);
    });
  });
}
