// controllers/favoriteCombinationController.js
const FavoriteCombinationService = require('../services/favoriteCombinationService');

class FavoriteCombinationController {

    // Render favorite combinations for a user
    static async getFavoriteCombosByUserID(req, res) {
        try {
            const user_id = req.params.user_id;
            const combos = await FavoriteCombinationService.getFavoriteCombosByUserID(user_id);
            res.render('favoriteCombos', { combinations: combos });
        } catch (err) {
            console.log(err);
            res.status(500).send('Error fetching favorite combos' + err);
        }
    }

    // Insert a new favorite combination
    static async insertFavoriteCombination(req, res) {
        try {
            const { user_id, name } = req.body;
            const combination_id = await FavoriteCombinationService.insertFavoriteCombination(user_id, name);
            res.status(201).json({ combination_id });
        } catch (err) {
            res.status(500).send('Error inserting favorite combination');
        }
    }

    // Delete a favorite combination by ID
    static async deleteFavoriteCombo(req, res) {
        try {
            const { combination_id } = req.params;
            await FavoriteCombinationService.deleteFavoriteCombo(combination_id);
            res.status(200).send('Favorite combination deleted');
        } catch (err) {
            res.status(500).send('Error deleting favorite combination');
        }
    }

    // Add an item to a favorite combination
    static async insertFavoriteCombinationItem(req, res) {
        try {
            const { combination_id, menu_item_id, quantity, customization } = req.body;
            await FavoriteCombinationService.insertFavoriteCombinationItem(combination_id, menu_item_id, quantity, customization);
            res.status(201).send('Item added to favorite combination');
        } catch (err) {
            res.status(500).send('Error inserting item');
            console.log(err)
        }
    }

    // Delete all items from a favorite combination
    static async deleteFavoriteCombinationItems(req, res) {
        try {
            const { combination_id } = req.params;
            await FavoriteCombinationService.deleteFavoriteCombinationItems(combination_id);
            res.status(200).send('Item removed from favorite combination');
        } catch (err) {
            res.status(500).send('Error deleting item');
        }
    }

    // Get items in a favorite combination
    static async getFavoriteComboItems(req, res) {
        try {
            const { combination_id } = req.params;
            const items = await FavoriteCombinationService.getFavoriteComboItems(combination_id);
            res.json(items);
        } catch (err) {
            res.status(500).send('Error fetching favorite combination items');
        }
    }



}




module.exports = FavoriteCombinationController;
