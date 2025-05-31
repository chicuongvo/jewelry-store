const express = require("express");
const router = express.Router();
const {
  getAllPurchaseOrders,
  getPurchaseOrder,
  createPurchaseOrder,
  updatePurchaseOrder,
  deletePurchaseOrder,
} = require("../controllers/purchaseOrdersController");

// Get all purchase orders
router.get("/", getAllPurchaseOrders);

// Get purchase order by ID
router.get("/:orderId", getPurchaseOrder);

// Create new purchase order
router.post("/", createPurchaseOrder);

// Update purchase order
router.put("/:orderId", updatePurchaseOrder);

// Delete purchase order
router.delete("/:orderId", deletePurchaseOrder);

module.exports = router;
