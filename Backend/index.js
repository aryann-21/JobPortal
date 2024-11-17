const express = require('express');
const connectDB = require('./config/db');
const { router: authRoutes } = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors()); // Enable CORS for frontend-backend communication
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);

// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
