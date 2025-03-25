import express from "express";
import protect from "../middleware/protectRoute.js";
import {
  createComment,
  deleteComment,
  editComment,
  getAllComment,
  singleComment,
} from "../controller/comment.controller.js";

const router = express.Router();

router.get("/blog/comments/:id", getAllComment);
router.get("/comment/:id", singleComment);
router.post("/comment/:id", protect, createComment);
router.put("/comment/:id", protect, editComment);
router.delete("/comment/:id", protect, deleteComment);

export default router;
