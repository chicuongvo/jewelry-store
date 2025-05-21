import { prisma } from "../config/db.js";

export const getAllSalesOrders = async (req, res) => {
  try {
    const products = await prisma.sales_orders.findMany();

    return res.status(200).json({ success: true, data: products });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

export const getSalesOrder = async (req, res) => {
  const sales_order_id = req.params.id;

  try {
    const salesOrder = await prisma.sales_orders.findUnique({
      where: { sales_order_id },
    });

    if (salesOrder) {
      return res.status(200).json({ success: true, data: salesOrder });
    }

    return res
      .status(404)
      .json({ success: false, message: "No sales order was found" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

export const createSalesOrder = async (req, res) => {
  const { supplier_id } = req.body;

  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No data provided" });
    }

    const [checkSupplier] = await Promise.all([
      prisma.suppliers.findUnique({ where: { supplier_id } }),
    ]);

    if (!checkSupplier)
      return res
        .status(404)
        .json({ success: false, message: "Supplier was not valid" });

    const newSalesOrder = await prisma.sales_orders.create({
      data: {
        supplier_id,
      },
    });

    return res.status(201).json({ success: true, data: newSalesOrder });
  } catch (error) {
    if (error.isJoi) {
      return res.status(400).json({
        success: false,
        message: error.details.map((err) => err.message),
      });
    }

    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

export const deleteSalesOrder = async (req, res) => {
  const sales_order_id = req.params.id;
  try {
    const checkSalesOrder = await prisma.sales_orders.findUnique({
      where: { sales_order_id },
    });

    if (checkSalesOrder) {
      await prisma.sales_orders.delete({ where: { sales_order_id } });
      return res
        .status(200)
        .json({ success: true, message: "Delete sales order successfully" });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "No sales order was found" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const updateSalesOrder = async (req, res) => {
  const sales_order_id = req.params.id;
  const { supplier_id } = req.body;

  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No data provided" });
    }

    const oldSalesOrder = await prisma.sales_orders.findUnique({
      where: { sales_order_id },
    });
    if (!oldSalesOrder) {
      return res
        .status(404)
        .json({ success: false, message: "Sales order not found" });
    }

    const [checkSupplier] = await Promise.all([
      prisma.suppliers.findUnique({ where: { supplier_id } }),
    ]);

    if (!checkSupplier)
      return res
        .status(404)
        .json({ success: false, message: "Supplier was not valid" });

    const updatedSalesOrder = await prisma.sales_orders.update({
      where: { sales_order_id },
      data: {
        supplier_id: supplier_id ?? oldProduct.supplier_id,
      },
    });

    return res.status(200).json({ success: true, data: updatedSalesOrder });
  } catch (error) {
    if (error.isJoi) {
      return res.status(400).json({
        success: false,
        message: error.details.map((err) => err.message),
      });
    }

    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};
