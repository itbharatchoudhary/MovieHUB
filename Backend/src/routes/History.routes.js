const express = require("express");
const router = express.Router();

// Import the authentication middleware to protect routes
const protect = require("../middleware/Auth.middleware").protect;

// Import the HistoryController which contains the logic for handling history-related requests
const HistoryController = require("../controllers/History.Controller");

/**
 * @route   POST /api/history
 * @desc    Add a movie to the user's history
 * @access  Private (requires authentication)
 */
router.post("/", protect, HistoryController.addHistory);

/**
 * @route   GET /api/history
 * @desc    Get the user's history
 * @access  Private (requires authentication)
 */
router.get("/", protect, HistoryController.getHistory);

module.exports = router;