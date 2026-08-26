import dotenv from 'dotenv';
import app from './app.js';
import { connectDB } from './config/db.js';

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 5000;

// Connect to Database
if (process.env.MONGODB_URI) {
  connectDB();
} else {
  console.warn('[Database Warning] MONGODB_URI is not defined in environment variables.');
}

// Start HTTP Server
app.listen(PORT, () => {
  console.log(`[Server] Pagecraft backend running on port ${PORT}`);
  console.log(`[Server] Health Check available at http://localhost:${PORT}/api/health`);
});
