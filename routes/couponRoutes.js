const express = require('express');
const CouponController = require('../controllers/couponController');
const { validateCouponApplication, validateCouponCodeParam } = require('../validators/couponValidator');

const router = express.Router();

// Route to get coupon ID by code, validates coupon code in the URL
router.get('/id/:code', validateCouponCodeParam, CouponController.getCouponIdByCode);

// Route to get coupon discount by code, validates coupon code in the URL
router.get('/discount/:code', validateCouponCodeParam, CouponController.getCouponDiscount);

// Route to apply a coupon, validates coupon data in the request body
router.post('/apply', validateCouponApplication, CouponController.insertOrderCoupon);

module.exports = router;  // Export the router
