import express from "express";
import { getTrending } from "../controllers/Movie.Controller";

const router = express.Router();

router.get("/trending", getTrending);

export default router;