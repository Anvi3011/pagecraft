import { Router } from 'express';
import { register, login, getMe } from '../controllers/auth.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = Router();

/**
 * @route POST /api/auth/register
 * @desc Register a new user account
 * @access Public
 */
router.post('/register', register);

/**
 * @route POST /api/auth/login
 * @desc Authenticate user and obtain token
 * @access Public
 */
router.post('/login', login);

/**
 * @route GET /api/auth/me
 * @desc Get current authenticated user profile
 * @access Private
 */
router.get('/me', protect, getMe);

export default router;
