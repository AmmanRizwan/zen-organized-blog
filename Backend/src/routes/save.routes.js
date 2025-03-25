import express from "express";
import { saveBlog, showAllSavedBlog } from "../controller/save.controller.js";
import protect from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/save/:id", protect, saveBlog);
router.get("/save", protect, showAllSavedBlog);

export default router;
