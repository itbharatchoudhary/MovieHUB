import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true
  },
  password: String,

  favorites: [
    {
      movieId: Number,
      title: String,
      poster: String
    }
  ],

  history: [
    {
      movieId: Number,
      title: String,
      watchedAt: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

export default mongoose.model("User", userSchema);