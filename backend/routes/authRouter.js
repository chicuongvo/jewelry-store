import {
  signUp,
  signIn,
  getUser,
  signOut,
  getAllUsers,
  signInGoogle,
  verifyEmail,
} from "../controllers/authController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js";
import express from "express";
import passport from "passport";

const router = express.Router();

router.get("/me", verifyToken, getUser);
router.get("/get-all", verifyToken, verifyAdmin, getAllUsers);
router.post("/sign-up", signUp);
router.post("/sign-in", signIn);
router.post("/sign-out", signOut);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

// Route callback sau khi Google xác thực
router.get("/google/callback", (req, res, next) => {
  passport.authenticate("google", { session: false }, (err, user) => {
    if (err || !user) {
      console.error("Google OAuth Error:", err);
      return res.status(401).json({ message: "Authentication failed" });
    }

    // Gọi hàm signInGoogle để xử lý login
    signInGoogle(req, res, next, user);
  })(req, res, next);
});

router.post("/verify", verifyEmail);
export default router;
