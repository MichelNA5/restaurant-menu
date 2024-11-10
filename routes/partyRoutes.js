const express = require('express');
const partyController = require('../controllers/partyController');
const {
    validateCreateParty,
    validateJoinParty,
    validatePartyCode,
    validateActivePartyCode,
    validateEndActiveParty
} = require('../validators/partyValidator');
const router = express.Router();

// Route to create a party 
router.post('/create', validateCreateParty, partyController.createParty);

// Route to join a party 
router.post('/join', validateJoinParty, partyController.joinParty);

// Route to get the active party code for a user
router.get('/active', validateActivePartyCode, partyController.getActivePartyCode);

// Route to end the active party for a user 
router.patch('/end', validateEndActiveParty, partyController.endActiveParty);

// Route to get party creator info by party code 
router.get('/creator/:partyCode', validatePartyCode, partyController.getPartyCreatorInfo);

// Route to get orders by party code 
router.get('/:partyCode/orders', validatePartyCode, partyController.getOrdersByPartyCode);

module.exports = router;
