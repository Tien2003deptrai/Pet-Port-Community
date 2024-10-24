const { corsOptions } = require('./corsOptions');
const { generateToken, generateRefreshTokenAndSetCookie } = require('./generateToken');
const passport = require('./passport');
const { limiter } = require('./rateLimiter');

module.exports = {
  corsOptions,
  limiter,
  generateToken,
  generateRefreshTokenAndSetCookie,
  passport,
};
