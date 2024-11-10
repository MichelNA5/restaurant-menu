class Coupon {
    constructor(coupon_id, code, discount_amount) {
        this.coupon_id = coupon_id;
        this.code = code;
        this.discount_amount = discount_amount;
    }

    static fromRow(row) {
        return new Coupon(row.coupon_id, row.code, row.discount_amount);
    }
}

module.exports = Coupon;
