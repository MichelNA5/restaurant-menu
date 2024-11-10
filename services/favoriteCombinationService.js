const { initDB } = require('../config/database');
const FavoriteCombination = require('../models/favoriteCombination');
const FavoriteCombinationItem = require('../models/favoriteCombinationItem');

class FavoriteCombinationService {
    constructor() {
        this.pool = null;
        this.init();
    }

    async init() {
        this.pool = await initDB(); // Initialize the DB connection pool
    }

    // Get all favorite combinations for a user
    async getFavoriteCombosByUserID(user_id) {
        const query = 'SELECT * FROM favorite_combination WHERE user_id = ?';
        const [rows] = await this.pool.query(query, [user_id]);
        return rows.map(FavoriteCombination.fromRow);
    }

    // Insert a new favorite combination
    async insertFavoriteCombination(user_id, name) {
        const query = 'INSERT INTO favorite_combination (user_id, name) VALUES (?, ?)';
        const [result] = await this.pool.execute(query, [user_id, name]);
        return result.insertId;
    }

    // Delete a favorite combination and its related items
    async deleteFavoriteCombo(combination_id) {
        // First, delete related items from favorite_combination_item
        await this.deleteFavoriteCombinationItems(combination_id);

        // Then, delete the combination itself
        const query = 'DELETE FROM favorite_combination WHERE combination_id = ?';
        await this.pool.execute(query, [combination_id]);
    }

    // Insert an item into a favorite combination
    async insertFavoriteCombinationItem(combination_id, menu_item_id, quantity, customization) {
        const query = 'INSERT INTO favorite_combination_item (combination_id, menu_item_id, quantity, customization) VALUES (?, ?, ?, ?)';
        await this.pool.execute(query, [combination_id, menu_item_id, quantity, customization]);
    }

    // Delete all items associated with a specific favorite combination
    async deleteFavoriteCombinationItems(combination_id) {
        const query = 'DELETE FROM favorite_combination_item WHERE combination_id = ?';
        await this.pool.execute(query, [combination_id]);
    }

    // Get all items in a favorite combination, including menu item details
    async getFavoriteComboItems(combination_id) {
        const query = `
            SELECT 
                fci.combination_id, 
                fci.menu_item_id, 
                m.name AS menu_item_name, 
                m.price AS menu_item_price, 
                fci.quantity, 
                fci.customization 
            FROM favorite_combination_item fci
            JOIN menu_item m ON fci.menu_item_id = m.menu_item_id
            WHERE fci.combination_id = ?`;

        const [rows] = await this.pool.execute(query, [combination_id]);
        return rows.map(FavoriteCombinationItem.fromRow);
    }
}

module.exports = new FavoriteCombinationService();
