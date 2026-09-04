import { registerUser, loginUser } from '../services/auth.service.js';

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

/**
 * Controller to handle user login.
 *
 * @route POST /api/auth/login
 * @access Public
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const result = await loginUser({ email, password });

    return res.status(200).json({
      success: true,
      message: 'Login successful.',
      user: result.user,
      token: result.token,
    });
  } catch (error) {
    next(error);
  }
};
