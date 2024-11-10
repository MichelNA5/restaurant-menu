// validators/menuItemValidator.js
const { body, param, validationResult } = require('express-validator');

const validateMenuItem = [
    body('name')
        .isString()
        .withMessage('Name must be a string')
        .notEmpty()
        .withMessage('Name is required'),
    body('description')
        .optional()
        .isString()
        .withMessage('Description must be a string'),
    body('price')
        .isFloat({ gt: 0 })
        .withMessage('Price must be a positive number'),
    body('category_id')
        .isInt()
        .withMessage('Category ID must be an integer'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateMenuItemId = [
    param('id')
        .isInt()
        .withMessage('ID must be an integer'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = {
    validateMenuItem,
    validateMenuItemId
};
