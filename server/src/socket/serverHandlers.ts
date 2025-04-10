// server/src/socket/serverHandlers.ts
import { Server, Socket } from 'socket.io';
import ServerService from '../services/serverService';
import logger from '../utils/logger';

export default function serverHandlers(io: Server, socket: Socket): void {
  const serverService = new ServerService();
  const userId = socket.data.userId;
  
  // Subscribe to server updates
  socket.on('server:subscribe', async (serverId: string) => {
    try {
      // Check if server exists and belongs to user
      const server = await serverService.getServerById(serverId, userId);
      
      if (!server) {
        socket.emit('error', { message: 'Server not found' });
        return;
      }
      
      // Join server's room
      socket.join(`server:${serverId}`);
      logger.info(`User ${userId} subscribed to server ${serverId}`);
    } catch (error) {
      logger.error(`Error subscribing to server ${userId}:`, error);
      socket.emit('error', { message: 'Failed to subscribe to server' });
    }
  });
  
  // Unsubscribe from server updates
  socket.on('server:unsubscribe', (serverId: string) => {
    socket.leave(`server:${serverId}`);
    logger.info(`User ${userId} unsubscribed from server ${serverId}`);
  });
  
  // Handle client disconnect
  socket.on('disconnect', () => {
    // Clean up any resources if needed
  });
}
