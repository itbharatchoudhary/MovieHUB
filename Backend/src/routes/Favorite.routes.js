const express = require("express");
const router = express.Router();

// Import the authentication middleware to protect routes
const protect = require("../middleware/Auth.middleware");

// Import the FavoriteController which contains the logic for handling favorite-related requests
const FavoriteController = require("../controllers/Favorite.Controller");


/** 
 * @route   POST /api/favorites
 * @desc    Add a movie to the user's favorites
 * @access  Private (requires authentication)
 */
router.post("/", protect, FavoriteController.addFavorite);

/**
 * @route   GET /api/favorites
 * @desc    Get the user's favorite movies
 * @access  Private (requires authentication)
 */
router.get("/", protect, FavoriteController.getFavorites);

/**
 * @route   DELETE /api/favorites/:id
 * @desc    Remove a movie from the user's favorites
 * @access  Private (requires authentication)
 */
router.delete("/:id", protect, FavoriteController.removeFavorite);

module.exports = router;