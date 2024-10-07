const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const chalk = require('chalk');
const passport = require('passport');
const helmet = require('helmet');
const { limiter, corsOptions } = require('./utils');

const setupSwaggerDocs = require('./swagger/swagger');

// Middleware
const {
  authenticateJWT,
  authorizeRole,
  noCacheMiddleware,
  errorHandler,
} = require('./middlewares');

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
  }),
);

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
    const data = pets.map((pet) => ({
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

// Global error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    status: err.status || 500,
    message: err.message,
  });
});

module.exports = app;
