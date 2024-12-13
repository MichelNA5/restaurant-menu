const PartyService = require('../services/partyService');

module.exports = {
    // Creates a party with the given code and userId
    async createParty(req, res) {
        try {
            const { code, userId } = req.body;
            await PartyService.createParty(code, userId);
            res.status(201).json({ message: `Party created with code: ${code}` });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Allows a user to join a party using code, orderId, and userId
    async joinParty(req, res) {
        try {
            const { code, orderId, userId } = req.body;
            await PartyService.joinParty(code, userId, orderId);
            res.status(200).send(`User ${userId} joined party with code: ${code}`);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async isPartyActive(req, res) {

        try {
            const { partyCode } = req.params; // Retrieve partyCode from URL params
            const isActive = await PartyService.isPartyActive(partyCode);

            // Return true or false based on whether the party is active
            if (isActive) {
                res.status(200).json({ isActive: true, message: `Party with code ${partyCode} is active.` });
            } else {
                res.status(200).json({ isActive: false, message: `Party with code ${partyCode} is not active.` });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Gets the active party code for the user
    async getActivePartyCode(req, res) {
        try {
            const { userId } = req.params;
            console.log(userId);
            const partyCode = await PartyService.getActivePartyCode(userId);
            partyCode ? res.status(200).json({ partyCode }) : res.status(404).json({ message: 'No active party found' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Ends the user's active party
    async endActiveParty(req, res) {
        try {
            const { userId } = req.body;
            const success = await PartyService.endActiveParty(userId);
            success ? res.status(200).json({ message: 'Active party ended' }) : res.status(404).json({ message: 'Active party not found!' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Gets the creator info for a party using party code
    async getPartyCreatorInfo(req, res) {
        try {
            const { partyCode } = req.params;
            const creatorInfo = await PartyService.getPartyCreatorInfo(partyCode);
            creatorInfo ? res.status(200).json(creatorInfo) : res.status(404).json({ message: 'Party not found' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Gets orders in a party using party code
    async getOrdersByPartyCode(req, res) {
        try {
            const { partyCode } = req.params;
            const orders = await PartyService.getOrdersByPartyCode(partyCode);
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }


};
