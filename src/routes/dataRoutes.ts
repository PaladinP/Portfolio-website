import { Router } from 'express';
import { getPortfolioData, updatePortfolioData } from '../controllers/dataController';
import { requireAuth } from '../middleware/authMiddleware';

const router = Router();

// Public route: Anyone can view your data (used by your main frontend)
router.get('/', getPortfolioData);

// Protected route: ONLY requests with a valid JWT token can update the data
router.put('/', requireAuth, updatePortfolioData);

export default router;