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

router.get("/", getAllSuppliers);
router.get("/:id", getSupplier);
router.post("/", verifyToken, verifyAdmin, createSupplier);
router.delete("/:id", verifyToken, verifyAdmin, deleteSupplier);
router.put("/:id", verifyToken, verifyAdmin, updateSupplier);

export default router;
