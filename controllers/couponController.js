// controllers/couponController.js
const CouponService = require('../services/couponService');

class CouponController {

    // Get coupon ID by code
    async getCouponIdByCode(req, res) {
        const { code } = req.params;
        try {
            const couponId = await CouponService.getCouponIdByCode(code);
            res.json({ couponId });
        } catch (error) {
            res.status(500).json({ error: 'Error retrieving coupon ID' });
        }
    }

    // Get discount for a coupon code
    async getCouponDiscount(req, res) {
        const { code } = req.params;
        try {
            const discount = await CouponService.getCouponDiscount(code);
            res.json({ discount });
        } catch (error) {
            res.status(500).json({ error: 'Error retrieving discount' });
        }
    }

    // Link a coupon to an order
    async insertOrderCoupon(req, res) {
        const { orderId, couponId } = req.body;
        try {
            await CouponService.insertOrderCoupon(orderId, couponId);
            res.json({ message: 'Coupon applied to order successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Error inserting order coupon' });
        }
    }
}

module.exports = new CouponController();
