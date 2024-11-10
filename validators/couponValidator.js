const { body, param } = require('express-validator');

const validateCouponApplication = [
    body('orderId').isInt().withMessage('Order ID must be an integer'),
    body('couponId').isInt().withMessage('Coupon ID must be an integer')
];

const validateCouponCodeParam = [
    param('code').isString().withMessage('Coupon code must be a string')
];

module.exports = { validateCouponApplication, validateCouponCodeParam };
