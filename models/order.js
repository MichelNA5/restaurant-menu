// models/Order.js
const moment = require('moment');

class Order {
    constructor(order_id, user_id, order_date, status) {
        this.order_id = order_id;
        this.user_id = user_id;
        this.order_date = moment(order_date).format('YYYY-MM-DD');
        this.status = status;
    }

    static fromRow(row) {
        return new Order(row.order_id, row.user_id, row.order_date, row.status);
    }
}

module.exports = Order;
