const rateLimit = require('express-rate-limit');

exports.limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 1000,
  message: 'Request Limit reached for this IP Address. Please wait for 60 seconds and try again',
});
