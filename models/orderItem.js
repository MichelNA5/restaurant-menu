// models/orderItem.js
class OrderItem {
    constructor(order_id, menu_item_id, name, price, quantity, customization) {
        this.order_id = order_id;
        this.menu_item_id = menu_item_id;
        this.name = name;           // Add item name
        this.price = price;         // Add item price
        this.quantity = quantity;
        this.customization = customization;
    }

    // Static method to map the database row to an OrderItem instance
    static fromRow(row) {
        return new OrderItem(
            row.order_id,
            row.menu_item_id,
            row.name,              // Name from the menu_item table
            row.price,             // Price from the menu_item table
            row.quantity,
            row.customization
        );
    }
}

module.exports = OrderItem;
