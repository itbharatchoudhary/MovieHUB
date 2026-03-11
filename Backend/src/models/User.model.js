import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema(
  {
    movieId: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    poster: {
      type: String
    }
  },
  { _id: false }
);

const historySchema = new mongoose.Schema(
  {
    movieId: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    watchedAt: {
      type: Date,
      default: Date.now
    }
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      required: true
    },

    favorites: [favoriteSchema],

    history: [historySchema]
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("User", userSchema);

export default User;