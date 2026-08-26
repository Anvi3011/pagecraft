import mongoose from 'mongoose';

/**
 * Health check controller
 * @route GET /api/health
 * @desc Verify backend server health independent of database availability
 * @access Public
 */
export const getHealth = (req, res) => {
  const dbStates = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  };

  const dbStateCode = mongoose.connection ? mongoose.connection.readyState : 0;
  const dbStatus = dbStates[dbStateCode] || 'unknown';

  // Always return HTTP 200 to confirm backend application is running successfully
  res.status(200).json({
    status: 'ok',
    message: 'Pagecraft API is healthy and operational',
    timestamp: new Date().toISOString(),
    uptime: `${process.uptime().toFixed(2)}s`,
    services: {
      server: 'operational',
      database: dbStatus,
    },
    environment: process.env.NODE_ENV || 'development',
  });
};
