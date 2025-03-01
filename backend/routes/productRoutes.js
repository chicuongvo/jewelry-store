import express from "express";
import {
  getAllProducts,
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/get-all", getAllProducts);
router.get("/:product_id", getProduct);
router.post("/create", createProduct);
router.post("/delete/:product_id", deleteProduct);
router.put("/update/:product_id", updateProduct);

export default router;
