const { body, param } = require('express-validator');

const LocationValidation = {
  create: [
    body('name')
      .notEmpty().withMessage('Location name is required')
      .isString().withMessage('Location name must be a valid string'),
    body('type')
      .notEmpty().withMessage('Location type is required')
      .isIn(['City', 'District', 'Commune']).withMessage('Location type must be one of the following: City, District, Commune'),
    body('parent_id').optional().isInt().withMessage('Parent ID must be a valid integer'),
  ],

  update: [
    param('id').isInt().withMessage('Location ID must be a valid integer'),
    body('name').optional().isString().withMessage('Location name must be a valid string'),
    body('type').optional().isIn(['City', 'District', 'Commune']).withMessage('Location type must be one of the following: City, District, Commune'),
    body('parent_id').optional().isInt().withMessage('Parent ID must be a valid integer'),
  ],

  getById: [
    param('id').isInt().withMessage('Location ID must be a valid integer'),
  ],

  delete: [
    param('id').isInt().withMessage('Location ID must be a valid integer'),
  ],

  getByType: [
    param('type')
      .notEmpty().withMessage('Location type is required')
      .isIn(['City', 'District', 'Commune']).withMessage('Location type must be one of the following: City, District, Commune'),
  ],
};

module.exports = LocationValidation;
