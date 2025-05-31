const express = require("express");
const router = express.Router();
const {
  getAllInventoryReportDetails,
  getInventoryReportDetails,
  createInventoryReportDetails,
  updateInventoryReportDetails,
  deleteInventoryReportDetails,
} = require("../controllers/inventoryReportDetailsController");

// Get all inventory report details
router.get("/", getAllInventoryReportDetails);

// Get inventory report details by ID
router.get("/:reportId/:productId", getInventoryReportDetails);

// Create new inventory report details
router.post("/", createInventoryReportDetails);

// Update inventory report details
router.put("/:reportId/:productId", updateInventoryReportDetails);

// Delete inventory report details
router.delete("/:reportId/:productId", deleteInventoryReportDetails);

module.exports = router;
