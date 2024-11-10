class MenuItem {
    constructor(menu_item_id, name, description, price, category_id, category_name) {
        this.menu_item_id = menu_item_id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.category_id = category_id;
        this.category_name = category_name;
    }

    // Static method to map a database row to a MenuItem model
    static fromRow(row) {
        return new MenuItem(
            row.menu_item_id,     // Map menu_item_id
            row.name,             // Map name
            row.description,      // Map description
            row.price,            // Map price
            row.category_id,
            row.category_name     // Map category_id
        );
    }
}

module.exports = MenuItem;
