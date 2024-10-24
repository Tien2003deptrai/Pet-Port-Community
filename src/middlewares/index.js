const { authenticateJWT } = require('./authMiddleware');
const { noCacheMiddleware } = require('./noCacheMiddleware');
const { authorizeRole } = require('./roleMiddleware');
const { validate } = require('./validate');

module.exports = {
  authenticateJWT,
  authorizeRole,
  noCacheMiddleware,
  validate,
};
