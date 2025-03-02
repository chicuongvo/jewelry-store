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

router.get("/get-all", getAllProducts);
router.get("/:product_id", getProduct);
router.post("/create", verifyToken, verifyAdmin, createProduct);
router.post("/delete/:product_id", verifyToken, verifyAdmin, deleteProduct);
router.put("/update/:product_id", verifyToken, verifyAdmin, updateProduct);

export default router;
