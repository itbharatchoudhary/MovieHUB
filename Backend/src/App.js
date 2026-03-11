// This file sets up the Express server, connects to the MongoDB database, and defines the API routes.
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

// Import the database connection function
const ConnectToMongoDB = require("./config/Database");

// Import route handlers for authentication, favorites, and history
const AuthRoutes = require("./routes/Auth.routes");
const FavoriteRoutes = require("./routes/Favorite.routes");
const HistoryRoutes = require("./routes/History.routes");
import movieRoutes from "./routes/movieRoutes.js";

// Load environment variables from .env file
dotenv.config();

// Initialize the Express application
const App = express();

// middleware
// This middleware allows the server to parse JSON request bodies and handle CORS (Cross-Origin Resource Sharing) issues.
App.use(express.json());
// This middleware enables CORS, allowing the server to accept requests from different origins, which is essential for frontend-backend communication in web applications.
App.use(cors());

//  Connect to the MongoDB database
ConnectToMongoDB();

// Define API routes
App.use("/api", AuthRoutes);
App.use("/api/favorites", FavoriteRoutes);
App.use("/api/history", HistoryRoutes);
App.use("/api/movies", movieRoutes);

module.exports = App;