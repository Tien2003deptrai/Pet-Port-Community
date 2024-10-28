const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const chalk = require('chalk');
const helmet = require('helmet');
const { limiter, corsOptions, passport } = require('./utils');

const setupSwaggerDocs = require('./swagger/swagger');
require('module-alias/register');

require('dotenv').config();
const path = require('path');

const srcPath = path.resolve(process.env.SRC_PATH);

// Middleware
const { authenticateJWT, authorizeRole, noCacheMiddleware } = require('./middlewares');

// Models
const { Pet, Category } = require('./models');

// Initialize app
const app = express();

// Essential middleware
app.use(express.json());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(limiter);
app.use(passport.initialize());
app.use(noCacheMiddleware); // Apply to all routes

// Logging with morgan and chalk
app.use(
  morgan((tokens, req, res) => {
    return [
      chalk.yellow(tokens.method(req, res)),
      chalk.cyan(tokens.url(req, res)),
      chalk.green(tokens.status(req, res)),
      chalk.magenta(tokens['response-time'](req, res) + ' ms'),
      chalk.blue(tokens['remote-addr'](req, res)),
    ].join(' ');
  })
);

// app.use('/api/v1', require('./routes/index'));
app.use('/api/v1', require('./routes/index'));

setupSwaggerDocs(app);

// API routes
app.get('/index', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the pet management system!',
  });
});

// Fetch pets with category names
app.get('/pet', async (req, res) => {
  try {
    const pets = await Pet.findAll({
      attributes: ['name', 'age', 'description'],
      include: [{ model: Category, attributes: ['name'] }],
    });
    const data = pets.map(pet => ({
      name: pet.name,
      age: pet.age,
      description: pet.description,
    }));
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
    });
  }
});

// Fetch pets with more detailed category info
app.get('/pet2', async (req, res) => {
  try {
    const pets = await Pet.findAll({
      attributes: ['id', 'name', 'age', 'description'],
      include: [
        {
          model: Category,
          attributes: ['id', 'name'],
        },
      ],
    });
    res.status(200).json(pets);
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
    });
  }
});

// Handle 404 errors for unknown routes
app.use((req, res, next) => {
  next(createError.NotFound('This route does not exist'));
});

app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "script-src 'self' 'unsafe-inline' chrome-extension://be05ad2b-262c-45a9-b74d-150144d91459"
  );
  next();
});

// Global error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    status: err.status || 500,
    message: err.message,
  });
});

module.exports = app;
