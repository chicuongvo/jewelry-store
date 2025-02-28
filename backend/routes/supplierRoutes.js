import express from "express";

import {
  createSupplier,
  getAllSuppliers,
  getSupplier,
  deleteSupplier,
  updateSupplier,
} from "../controllers/supplierController.js";

const router = express.Router();

router.get("/get-all", getAllSuppliers);
router.get("/:supplier_id", getSupplier);
router.post("/create", createSupplier);
router.post("/delete/:supplier_id", deleteSupplier);
router.put("/update/:supplier_id", updateSupplier);

export default router;
