import jwt from 'jsonwebtoken';

/**
 * Generates a JSON Web Token for an authenticated user.
 * Payload includes only id and role.
 *
 * @param {Object} user - User object containing _id and role
 * @returns {string} Signed JWT token
 */
export const generateToken = (user) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not configured in environment variables');
  }

  const payload = {
    id: String(user._id || user.id),
    role: user.role,
  };

  const expiresIn = process.env.JWT_EXPIRES_IN || '7d';

  return jwt.sign(payload, secret, { expiresIn });
};

/**
 * Verifies and decodes a JSON Web Token.
 *
 * @param {string} token - Signed JWT token string
 * @returns {Object} Decoded token payload
 */
export const verifyToken = (token) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not configured in environment variables');
  }

  return jwt.verify(token, secret);
};
