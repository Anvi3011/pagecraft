import { verifyToken } from '../utils/jwt.js';

/**
 * Authentication Middleware
 * Verifies JWT from Authorization header (Bearer <token>)
 * and attaches authenticated user identity ({ id, role }) to req.user.
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
export const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    const error = new Error('Not authorized, token required.');
    error.statusCode = 401;
    return next(error);
  }

  const token = authHeader.split(' ')[1]?.trim();

  if (!token) {
    const error = new Error('Not authorized, token required.');
    error.statusCode = 401;
    return next(error);
  }

  try {
    const decoded = verifyToken(token);

    if (!decoded || !decoded.id || !decoded.role) {
      const error = new Error('Not authorized, invalid or expired token.');
      error.statusCode = 401;
      return next(error);
    }

    req.user = {
      id: decoded.id,
      role: decoded.role,
    };

    next();
  } catch (err) {
    // If JWT_SECRET is not configured on the server, forward the configuration error
    if (err.message && err.message.includes('JWT_SECRET is not configured')) {
      return next(err);
    }

    // Otherwise treat verification failure as an invalid or expired token
    const error = new Error('Not authorized, invalid or expired token.');
    error.statusCode = 401;
    return next(error);
  }
};
