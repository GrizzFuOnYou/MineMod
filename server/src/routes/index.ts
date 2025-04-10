// server/src/routes/index.ts
import express from 'express';
import authRoutes from './auth';
import serverRoutes from './servers';
import modRoutes from './mods';

const router = express.Router();

// Define routes
router.use('/auth', authRoutes);
router.use('/servers', serverRoutes);
router.use('/mods', modRoutes);

export default router;
