import express from "express";
import {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview,
} from "../controllers/review.controller";
import { authenticateAPI } from "../middlewares/auth.middleware";

const router = express.Router();

// Apply auth middleware to all review routes
router.use(authenticateAPI);

router.post("/", createReview);
router.get("/", getAllReviews);
router.get("/:id", getReviewById);
router.put("/:id", updateReview);
router.delete("/:id", deleteReview);

export default router;
