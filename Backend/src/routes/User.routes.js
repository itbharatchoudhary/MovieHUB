import express from "express";
import { protect } from "../middleware/Auth.middleware.js";
import { getProfile, addFavorite, addHistory } from "../controllers/userController.js";

const router = express.Router();

router.get("/profile", protect, getProfile);
router.post("/favorite", protect, addFavorite);
router.post("/history", protect, addHistory);

export default router;