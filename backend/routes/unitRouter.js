import express from "express";

import {
  getAllUnits,
  getUnit,
  createUnit,
  deleteUnit,
  updateUnit,
} from "../controllers/unitController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js";

const router = express.Router();

router.get("/get-all", getAllUnits);
router.get("/:unit_id", getUnit);
router.post("/create", verifyToken, verifyAdmin, createUnit);
router.post("/delete/:unit_id", verifyToken, verifyAdmin, deleteUnit);
router.put("/update/:unit_id", verifyToken, verifyAdmin, updateUnit);

export default router;
