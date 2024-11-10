// validators/userValidator.js
const { body, param, validationResult } = require('express-validator');

const validateUser = [
    body('username')
        .isString()
        .withMessage('Username must be a string')
        .notEmpty()
        .withMessage('Username is required'),
    body('email')
        .isEmail()
        .withMessage('Email must be valid')
        .notEmpty()
        .withMessage('Email is required'),
    body('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long'),
    body('address')
        .optional()  // Makes the address field optional
        .isString()
        .withMessage('Address must be a string')
        .isLength({ max: 255 })
        .withMessage('Address cannot exceed 255 characters'),
    body('createdAt')
        .optional()
        .isISO8601()
        .withMessage('createdAt must be a valid date'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateUserId = [
    param('id').isInt().withMessage('ID must be an integer'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateUserUpdate = [
    body('username')
        .isString()
        .withMessage('Username must be a string')
        .notEmpty()
        .withMessage('Username is required'),
    body('email')
        .isEmail()
        .withMessage('Email must be valid')
        .notEmpty()
        .withMessage('Email is required'),
    body('address')
        .optional()  // Makes the address field optional
        .isString()
        .withMessage('Address must be a string')
        .isLength({ max: 255 })
        .withMessage('Address cannot exceed 255 characters'),


    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = {
    validateUser,
    validateUserUpdate,
    validateUserId
};
