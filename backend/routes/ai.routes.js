import express from "express";
import {
  getReview,
  getPastPrompts,
  updateReview,
  deleteReview,
} from "./controllers/ai.controller.js";

import { authMiddleware } from "../controllers/auth.controller.js";

const router = express.Router();
router.post("/get-review", authMiddleware, getReview);
router.get("/past-prompts", authMiddleware, getPastPrompts);
router.put("/past-prompts/:id", authMiddleware, updateReview);
router.delete("/past-prompts/:id", authMiddleware, deleteReview);

export default router;