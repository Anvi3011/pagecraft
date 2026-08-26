import mongoose from 'mongoose';

/**
 * Asynchronously attempts to connect to MongoDB.
 * Database connection failures are caught gracefully so the server and API health endpoints
 * remain operational even when MongoDB is unavailable or disconnected.
 */
export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of hanging indefinitely
    });
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[Database Warning] Unable to connect to MongoDB: ${error.message}`);
    console.error(`[Database Warning] The application will continue running with health check active.`);
  }
};
