const { corsOptions } = require('./corsOptions');
const { errorHandler } = require('./errorHandler');
const {
  generateToken,
  generateRefreshTokenAndSetCookie,
} = require('./generateToken');
const passport = require('./passport');
const { limiter } = require('./rateLimiter');

module.exports = {
  corsOptions,
  limiter,
  errorHandler,
  generateToken,
  generateRefreshTokenAndSetCookie,
  passport,
};
