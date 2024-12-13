const express = require('express');
const router = express.Router();
const CouponController = require('../controllers/couponController');
const axios = require('axios');


let cart = [];

// Function to calculate the total cart value
const calculateTotal = (cart, discountPercent = 0) => {
    const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const discount = (subtotal * discountPercent) / 100;
    const total = subtotal - discount;
    return {
        subtotal: subtotal.toFixed(2),
        discountPercent,
        discount: discount.toFixed(2),
        total: total.toFixed(2)
    };
};

// Route to add item to cart
router.post('/add', (req, res) => {
    const { menu_item_id, name, price } = req.body;

    // Check if the item already exists in the cart by menu_item_id
    const existingItem = cart.find(item => item.menu_item_id === String(menu_item_id));

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            menu_item_id: String(menu_item_id), // Standardize to string
            name,
            price: parseFloat(price),
            quantity: 1,
            customization: ''
        });
    }

    res.json({ success: true, cart });
});

// Route to render the cart
router.get('/', (req, res) => {
    const totals = calculateTotal(cart);
    cart = cart.map(item => ({
        ...item,
        customization: item.customization || ''
    }));

    res.render('cart', { cart, totals, couponCode: '' });
});

// Route to increase item quantity
router.post('/increase/:menu_item_id', (req, res) => {
    const menu_item_id = String(req.params.menu_item_id);
    const item = cart.find(item => item.menu_item_id === menu_item_id);

    if (item) {
        item.quantity += 1;
    }
    res.redirect('/cart');
});

// Route to decrease item quantity
router.post('/decrease/:menu_item_id', (req, res) => {
    const menu_item_id = String(req.params.menu_item_id);
    const itemIndex = cart.findIndex(item => item.menu_item_id === menu_item_id);

    if (itemIndex !== -1) {
        if (cart[itemIndex].quantity > 1) {
            cart[itemIndex].quantity -= 1;
        } else {
            cart.splice(itemIndex, 1);
        }
    }

    res.redirect('/cart');
});

// Route to remove item from cart
router.post('/remove/:menu_item_id', (req, res) => {
    const menu_item_id = String(req.params.menu_item_id);
    const itemIndex = cart.findIndex(item => item.menu_item_id === menu_item_id);

    if (itemIndex !== -1) {
        cart.splice(itemIndex, 1);
    }
    res.redirect('/cart');
});

// Route to update customization for a specific cart item
router.post('/customize/:menu_item_id', (req, res) => {
    const menu_item_id = String(req.params.menu_item_id);
    const { customization } = req.body;

    const item = cart.find(item => item.menu_item_id === menu_item_id);

    if (item) {
        item.customization = customization.trim();
    }

    res.redirect('/cart');
});

// POST request to apply the coupon
router.post('/apply-coupon', async (req, res) => {
    const { couponCode } = req.body;

    try {
        const discountData = await CouponController.getCouponDiscount(couponCode);
        const discountPercent = discountData.discount || 0;
        const totals = calculateTotal(cart, discountPercent);
        res.render('cart', { cart, totals, couponCode });
    } catch (error) {
        console.error("Error applying coupon:", error);
        res.status(500).send("Error applying coupon");
    }
});
// place order
router.post('/place-order', async (req, res) => {
    const { userId, couponCode } = req.body;
    const cartItems = JSON.stringify(cart);
    let couponId = null;


    if (!userId) {
        res.redirect('/api/users/v/login');
        return;
    }
    if (cart.length === 0) {

        res.redirect('/api/menu');
        return;
    }

    try {
        const response = await axios.get(`http://localhost:3000/api/coupon/id/${couponCode}`);
        couponId = response.data.couponId;
    } catch (error) {
        console.log("No coupon found");
    }

    try {
        // Insert the order into the database
        const orderResponse = await axios.post('http://localhost:3000/api/orders/insert-order', {
            userId: userId,
            status: 'Pending',
        });
        const orderId = orderResponse.data.orderId;

        // Add the order items to the database
        for (const item of cart) {
            await axios.post('http://localhost:3000/api/orders/insert-order-item', {
                orderId: orderId,
                menuItemId: item.menu_item_id,
                quantity: item.quantity,
                customization: item.customization || '',
            });
        }
        //insert coupon

        if (couponId) {
            await axios.post('http://localhost:3000/api/coupon/apply', {
                orderId: orderId,
                couponId: couponId,
            });

        }



        // Redirect to the menu and clear cart
        cart = [];
        res.redirect('/api/menu');
    } catch (error) {
        console.error('Error placing order:', error.message);
        res.status(500).send('Error placing order');
    }
});


