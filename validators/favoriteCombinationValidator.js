const { body, param, validationResult } = require('express-validator');

const validateFavoriteCombination = [
    body('name').isString().withMessage('Name must be a string').notEmpty().withMessage('Name cannot be empty'),
];

const validateFavoriteCombinationItem = [
    body('menu_item_id').isInt().withMessage('Menu item ID must be an integer'),
    body('quantity').isInt({ min: 1 }).withMessage('Quantity must be a positive integer'),
    body('customization').optional().isString().withMessage('Customization must be a string'),
];

const validateParams = (paramName) => [
    param(paramName).isInt().withMessage(`${paramName} must be an integer`),
];

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    validateFavoriteCombination,
    validateFavoriteCombinationItem,
    validateParams,
    handleValidationErrors,
};
