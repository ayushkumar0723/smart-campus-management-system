const mongoose = require('mongoose');

let isConnected = false;
let isInMemory = false;

const connectDB = async () => {
  if (isConnected) return;

  const uri = process.env.MONGODB_URI;

  // If local default or no URI, probe with very quick timeout (1.5s)
  if (!uri || uri.includes('127.0.0.1') || uri.includes('localhost')) {
    try {
      await mongoose.connect(uri || 'mongodb://127.0.0.1:27017/smart_campus', {
        serverSelectionTimeoutMS: 1200,
      });
      if (mongoose.connection.readyState === 1) {
        isConnected = true;
        isInMemory = false;
        console.log(`[MongoDB] Connected to local database: ${mongoose.connection.host}`);
        return;
      }
    } catch (e) {
      // Local daemon not active, fallback immediately
    }
    console.log('[Database] Running with resilient built-in storage engine.');
    isConnected = true;
    isInMemory = true;
    return;
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 3000,
    });
    isConnected = true;
    isInMemory = false;
    console.log(`[MongoDB] Connected to remote instance: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`[MongoDB Warning] Could not connect to MongoDB URI: ${error.message}`);
    console.log('[Database] Operating with built-in storage engine fallback.');
    isInMemory = true;
    isConnected = true;
  }
};

const getDBStatus = () => ({
  connected: isConnected,
  mode: isInMemory ? 'in-memory-engine' : 'mongodb-connected'
});

module.exports = { connectDB, getDBStatus };
