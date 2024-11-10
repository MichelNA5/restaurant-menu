// services/orderService.js
const { initDB } = require('../config/database');
const Order = require('../models/order');
const OrderItem = require('../models/orderItem');

class OrderService {
    constructor() {
        this.pool = null;
        this.init();  // Initialize DB connection pool
    }

    // Sets up the database connection pool
    async init() {
        this.pool = await initDB();
    }

    // Retrieves the order history for a given username
    async getOrderHistory(username) {
        const query = `
            SELECT o.order_id, o.user_id, o.order_date, o.status 
            FROM \`order\` o
            JOIN user u ON o.user_id = u.user_id
            WHERE u.username = ?`;
        const [rows] = await this.pool.execute(query, [username]);
        return rows.map(row => Order.fromRow(row));  // Return list of orders
    }

    // Inserts a new order and returns the new order's ID
    async insertOrder(userId, status) {
        const query = `
            INSERT INTO \`order\` (user_id, order_date, status)
            VALUES (?, NOW(), ?)`;
        const [result] = await this.pool.execute(query, [userId, status]);
        return result.insertId;  // Return the inserted order's ID
    }

    // Inserts a new order item for a specific order
    async insertOrderItem(orderId, menuItemId, quantity, customization) {
        const query = `
            INSERT INTO order_item (order_id, menu_item_id, quantity, customization)
            VALUES (?, ?, ?, ?)`;
        await this.pool.execute(query, [orderId, menuItemId, quantity, customization]);
    }

    // Retrieves order items for a specific order
    async getOrderItems(orderId) {
        const query = `
            SELECT oi.menu_item_id, mi.name, mi.price, oi.quantity, oi.customization 
            FROM order_item oi
            JOIN menu_item mi ON oi.menu_item_id = mi.menu_item_id
            WHERE oi.order_id = ?`;
        const [rows] = await this.pool.execute(query, [orderId]);
        return rows.map(row => OrderItem.fromRow(row));  // Return list of order items
    }

    // Deletes an order and its associated order items and coupons
    async deleteOrder(orderId) {
        const queries = [
            `DELETE FROM order_coupon WHERE order_id = ?`,
            `DELETE FROM order_item WHERE order_id = ?`,
            `DELETE FROM \`order\` WHERE order_id = ?`
        ];
        for (const query of queries) {
            await this.pool.execute(query, [orderId]);  // Execute each delete query
        }
    }
}

module.exports = new OrderService();  // Export an instance of OrderService
