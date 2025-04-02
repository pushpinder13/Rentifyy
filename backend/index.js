const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const { errorHandler } = require('./middleware/errorHandler');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

const usersRoutes = require('./routes/usersRoutes');
const categoriesRoutes = require('./routes/categoriesRoutes');
const listingsRoutes = require('./routes/listingsRoutes');
const bookingsRoutes = require('./routes/bookingsRoutes');
const reviewsRoutes = require('./routes/reviewsRoutes');
const paymentsRoutes = require('./routes/paymentsRoutes');
const authRoutes = require('./routes/authRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/listings', listingsRoutes);
app.use('/api/bookings', bookingsRoutes);
app.use('/api/reviews', reviewsRoutes);
app.use('/api/payments', paymentsRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/', (req, res) => {
    res.json({
        message: "Welcome to the Rentify API",
        version: "1.0.0",
        status: "active"
    });
});

app.use((req, res, next) => {
    res.status(404).json({
        status: 'error',
        message: 'Route not found',
        error: 'NOT_FOUND'
    });
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on: http://localhost:${PORT}`);
    // console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});