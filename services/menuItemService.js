const { initDB } = require('../config/database');
const MenuItem = require('../models/menuItemModel');

class MenuItemService {
    constructor() {
        this.pool = null;
        this.init();
    }

    async init() {
        this.pool = await initDB();
    }

    async getAllMenuItems() {
        const [rows] = await this.pool.query(
            `SELECT 
                mi.menu_item_id, 
                mi.name, 
                mi.description, 
                mi.price, 
                mi.category_id,
                c.category_name  
            FROM menu_item mi
            JOIN category c ON mi.category_id = c.category_id`  // Join with category table
        );
        return rows.map(MenuItem.fromRow);  // Map the rows to MenuItem model
    }

    // Get menu item by ID, including category name
    async getMenuItemById(id) {
        const [rows] = await this.pool.query(
            `SELECT 
                mi.menu_item_id, 
                mi.name, 
                mi.description, 
                mi.price, 
                mi.category_id, 
                c.category_name  
            FROM menu_item mi
            JOIN category c ON mi.category_id = c.category_id
            WHERE mi.menu_item_id = ?`, [id]
        );
        if (rows.length === 0) return null;
        return MenuItem.fromRow(rows[0]);
    }

    // Create a new menu item
    async createMenuItem(menuItemData) {
        const { name, description, price, category_id } = menuItemData;
        const [result] = await this.pool.query(
            'INSERT INTO menu_item (name, description, price, category_id) VALUES (?, ?, ?, ?)',
            [name, description, price, category_id]
        );
        return new MenuItem(result.insertId, name, description, price, category_id, null);
    }

    // Update an existing menu item by ID
    async updateMenuItem(menu_item_id, menuItemData) {
        const { name, description, price, category_id } = menuItemData;
        const [result] = await this.pool.query(
            'UPDATE menu_item SET name = ?, description = ?, price = ?, category_id = ? WHERE menu_item_id = ?',
            [name, description, price, category_id, menu_item_id]
        );
        return result.affectedRows > 0;
    }

    // Delete a menu item by ID
    async deleteMenuItem(menu_item_id) {
        const [result] = await this.pool.query('DELETE FROM menu_item WHERE menu_item_id = ?', [menu_item_id]);
        return result.affectedRows > 0;
    }
}

module.exports = new MenuItemService();