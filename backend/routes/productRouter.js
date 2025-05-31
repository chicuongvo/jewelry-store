import express from "express";
import {
  getAllProducts,
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct,
} from "../controllers/productController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProduct);
router.post("/", createProduct);
router.delete("/:id", verifyToken, verifyAdmin, deleteProduct);
router.put("/:id", verifyToken, verifyAdmin, updateProduct);

export default router;
