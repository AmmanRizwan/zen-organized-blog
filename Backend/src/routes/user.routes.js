import express from "express";
import {
  Login,
  Logout,
  Signup,
  Profile,
  UpdateProfile,
  changePass,
  forgotPass,
} from "../controller/users.controller.js";
import protect from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/login", Login);
router.post("/signup", Signup);
router.post("/logout", Logout);
router.patch("/forgot", forgotPass);
router.get("/profile/:username", protect, Profile);
router.put("/update", protect, UpdateProfile);
router.put("/change", protect, changePass);

export default router;