// Place order with party code
router.post('/place-order-party', async (req, res) => {
    const { userId, couponCode, partyCode } = req.body;
    const cartItems = JSON.stringify(cart);
    let couponId = null;

    if (!userId) {
        return res.json({ success: false, message: 'User not logged in.' });
    }
    if (cart.length === 0) {
        return res.json({ success: false, message: 'Cart is empty.' });
    }

    try {
        // Fetch coupon details
        try {
            const response = await axios.get(`http://localhost:3000/api/coupon/id/${couponCode}`);
            couponId = response.data.couponId;
        } catch (error) {
            console.log("No coupon found");
        }

        // Insert the order
        const orderResponse = await axios.post('http://localhost:3000/api/orders/insert-order', {
            userId: userId,
            status: 'Pending',
        });
        const orderId = orderResponse.data.orderId;

        // Insert order items
        for (const item of cart) {
            await axios.post('http://localhost:3000/api/orders/insert-order-item', {
                orderId: orderId,
                menuItemId: item.menu_item_id,
                quantity: item.quantity,
                customization: item.customization || '',
            });
        }

        // Apply coupon if available
        if (couponId) {
            await axios.post('http://localhost:3000/api/coupon/apply', {
                orderId: orderId,
                couponId: couponId,
            });
        }

        // Handle party code if provided
        if (partyCode) {
            try {
                const statusResponse = await axios.get(`http://localhost:3000/api/party/${partyCode}/status`);

                if (!statusResponse.data.isActive) {
                    await axios.delete(`http://localhost:3000/api/orders/delete-order/${orderId}`);
                    return res.json({ success: false, message: "Party is not active." });
                }

                await axios.post('http://localhost:3000/api/party/join', {
                    orderId: orderId,
                    userId: userId,
                    code: partyCode,
                });
                cart = []; // clear cart

                return res.json({ success: true, message: "Successfully joined the party." });
            } catch (e) {
                console.error(e);
                await axios.delete(`http://localhost:3000/api/orders/delete-order/${orderId}`);
                return res.json({ success: false, message: "Failed to join the party." });
            }
        }

    } catch (error) {
        console.error('Error placing order:', error.message);
        res.status(500).send('Error placing order');
    }
});


// Route to reorder a previous order
router.post('/reorder/:orderId', async (req, res) => {
    const orderId = req.params.orderId;

    try {
        const response = await axios.get(`http://localhost:3000/api/orders/order-items/${orderId}`);
        const orderItems = response.data;

        for (const item of orderItems) {
            const existingItem = cart.find(cartItem => cartItem.menu_item_id === String(item.menu_item_id));

            if (existingItem) {
                existingItem.quantity += item.quantity;
            } else {
                cart.push({
                    menu_item_id: String(item.menu_item_id),
                    name: item.name,
                    price: parseFloat(item.price),
                    quantity: item.quantity,
                    customization: item.customization || '',
                });
            }
        }

        res.redirect('/cart');
    } catch (error) {
        console.error('Error reordering items:', error.message);
        res.status(500).send('Error reordering items');
    }
});

// Route to reorder a favorite combination
router.post('/reorder-combination/:id', async (req, res) => {
    const combinationId = req.params.id;

    try {
        const response = await axios.get(`http://localhost:3000/api/favorite-combinations/items/${combinationId}`);
        const combinationItems = response.data;

        for (const item of combinationItems) {
            const existingItem = cart.find(cartItem => cartItem.menu_item_id === String(item.menu_item_id));

            if (existingItem) {
                existingItem.quantity += item.quantity;
            } else {
                cart.push({
                    menu_item_id: String(item.menu_item_id),
                    name: item.menu_item_name,
                    price: parseFloat(item.menu_item_price),
                    quantity: item.quantity,
                    customization: item.customization || '',
                });
            }
        }

        res.redirect('/cart');
    } catch (error) {
        console.error('Error reordering combination items:', error.message);
        res.status(500).send('Error reordering combination items');
    }
});

module.exports = router;
