// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Render order history by username (username is part of the URL)
router.get('/order-history/:username', orderController.getOrderHistory);

// Insert a new order (request body contains userId, orderDate, status)
router.post('/insert-order', orderController.insertOrder);

// Insert an order item (request body contains orderId, menuItemId, quantity, customization)
router.post('/insert-order-item', orderController.insertOrderItem);

// Delete an order by orderId (orderId is part of the URL)
router.delete('/delete-order/:orderId', orderController.deleteOrder);

// New route to get order items by orderId
router.get('/order-items/:orderId', orderController.getOrderItems);
module.exports = router;
