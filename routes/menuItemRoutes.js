// routes/menuItemRoutes.js
const express = require('express');
const router = express.Router();
const MenuItemController = require('../controllers/menuItemController');
const { validateMenuItem, validateMenuItemId } = require('../validators/menuItemValidator');

// Get all menu items
router.get('/menu-items', MenuItemController.getAllMenuItems);

// Get a menu item by ID with validation
router.get('/menu-items/:id', validateMenuItemId, MenuItemController.getMenuItemById);

// Create a new menu item with validation
router.post('/menu-items', validateMenuItem, MenuItemController.createMenuItem);

// Update a menu item by ID with validation
router.put('/menu-items/:id', [validateMenuItemId, validateMenuItem], MenuItemController.updateMenuItem);

// Delete a menu item by ID with validation
router.delete('/menu-items/:id', validateMenuItemId, MenuItemController.deleteMenuItem);

module.exports = router;  // Export the router
