const express = require('express');
const router = express.Router();
const FavoriteCombinationController = require('../controllers/favoriteCombinationController');
const {
    validateFavoriteCombination,
    validateFavoriteCombinationItem,
    validateParams,
    handleValidationErrors
} = require('../validators/favoriteCombinationValidator');

// Get favorite combinations for a user
router.get('/user/:user_id', FavoriteCombinationController.getFavoriteCombosByUserID);

// Insert a new favorite combination, with validation
router.post('/', validateFavoriteCombination, handleValidationErrors, FavoriteCombinationController.insertFavoriteCombination);

// Delete a favorite combination by its ID, with validation
router.delete('/:combination_id', validateParams('combination_id'), handleValidationErrors, FavoriteCombinationController.deleteFavoriteCombo);

// Insert a new item into a favorite combination, with validation
router.post('/item', validateFavoriteCombinationItem, handleValidationErrors, FavoriteCombinationController.insertFavoriteCombinationItem);

// Delete items from a favorite combination, with validation
router.delete('/items/:combination_id', validateParams('combination_id'), handleValidationErrors, FavoriteCombinationController.deleteFavoriteCombinationItems);

// Get items from a favorite combination by its ID, with validation
router.get('/items/:combination_id', validateParams('combination_id'), handleValidationErrors, FavoriteCombinationController.getFavoriteComboItems);

module.exports = router;  // Export the router
