import { prisma } from "../config/db.js";

// Get all inventory reports
export const getAllInventoryReports = async (req, res) => {
  try {
    const reports = await prisma.inventory_reports.findMany({
      include: {
        inventory_report_details: {
          include: {
            product: true,
          },
        },
      },
    });
    return res.status(200).json({ success: true, data: reports });
  } catch (error) {
    console.log("Error get all inventory reports:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

// Get inventory report by ID
export const getInventoryReportById = async (req, res) => {
  const report_id = req.params.id;
  try {
    const report = await prisma.inventory_reports.findUnique({
      where: { report_id },
      include: {
        inventory_report_details: {
          include: {
            product: true,
          },
        },
      },
    });

    if (report) {
      return res.status(200).json({ success: true, data: report });
    }

    return res
      .status(404)
      .json({ success: false, message: "No inventory report was found" });
  } catch (error) {
    console.log("Error get details inventory report:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

// Get inventory report by month and year
export const getInventoryReportByMonthYear = async (req, res) => {
  try {
    const { month, year } = req.params;
    const report = await prisma.inventory_reports.findFirst({
      where: {
        month: parseInt(month),
        year: parseInt(year),
      },
      include: {
        inventory_report_details: {
          include: {
            product: true,
          },
        },
      },
    });

    if (report) {
      const totalBeginStock = report.inventory_report_details.reduce(
        (sum, detail) => sum + (detail.begin_stock || 0),
        0
      );
      const totalEndStock = report.inventory_report_details.reduce(
        (sum, detail) => sum + (detail.end_stock || 0),
        0
      );

      return res.status(200).json({
        success: true,
        data: {
          ...report,
          total_begin_stock,
          total_end_stock,
        },
      });
    }

    return res.status(404).json({
      success: false,
      message: "No inventory report was found for the specified month and year",
    });
  } catch (error) {
    console.log("Error get inventory report by month/year:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

// Create new inventory report
export const createInventoryReport = async (req, res) => {
  try {
    const { month, year } = req.body;

    if (!req.body || Object.keys(req.body).length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No data provided" });
    }

    // Validate required fields
    if (!month || !year) {
      return res
        .status(400)
        .json({ success: false, message: "Month and year are required" });
    }

    // Check if report already exists for the month and year
    const existingReport = await prisma.inventory_reports.findFirst({
      where: {
        month: parseInt(month),
        year: parseInt(year),
      },
    });

    if (existingReport) {
      return res.status(400).json({
        success: false,
        message: "Inventory report already exists for this month and year",
      });
    }

    const report = await prisma.inventory_reports.create({
      data: {
        month: parseInt(month),
        year: parseInt(year),
      },
    });

    return res.status(201).json({ success: true, data: report });
  } catch (error) {
    console.error("Error creating inventory report:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

// Update inventory report details
export const updateInventoryReport = async (req, res) => {
  try {
    const report_id = req.params.id;
    const { month, year } = req.body;

    if (!req.body || Object.keys(req.body).length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No data provided" });
    }

    // Check if report exists
    const report = await prisma.inventory_reports.findUnique({
      where: { report_id },
    });

    if (!report) {
      return res
        .status(404)
        .json({ success: false, message: "Inventory report not found" });
    }

    const updatedInventoryReports = await prisma.inventory_reports.update({
      where: {
        report_id,
      },
      data: {
        month,
        year,
      },
    });

    return res
      .status(200)
      .json({ success: true, data: updatedInventoryReports });
  } catch (error) {
    console.error("Error updating inventory report details:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

// Delete inventory report
export const deleteInventoryReport = async (req, res) => {
  const report_id = req.params.id;
  try {
    const report = await prisma.inventory_reports.findUnique({
      where: { report_id },
    });

    if (!report) {
      return res
        .status(404)
        .json({ success: false, message: "Inventory report not found" });
    }

    // Delete all related details first
    await prisma.inventory_report_details.deleteMany({
      where: { report_id },
    });

    // Delete the report
    await prisma.inventory_reports.delete({
      where: { report_id },
    });

    return res
      .status(200)
      .json({ success: true, message: "Delete inventory report successfully" });
  } catch (error) {
    console.log("Error delete inventory report:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};
