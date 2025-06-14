import {
  updateCart,
  getCartByUserId,
  addToCart,
  removeFromCart,
} from "../controllers/cartController.js";
import express from "express";

const router = express.Router();

router.get("/:userId", getCartByUserId);
router.post("/:user_id/add/:product_id", addToCart);
router.post("/:user_id/remove/:product_id", removeFromCart);
router.put("/:user_id/update/:product_id", updateCart);

export default router;
