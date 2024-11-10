// validators/orderValidator.js
const { body, param, validationResult } = require('express-validator');

const orderValidators = {
    insertOrder: [
        body('userId').isInt().withMessage('User ID must be an integer'),
        body('orderDate').isISO8601().toDate().withMessage('Order date must be a valid date'),
        body('status').isString().withMessage('Status is required')
    ],
    insertOrderItem: [
        body('orderId').isInt().withMessage('Order ID must be an integer'),
        body('menuItemId').isInt().withMessage('Menu Item ID must be an integer'),
        body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
        body('customization').isString().optional()
    ],
    validate: (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
};

module.exports = orderValidators;
