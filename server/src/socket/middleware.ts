// server/src/socket/middleware.ts
import { Socket } from 'socket.io';
import jwt from 'jsonwebtoken';
import db from '../models';
import logger from '../utils/logger';

interface DecodedToken {
  id: string;
  iat: number;
  exp: number;
}

export const authenticateSocket = async (socket: Socket, next: (err?: Error) => void): Promise<void> => {
  try {
    const token = socket.handshake.auth.token || socket.handshake.headers.token;
    
    if (!token) {
      return next(new Error('Authentication error'));
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;
    
    const user = await db.User.findByPk(decoded.id);
    
    if (!user) {
      return next(new Error('User not found'));
    }
    
    // Set user ID in socket data
    socket.data.userId = decoded.id;
    next();
  } catch (error) {
    logger.error('Socket authentication error:', error);
    next(new Error('Authentication error'));
  }
};
