const { body } = require('express-validator');

const create = [
  body('name').notEmpty().withMessage('Category name is required'),
  body('type')
    .isIn(['Product', 'Service', 'Pet'])
    .withMessage('Invalid category type'),
];

module.exports = { create };
