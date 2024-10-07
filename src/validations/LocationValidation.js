const { body } = require('express-validator');

const create = [
  body('name').notEmpty().withMessage('Location name is required'),
  body('type')
    .isIn(['City', 'District', 'Commune'])
    .withMessage('Invalid location type'),
];

module.exports = { create };
