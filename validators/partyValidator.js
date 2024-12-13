const { body, param, query, validationResult } = require('express-validator');

// Validator for creating a party (based on code and creatorId)
const validateCreateParty = [
    body('code')
        .notEmpty().withMessage('Party code is required')
        .isAlphanumeric().withMessage('Party code must be alphanumeric')
        .isLength({ min: 6, max: 6 }).withMessage('Party code must be exactly 6 characters long')
        .matches(/^[A-Z0-9]{6}$/).withMessage('Party code must be all uppercase letters and numbers'),
    body('userId')
        .notEmpty().withMessage('Creator ID is required')
        .isInt().withMessage('Creator ID must be a valid integer'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

// Validator for joining a party (based on party code, user ID, and order ID)
const validateJoinParty = [
    body('code')
        .notEmpty().withMessage('Party code is required')
        .isAlphanumeric().withMessage('Party code must be alphanumeric')
        .isLength({ min: 6, max: 6 }).withMessage('Party code must be exactly 6 characters long')
        .matches(/^[A-Z0-9]{6}$/).withMessage('Party code must be all uppercase letters and numbers'),

    body('userId').notEmpty().withMessage('User ID is required').isInt().withMessage('User ID must be a valid integer'),
    body('orderId').notEmpty().withMessage('Order ID is required').isInt().withMessage('Order ID must be a valid integer'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

// Validator for party code (used in multiple routes, e.g., getting creator info or orders)
const validatePartyCode = [
    param('partyCode').notEmpty().withMessage('Party code is required').isAlphanumeric().withMessage('Party code must be alphanumeric'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

// Validator for active party code for a user
const validateActivePartyCode = [
    param('userId').notEmpty().withMessage('User ID is required').isInt().withMessage('User ID must be a valid integer'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

// Validator for ending a party (needs userId, to end the creator's active party)
const validateEndActiveParty = [
    body('userId').notEmpty().withMessage('User ID is required').isInt().withMessage('User ID must be a valid integer'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = {
    validateCreateParty,
    validateJoinParty,
    validatePartyCode,
    validateActivePartyCode,
    validateEndActiveParty
};
