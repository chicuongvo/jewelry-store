import {
  signUp,
  signIn,
  getUser,
  signOut,
} from "../controllers/authController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import express from "express";

const router = express.Router();

router.post("/sign-up", signUp);
router.post("/sign-in", signIn);
router.get("/me", verifyToken, getUser);
router.post("/sign-out", signOut);

export default router;
