import express from "express";
import {
  getAllBlog,
  getSingleBlog,
  createBlog,
  editBlog,
  removeBlog,
  getAllUserBlog,
} from "../controller/blog.controller.js";
import protect from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/blogs", getAllBlog);
router.get("/user_blog/:username", getAllUserBlog);
router.get("/blog/:id", getSingleBlog);
router.post("/blog", protect, createBlog);
router.put("/blog/:id", protect, editBlog);
router.delete("/blog/:id", protect, removeBlog);

export default router;
