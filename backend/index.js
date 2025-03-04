const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

// Import routes
const usersRoutes = require('./routes/usersRoutes');
const categoriesRoutes = require('./routes/categoriesRoutes');
const listingsRoutes = require('./routes/listingsRoutes');
const bookingsRoutes = require('./routes/bookingsRoutes');
const reviewsRoutes = require('./routes/reviewsRoutes');
const paymentsRoutes = require('./routes/paymentsRoutes');

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/users', usersRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/listings', listingsRoutes);
app.use('/api/bookings', bookingsRoutes);
app.use('/api/reviews', reviewsRoutes);
app.use('/api/payments', paymentsRoutes);

app.get('/', (req, res) => {
    res.send("Welcome to the Rentify API");
});

// Listen on port
app.listen(process.env.PORT, () => {
    console.log(`Running on: http://localhost:${process.env.PORT}`);
});