// controllers/orderController.js
const orderService = require('../services/orderService');

const orderController = {

    // Render order history for a user
    async getOrderHistory(req, res) {
        try {
            const { username } = req.params;
            const orderHistory = await orderService.getOrderHistory(username);
            res.render('orderHistory', { orders: orderHistory });
        } catch (error) {
            console.error('Error getting order history:', error);
            res.status(500).json({ message: 'An error occurred while fetching order history.' });
        }
    },

    // Insert a new order
    async insertOrder(req, res) {
        try {
            const { userId, status } = req.body;
            const orderId = await orderService.insertOrder(userId, status);
            res.status(201).json({ orderId });
        } catch (error) {
            console.error('Error inserting order:', error);
            res.status(500).json({ message: 'An error occurred while inserting the order.' });
        }
    },

    // Add an item to an order
    async insertOrderItem(req, res) {
        try {
            const { orderId, menuItemId, quantity, customization } = req.body;
            await orderService.insertOrderItem(orderId, menuItemId, quantity, customization);
            res.status(201).json({ message: 'Order item inserted successfully' });
        } catch (error) {
            console.error('Error inserting order item:', error);
            res.status(500).json({ message: 'An error occurred while inserting the order item.' });
        }
    },

    // Get items of a specific order
    async getOrderItems(req, res) {
        try {
            const { orderId } = req.params;
            const orderItems = await orderService.getOrderItems(orderId);
            res.status(200).json(orderItems);
        } catch (error) {
            console.error('Error getting order items:', error);
            res.status(500).json({ message: 'An error occurred while fetching order items.' });
        }
    },

    // Delete an order by ID
    async deleteOrder(req, res) {
        try {
            const { orderId } = req.params;
            await orderService.deleteOrder(orderId);
            res.status(200).json({ message: 'Order deleted successfully' });
        } catch (error) {
            console.error('Error deleting order:', error);
            res.status(500).json({ message: 'An error occurred while deleting the order.' });
        }
    },


};

module.exports = orderController;
