class OrderCoupon {
    constructor(order_id, coupon_id) {
        this.order_id = order_id;
        this.coupon_id = coupon_id;
    }

    static fromRow(row) {
        return new OrderCoupon(row.order_id, row.coupon_id);
    }
}

module.exports = OrderCoupon;
