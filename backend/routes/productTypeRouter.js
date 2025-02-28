import express from "express";
import { getAllTypes } from "../controllers/productTypeController.js";

const router = express.Router();

router.get("/get-all", getAllTypes);

export default router;
