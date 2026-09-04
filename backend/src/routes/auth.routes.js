import { Router } from 'express';
import { register, login } from '../controllers/auth.controller.js';

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

export default router;
