import express from "express";
import {
  getProducts,
  getProduct,
  createProduct,
  deleteProduct,
  updateProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/get-all", getProducts);
router.get("/:id", getProduct);
router.post("/create", createProduct);
router.post("/delete/:id", deleteProduct);
router.put("/update/:id", updateProduct);

export default router;
