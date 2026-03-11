import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/Database.js";

import authRoutes from "./src/routes/Auth.routes.js";
import userRoutes from "./src/routes/User.routes.js";
import movieRoutes from "./src/routes/Movie.routes.js";

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/movies", movieRoutes);

app.get("/", (req, res) => {
  res.send("MovieHUB Backend Running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});