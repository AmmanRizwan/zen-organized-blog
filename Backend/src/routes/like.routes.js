import express from "express";
import protect from "../middleware/protectRoute.js";
import {
  findLikedUser,
  likeUnlikeBlog,
  showAllLikeBlog,
} from "../controller/like.controller.js";
const router = express.Router();

router.post("/like/:id", protect, likeUnlikeBlog);
router.get("/like", protect, showAllLikeBlog);
router.get("/like/blogs", protect, findLikedUser);

export default router;
