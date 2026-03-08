const History = require("../models/History");


exports.addHistory = async (req, res) => {

  const { movieId, title, poster } = req.body;

  const history = await History.create({
    user: req.user._id,
    movieId,
    title,
    poster
  });

  res.json(history);
};


// GET HISTORY
exports.getHistory = async (req, res) => {

  const history = await History.find({
    user: req.user._id
  }).sort({ createdAt: -1 });

  res.json(history);
};