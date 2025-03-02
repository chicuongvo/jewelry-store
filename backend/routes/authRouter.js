import {
  signUp,
  signIn,
  getUser,
  signOut,
  getAllUser,
} from "../controllers/authController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js";
import express from "express";

const router = express.Router();

router.get("/me", verifyToken, getUser);
router.get("/get-all", verifyToken, verifyAdmin, getAllUser);
router.post("/sign-up", signUp);
router.post("/sign-in", signIn);
router.post("/sign-out", signOut);

export default router;
