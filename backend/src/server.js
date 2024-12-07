// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

// Initialize Express
const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:5174', // Replace with your frontend URL
    credentials: true,
}));
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
const authRoutes = require('./routes/authRoutes');
const groupRoutes = require('./routes/groupRoutes');
const chatRoutes = require('./routes/chatRoutes'); // Ensure chatRoutes are properly defined

// Mounting Routes Correctly
app.use('/api/auth', authRoutes);
app.use('/api/groups', groupRoutes); // Mounted at /api/groups
app.use('/api', chatRoutes); // Ensure chatRoutes handle their own paths

// Default Route
app.get('/', (req, res) => {
    res.send('Hobby Exchange Platform API');
});

// Handle 404 for undefined routes
app.use((req, res) => {
    res.status(404).json({ message: 'Endpoint not found' });
});

// Error Handling Middleware (Optional but Recommended)
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
