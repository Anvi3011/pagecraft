import { registerUser } from '../services/auth.service.js';

/**
 * Controller to handle user registration.
 *
 * @route POST /api/auth/register
 * @access Public
 */
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const result = await registerUser({ name, email, password });

    return res.status(201).json({
      success: true,
      message: 'Registration successful.',
      user: result.user,
      token: result.token,
    });
  } catch (error) {
    next(error);
  }
};
