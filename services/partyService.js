const Party = require('../models/party');
const PartyOrder = require('../models/partyOrder');
const OrderItem = require('../models/orderItem');
const { initDB } = require('../config/database');

class PartyService {
    constructor() {
        this.pool = null;
        this.init();
    }

    async init() {
        this.pool = await initDB();
    }

    // Check if the party code exists in the database
    async codeExistsInDatabase(code) {
        const query = "SELECT COUNT(*) AS count FROM party WHERE party_code = ?";
        const [result] = await this.pool.execute(query, [code]);
        return result[0].count > 0;
    }

    // Create a new party
    async createParty(code, userId) {
        const query = "INSERT INTO party (party_code, creator_user_id) VALUES (?, ?)";
        await this.pool.execute(query, [code, userId]);
    }

    // Check if a party is active
    async isPartyActive(partyCode) {
        const query = "SELECT is_active FROM party WHERE party_code = ?";
        const [result] = await this.pool.execute(query, [partyCode]);
        return result.length > 0 && result[0].is_active;
    }

    // Join a party and order should be added automatically
    async joinParty(code, userId, orderId) {
        const findPartyIdQuery = "SELECT party_id FROM party WHERE party_code = ?";
        const [party] = await this.pool.execute(findPartyIdQuery, [code]);

        if (!party.length) throw new Error("Party not found");

        const insertQuery = "INSERT INTO party_order (party_id, user_id, order_id) VALUES (?, ?, ?)";
        await this.pool.execute(insertQuery, [party[0].party_id, userId, orderId]);
    }

    // Get the active party code for a user
    async getActivePartyCode(userId) {
        const query = "SELECT party_code FROM party WHERE is_active = 1 AND creator_user_id = ?";
        const [result] = await this.pool.execute(query, [userId]);
        return result.length ? result[0].party_code : null;
    }

    // End the active party for a user
    async endActiveParty(userId) {
        const query = "UPDATE party SET is_active = 0 WHERE is_active = 1 AND creator_user_id = ?";
        const [result] = await this.pool.execute(query, [userId]);
        return result.affectedRows > 0;
    }

    // Get the creator's information for a given party code
    async getPartyCreatorInfo(partyCode) {
        const query = `
            SELECT u.user_id, u.username, u.address
            FROM user u
            JOIN party p ON u.user_id = p.creator_user_id
            WHERE p.party_code = ?
        `;
        const [user] = await this.pool.execute(query, [partyCode]);
        return user.length ? user[0] : null;
    }

    // Get all orders for a given party code
    async getOrdersByPartyCode(partyCode) {
        const orders = [];
        const orderIdQuery = `
            SELECT po.order_id 
            FROM party_order po
            JOIN party p ON po.party_id = p.party_id 
            WHERE p.party_code = ?
        `;
        const [orderRows] = await this.pool.execute(orderIdQuery, [partyCode]);

        const orderDetailsQuery = `
            SELECT mi.name, o.order_id, o.user_id, o.order_date, u.username, oi.menu_item_id, 
                   oi.quantity, oi.customization, (oi.quantity * mi.price) AS subtotal
            FROM \`order\` o
            JOIN \`user\` u ON o.user_id = u.user_id
            JOIN order_item oi ON o.order_id = oi.order_id
            JOIN menu_item mi ON oi.menu_item_id = mi.menu_item_id
            WHERE oi.order_id = ?
            ORDER BY o.order_id
        `;

        for (const { order_id } of orderRows) {
            const [detailsRows] = await this.pool.execute(orderDetailsQuery, [order_id]);
            let order = null;

            detailsRows.forEach((row) => {
                if (!order) {
                    order = new PartyOrder(row.order_id, row.user_id, row.order_date, row.subtotal, row.username);
                }

                const orderItem = OrderItem.fromRow(row);
                order.addOrderItem(orderItem);
            });

            if (order) orders.push(order);
        }

        return orders;
    }
}

module.exports = new PartyService();
