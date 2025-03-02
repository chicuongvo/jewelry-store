import express from "express";

import {
  createSupplier,
  getAllSuppliers,
  getSupplier,
  deleteSupplier,
  updateSupplier,
} from "../controllers/supplierController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js";

const router = express.Router();

router.get("/get-all", getAllSuppliers);
router.get("/:supplier_id", getSupplier);
router.post("/create", verifyToken, verifyAdmin, createSupplier);
router.post("/delete/:supplier_id", verifyToken, verifyAdmin, deleteSupplier);
router.put("/update/:supplier_id", verifyToken, verifyAdmin, updateSupplier);

export default router;
