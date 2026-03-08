const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  movieId: String,
  title: String,
  poster: String

}, { timestamps: true });

module.exports = mongoose.model("History", historySchema);