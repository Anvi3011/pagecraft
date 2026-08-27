import { Router } from 'express';
import { register } from '../controllers/auth.controller.js';

const router = Router();

/**
 * @route POST /api/auth/register
 * @desc Register a new user account
 * @access Public
 */
router.post('/register', register);

export default router;
