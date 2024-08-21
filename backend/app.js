const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/database');
const salesRoutes = require('./routes/SalesRoutes');
const customerRoutes = require('./routes/customerRoutes');

const app = express();

// Configure CORS to allow only your frontend domain
const corsOptions = {
    origin: 'https://data-visualization-web-app-three.vercel.app/', // Replace with your actual Vercel domain
    methods: 'GET,POST,PUT,DELETE',
    credentials: true
};
app.use(cors(corsOptions));

app.use(express.json());

// Connect to the database
connectDB();

// Register API routes
app.use('/api/sales', salesRoutes);
app.use('/api/customers', customerRoutes);

// Start the server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
