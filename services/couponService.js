const { initDB } = require('../config/database');
const Coupon = require('../models/Coupon');
const OrderCoupon = require('../models/OrderCoupon');

class CouponService {
    constructor() {
        this.pool = null;
        this.init();  // Initialize DB connection pool
    }

    // Sets up the database connection pool
    async init() {
        this.pool = await initDB();
    }

    // Retrieves coupon ID by coupon code
    async getCouponIdByCode(couponCode) {
        const query = 'SELECT coupon_id FROM coupon WHERE code = ?';
        const [rows] = await this.pool.execute(query, [couponCode]);
        const coupon = rows.length ? Coupon.fromRow(rows[0]) : null;
        return coupon ? coupon.coupon_id : -1;  // Return coupon ID or -1 if not found
    }

    // Retrieves the discount amount for a given coupon code
    async getCouponDiscount(couponCode) {
        const query = 'SELECT discount_amount FROM coupon WHERE code = ?';
        const [rows] = await this.pool.execute(query, [couponCode]);
        const coupon = rows.length ? Coupon.fromRow(rows[0]) : null;
        return coupon ? coupon.discount_amount : 0;  // Return discount amount or 0 if not found
    }

    // Inserts a new order-coupon association into the database
    async insertOrderCoupon(orderId, couponId) {
        const query = 'INSERT INTO order_coupon (order_id, coupon_id) VALUES (?, ?)';
        await this.pool.execute(query, [orderId, couponId]);
        return new OrderCoupon(orderId, couponId);  // Return new OrderCoupon instance
    }
}

module.exports = new CouponService();  // Export an instance of CouponService
