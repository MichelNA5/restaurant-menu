class FavoriteCombinationItem {
    constructor(combination_id, menu_item_id, menu_item_name, menu_item_price, quantity, customization) {
        this.combination_id = combination_id;
        this.menu_item_id = menu_item_id;
        this.menu_item_name = menu_item_name;
        this.menu_item_price = menu_item_price;
        this.quantity = quantity;
        this.customization = customization;
    }

    static fromRow(row) {
        return new FavoriteCombinationItem(
            row.combination_id,
            row.menu_item_id,
            row.menu_item_name,
            row.menu_item_price,
            row.quantity,
            row.customization
        );
    }
}

module.exports = FavoriteCombinationItem;
