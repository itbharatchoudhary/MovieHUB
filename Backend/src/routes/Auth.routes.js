import express from "express";
import { login, register } from "../controllers/Auth.Controller.js";

const router = express.Router();

// Register User
router.post("/register", register);

// Login User
router.post("/login", login);

export default router;