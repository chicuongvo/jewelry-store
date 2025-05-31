import express from "express";
import {
  getAllTypes,
  getType,
  createType,
  deleteType,
  updateType,
} from "../controllers/productTypeController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js";

const router = express.Router();

router.get("/", getAllTypes);
router.get("/:id", getType);
router.post("/", verifyToken, verifyAdmin, createType);
router.delete("/:id", verifyToken, verifyAdmin, deleteType);
router.put("/:id", verifyToken, verifyAdmin, updateType);

export default router;
