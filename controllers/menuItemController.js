// controllers/menuItemController.js
const MenuItemService = require('../services/menuItemService');

class MenuItemController {

    // Retrieve all menu items
    static async getAllMenuItems(req, res) {
        try {
            const menuItems = await MenuItemService.getAllMenuItems();
            res.status(200).json(menuItems);
        } catch (error) {
            res.status(500).json({ message: 'Failed to fetch menu items', error });
        }
    }

    // Retrieve a menu item by ID
    static async getMenuItemById(req, res) {
        try {
            const menuItem = await MenuItemService.getMenuItemById(req.params.id);
            if (!menuItem) {
                return res.status(404).json({ message: 'Menu item not found' });
            }
            res.status(200).json(menuItem);
        } catch (error) {
            res.status(500).json({ message: 'Failed to fetch menu item', error });
        }
    }

    // Create a new menu item
    static async createMenuItem(req, res) {
        try {
            const menuItem = await MenuItemService.createMenuItem(req.body);
            res.status(201).json(menuItem);
        } catch (error) {
            res.status(500).json({ message: 'Failed to create menu item', error });
        }
    }

    // Update an existing menu item
    static async updateMenuItem(req, res) {
        try {
            const updated = await MenuItemService.updateMenuItem(req.params.id, req.body);
            if (updated[0] === 0) {
                return res.status(404).json({ message: 'Menu item not found' });
            }
            res.status(200).json({ message: 'Menu item updated successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Failed to update menu item', error });
        }
    }

    // Delete a menu item by ID
    static async deleteMenuItem(req, res) {
        try {
            const deleted = await MenuItemService.deleteMenuItem(req.params.id);
            if (!deleted) {
                return res.status(404).json({ message: 'Menu item not found' });
            }
            res.status(200).json({ message: 'Menu item deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Failed to delete menu item', error });
        }
    }
}

module.exports = MenuItemController;