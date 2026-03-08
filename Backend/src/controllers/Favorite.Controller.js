const Favorite = require("../models/Favorite.model");


// ADD FAVORITE
exports.addFavorite = async (req, res) => {

  const { movieId, title, poster } = req.body;

  const favorite = await Favorite.create({
    user: req.user._id,
    movieId,
    title,
    poster
  });

  res.json(favorite);
};


// GET FAVORITES
exports.getFavorites = async (req, res) => {

  const favorites = await Favorite.find({
    user: req.user._id
  });

  res.json(favorites);
};


// REMOVE FAVORITE
exports.removeFavorite = async (req, res) => {

  await Favorite.findByIdAndDelete(req.params.id);

  res.json({ message: "Removed from favorites" });
};