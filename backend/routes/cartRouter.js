import {
  createCart,
  updateCart,
  deleteCart,
  getCartByUserId,
} from "../controllers/cartController.js";
import express from "express";

const router = express.Router();

router.get("/:userId", getCartByUserId);
router.post("/:userId", createCart);
router.put("/:userId/:productId", updateCart);
router.delete("/:userId/:productId", deleteCart);

export default router;
