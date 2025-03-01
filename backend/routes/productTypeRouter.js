import express from "express";
import {
  getAllTypes,
  getType,
  createType,
  deleteType,
  updateType,
} from "../controllers/productTypeController.js";

const router = express.Router();

router.get("/get-all", getAllTypes);
router.get("/:type_id", getType);
router.post("/create", createType);
router.post("/delete/:type_id", deleteType);
router.put("/update/:type_id", updateType);

export default router;
