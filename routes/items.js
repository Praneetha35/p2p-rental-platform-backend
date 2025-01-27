const express = require('express');
const {
  addItem,
  searchItems,
  listAllItems,
  rentItem,
  returnItem,
  viewRentalHistory,
  deleteItem,
} = require('../controllers/itemController');


// Define routes
const router = express.Router();

// Add a new item
router.post('/', addItem);

// Search for items by name or price range
router.get('/', searchItems);

// List all items in the database
router.get('/allItems', listAllItems);

// View rental history of a specific item by ID
router.get('/:id/rentals', viewRentalHistory);

// Rent an item by ID
router.post('/:id/rent', rentItem);

// Return a rented item by ID
router.post('/:id/return', returnItem);

// Delete an item by ID
router.delete('/:id', deleteItem);

module.exports = router;