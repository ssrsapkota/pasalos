const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const { errorHandler } = require('./middleware/error');
const authRoutes = require('./routes/auth.routes');
const vendorRoutes = require('./routes/vendor.routes');
const userRoutes = require('./routes/user.routes');
const ApiError = require('./utils/apiError');

const app = express();

// Security middlewares
app.use(helmet());
app.use(cors());

// Body parser
app.use(express.json());

// Logger
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/vendors', vendorRoutes);
app.use('/api/users', userRoutes);

// 404 handler
app.use((req, res, next) => {
  next(new ApiError(404, 'Not found'));
});

// Centralized Error handler
app.use(errorHandler);

module.exports = app;
