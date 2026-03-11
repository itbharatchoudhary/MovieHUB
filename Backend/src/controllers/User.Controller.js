import User from "../models/User.model";

export const getProfile = async (req, res) => {

  const user = await User.findById(req.user._id);

  res.json(user);

};

export const addFavorite = async (req, res) => {

  const { movieId, title, poster } = req.body;

  const user = await User.findById(req.user._id);

  user.favorites.push({ movieId, title, poster });

  await user.save();

  res.json(user.favorites);

};

export const addHistory = async (req, res) => {

  const { movieId, title } = req.body;

  const user = await User.findById(req.user._id);

  user.history.push({ movieId, title });

  await user.save();

  res.json(user.history);

};