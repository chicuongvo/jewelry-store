import express from "express";

import {
  getAllUnits,
  getUnit,
  createUnit,
  deleteUnit,
  updateUnit,
} from "../controllers/unitController.js";

const router = express.Router();

router.get("/get-all", getAllUnits);
router.get("/:unit_id", getUnit);
router.post("/create", createUnit);
router.post("/delete/:unit_id", deleteUnit);
router.put("/update/:unit_id", updateUnit);

export default router;
