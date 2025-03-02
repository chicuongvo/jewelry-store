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

router.get("/get-all", getAllTypes);
router.get("/:type_id", getType);
router.post("/create", verifyToken, verifyAdmin, createType);
router.post("/delete/:type_id", verifyToken, verifyAdmin, deleteType);
router.put("/update/:type_id", verifyToken, verifyAdmin, updateType);

export default router;
