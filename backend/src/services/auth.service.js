import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { generateToken } from '../utils/jwt.js';

/**
 * Helper function to return a consistent safe user payload.
 * Excludes sensitive fields like password and passwordHash.
 *
 * @param {Object} user - User document from Mongoose
 * @returns {Object} Safe user representation
 */
const formatSafeUser = (user) => {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
};

/**
 * Register a new user.
 *
 * @param {Object} registrationData - Object containing name, email, and password
 * @returns {Promise<Object>} Object containing safe user data and JWT token
 */
export const registerUser = async ({ name, email, password }) => {
  if (
    typeof name !== 'string' ||
    typeof email !== 'string' ||
    typeof password !== 'string' ||
    !name.trim() ||
    !email.trim() ||
    !password.trim()
  ) {
    const error = new Error('Please provide name, email, and password.');
    error.statusCode = 400;
    throw error;
  }

  const normalizedEmail = email.trim().toLowerCase();

  // Check if user with given email already exists
  const existingUser = await User.findOne({ email: normalizedEmail });
  if (existingUser) {
    const error = new Error('Email is already registered.');
    error.statusCode = 409;
    throw error;
  }

  // Hash password securely using bcryptjs
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  // Create new user document
  const user = await User.create({
    name: name.trim(),
    email: normalizedEmail,
    passwordHash,
    role: 'user',
  });

  // Generate JWT token
  const token = generateToken(user);

  return {
    user: formatSafeUser(user),
    token,
  };
};

/**
 * Authenticate an existing user by email and password.
 *
 * @param {Object} credentials - Object containing email and password
 * @returns {Promise<Object>} Object containing safe user data and JWT token
 */
export const loginUser = async ({ email, password }) => {
  if (
    typeof email !== 'string' ||
    typeof password !== 'string' ||
    !email.trim() ||
    !password.trim()
  ) {
    const error = new Error('Please provide email and password.');
    error.statusCode = 400;
    throw error;
  }

  const normalizedEmail = email.trim().toLowerCase();

  // Retrieve user including passwordHash (since select: false in schema)
  const user = await User.findOne({ email: normalizedEmail }).select('+passwordHash');

  if (!user) {
    const error = new Error('Invalid email or password.');
    error.statusCode = 401;
    throw error;
  }

  // Verify supplied password against stored bcrypt hash
  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) {
    const error = new Error('Invalid email or password.');
    error.statusCode = 401;
    throw error;
  }

  // Generate JWT token
  const token = generateToken(user);

  return {
    user: formatSafeUser(user),
    token,
  };
};

/**
 * Retrieve a user profile by ID.
 *
 * @param {string} userId - MongoDB _id of the user
 * @returns {Promise<Object>} Safe user representation
 */
export const getUserById = async (userId) => {
  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    const error = new Error('Invalid user ID.');
    error.statusCode = 400;
    throw error;
  }

  const user = await User.findById(userId);
  if (!user) {
    const error = new Error('User not found.');
    error.statusCode = 404;
    throw error;
  }

  return formatSafeUser(user);
};

