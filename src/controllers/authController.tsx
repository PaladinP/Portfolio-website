import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const login = (req: Request, res: Response): void => {
  try {
    const { password } = req.body;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const jwtSecret = process.env.JWT_SECRET;

    // Failsafe in case you forget to add the .env variables
    if (!adminPassword || !jwtSecret) {
      res.status(500).json({ error: 'Server configuration error.' });
      return;
    }

    // Check if the typed password matches your .env password
    if (password === adminPassword) {
      // Generate a token valid for 24 hours
      const token = jwt.sign({ role: 'admin' }, jwtSecret, { expiresIn: '24h' });
      res.status(200).json({ token });
    } else {
      // Send 401 Unauthorized if it doesn't match
      res.status(401).json({ error: 'Invalid password.' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};