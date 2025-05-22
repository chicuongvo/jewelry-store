import {
  getServiceOrder,
  createServiceOrders,
  deleteServiceOrder,
  updateServiceOrder,
} from "../controllers/serviceOrdersController.js";

import express from "express";

const router = express.Router();
router.get("/:service_order_id", getServiceOrder);
router.post("/", createServiceOrders);
router.put("/:service_order_id", updateServiceOrder);
router.delete("/:service_order_id", deleteServiceOrder);
export default router;
