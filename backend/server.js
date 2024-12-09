// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db.js');
const eventRoutes = require('./src/routes/eventRoutes');

dotenv.config();

// Initialize Express
const app = express();

// Middleware
const corsOptions = {
    origin: (origin, callback) => {
      if (origin === 'http://localhost:5173' || origin === 'http://localhost:5174') {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  };


app.use(cors(corsOptions));
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
const authRoutes = require('./src/routes/authRoutes');
const groupRoutes = require('./src/routes/groupRoutes');
const chatRoutes = require('./src/routes/chatRoutes'); // Ensure chatRoutes are properly defined

// Mounting Routes Correctly
app.use('/api/auth', authRoutes);
app.use('/api/groups', groupRoutes); // Mounted at /api/groups
app.use('/api', chatRoutes); // Ensure chatRoutes handle their own paths
app.use('/api', eventRoutes);

// Default Route
app.get('/', (req, res) => {
    res.send('Hobby Exchange Platform API');
});

// Handle 404 for undefined routes
app.use((req, res) => {
    res.status(404).json({ message: 'Endpoint not found' });
});

// Error Handling Middleware (Optional but Recommended)
const errorHandler = require('./src/middleware/errorHandler');
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
