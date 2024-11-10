// routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/userController');
const { validateUser, validateUserId, validateUserUpdate } = require('../validators/userDTO');

const router = express.Router();

// Get all users
router.get('/', (req, res) => userController.getAllUsers(req, res));

// Get a user by ID with validation
router.get('/:id', validateUserId, (req, res) => userController.getUserById(req, res));

// Create a new user with validation
router.post('/', validateUser, (req, res) => userController.createUser(req, res));

// Update a user by ID with validation
router.put('/:id', [validateUserId, validateUserUpdate], (req, res) => userController.updateUser(req, res));

// Delete a user by ID with validation
router.delete('/:id', validateUserId, (req, res) => userController.deleteUser(req, res));

// Fetch user ID by username
router.get('/getid/:username', userController.fetchUserIdByUsername);

// Authenticate a user
router.post('/authenticate', userController.authenticateUser);

module.exports = router;  // Export the router
