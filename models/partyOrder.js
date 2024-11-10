class PartyOrder {
    constructor(orderId, userId, orderDate, subtotal, username) {
        this.orderId = orderId;
        this.userId = userId;
        this.orderDate = orderDate;
        this.subtotal = subtotal;
        this.username = username;
        this.items = [];
    }

    addOrderItem(orderItem) {
        this.items.push(orderItem);
    }
}

module.exports = PartyOrder;
