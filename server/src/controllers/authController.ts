// server/src/controllers/authController.ts
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import db from '../models';
import logger from '../utils/logger';

export default class AuthController {
  /**
   * Register a new user
   */
  public register = async (req: Request, res: Response): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }
      
      const { username, email, password } = req.body;
      
      // Check if username or email already exists
      const existingUser = await db.User.findOne({
        where: {
          [db.Sequelize.Op.or]: [
            { username },
            { email },
          ],
        },
      });
      
      if (existingUser) {
        res.status(400).json({ message: 'Username or email already exists' });
        return;
      }
      
      // Create new user
      const user = await db.User.create({
        username,
        email,
        password, // Password will be hashed via Sequelize hook
        isVerified: true, // For demo purposes, set to true
      });
      
      // Generate token
      const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET as string,
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
      );
      
      // Return user data without password
      const userData = {
        id: user.id,
        username: user.username,
        email: user.email,
        avatarUrl: user.avatarUrl,
        isVerified: user.isVerified,
        createdAt: user.createdAt,
      };
      
      res.status(201).json({
        user: userData,
        token,
      });
    } catch (error) {
      logger.error('Error in register:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  /**
   * Login user
   */
  public login = async (req: Request, res: Response): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }
      
      const { email, password } = req.body;
      
      // Find user by email
      const user = await db.User.findOne({
        where: { email },
      });
      
      if (!user) {
        res.status(401).json({ message: 'Invalid credentials' });
        return;
      }
      
      // Check password
      const isPasswordValid = await user.validPassword(password);
      if (!isPasswordValid) {
        res.status(401).json({ message: 'Invalid credentials' });
        return;
      }
      
      // Generate token
      const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET as string,
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
      );
      
      // Return user data without password
      const userData = {
        id: user.id,
        username: user.username,
        email: user.email,
        avatarUrl: user.avatarUrl,
        isVerified: user.isVerified,
        createdAt: user.createdAt,
      };
      
      res.status(200).json({
        user: userData,
        token,
      });
    } catch (error) {
      logger.error('Error in login:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  /**
   * Get current user profile
   */
  public getCurrentUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = req.user?.id;
      
      if (!userId) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }
      
      const user = await db.User.findByPk(userId, {
        attributes: { exclude: ['password'] },
      });
      
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      
      res.status(200).json(user);
    } catch (error) {
      logger.error('Error in getCurrentUser:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  /**
   * Verify email
   */
  public verifyEmail = async (req: Request, res: Response): Promise<void> => {
    try {
      const { token } = req.params;
      
      // Find user by verification token
      const user = await db.User.findOne({
        where: { verificationToken: token },
      });
      
      if (!user) {
        res.status(400).json({ message: 'Invalid or expired verification token' });
        return;
      }
      
      // Update user as verified
      user.isVerified = true;
      user.verificationToken = null;
      await user.save();
      
      res.status(200).json({ message: 'Email verified successfully' });
    } catch (error) {
      logger.error('Error in verifyEmail:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  /**
   * Request password reset
   */
  public forgotPassword = async (req: Request, res: Response): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }
      
      const { email } = req.body;
      
      // Find user by email
      const user = await db.User.findOne({
        where: { email },
      });
      
      if (!user) {
        // For security reasons, don't indicate if email exists
        res.status(200).json({ message: 'If your email is registered, you will receive a password reset link' });
        return;
      }
      
      // Generate reset token
      const resetToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      const resetExpires = new Date();
      resetExpires.setHours(resetExpires.getHours() + 1); // Token expires in 1 hour
      
      // Save token to user
      user.resetPasswordToken = resetToken;
      user.resetPasswordExpires = resetExpires;
      await user.save();
      
      // In a real application, send an email with the reset link
      // For demo purposes, just return success
      res.status(200).json({ message: 'If your email is registered, you will receive a password reset link' });
    } catch (error) {
      logger.error('Error in forgotPassword:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  /**
   * Reset password with token
   */
  public resetPassword = async (req: Request, res: Response): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }
      
      const { token } = req.params;
      const { password } = req.body;
      
      // Find user by reset token and check expiration
      const user = await db.User.findOne({
        where: {
          resetPasswordToken: token,
          resetPasswordExpires: {
            [db.Sequelize.Op.gt]: new Date(),
          },
        },
      });
      
      if (!user) {
        res.status(400).json({ message: 'Invalid or expired reset token' });
        return;
      }
      
      // Update password and clear reset token
      user.password = password; // Password will be hashed via Sequelize hook
      user.resetPasswordToken = null;
      user.resetPasswordExpires = null;
      await user.save();
      
      res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
      logger.error('Error in resetPassword:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
}
