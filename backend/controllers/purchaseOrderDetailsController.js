import { prisma } from "../config/db.js";

export const getAllPurchaseOrderDetails = async (req, res) => {
  try {
    const purchaseOrderDetails = await prisma.purchase_order_details.findMany();
    return res.status(200).json({ success: true, data: purchaseOrderDetails });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

export const getPurchaseOrderDetail = async (req, res) => {
  const purchase_order_id = req.params.id;
  const product_id = req.params.id2;
  try {
    const purchaseOrderDetail = await prisma.purchase_order_details.findUnique({
      where: { purchase_order_id, product_id },
    });

    if (purchaseOrderDetail) {
      return res.status(200).json({ success: true, data: purchaseOrderDetail });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

export const createPurchaseOrderDetail = async (req, res) => {
  const { purchase_order_id, product_id, quantity } = req.body;

  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No data provided" });
    }

    const [checkPurchaseOrder, checkProduct] = await Promise.all([
      prisma.purchase_orders.findUnique({ where: { purchase_order_id } }),
      prisma.products.findUnique({ where: { product_id } }),
    ]);

    if (!checkPurchaseOrder)
      return res
        .status(404)
        .json({ success: false, message: "Purchase order not found" });
    if (!checkProduct)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    const total_price = checkProduct.sell_price * quantity;
    const newPurchaseOrderDetail = await prisma.purchase_order_details.create({
      data: {
        purchase_order_id,
        product_id,
        quantity,
        total_price,
      },
    });
    return res
      .status(201)
      .json({ success: true, data: newPurchaseOrderDetail });
  } catch (error) {
    if (error.isJoi) {
      return res.status(400).json({
        success: false,
        message: error.details.map((detail) => detail.message),
      });
    }

    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
      error: error.toString(),
    });
  }
};

export const deletePurchaseOrderDetail = async (req, res) => {
  const purchase_order_id = req.params.id;
  const product_id = req.params.id2;

  try {
    const checkPurchaseOrderDetail =
      await prisma.purchase_order_details.findMany({
        where: { purchase_order_id, product_id },
      });
    if (checkPurchaseOrderDetail) {
      await prisma.purchase_order_details.deleteMany({
        where: { purchase_order_id, product_id },
      });
      return res.status(200).json({
        success: true,
        message: "Delete purchase order detail successfully",
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "No purchase order detail was found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Internal Server Error",
      error: error.toString(),
    });
  }
};

export const updatePurchaseOrderDetail = async (req, res) => {
  const purchase_order_id = req.params.id;
  const product_id = req.params.id2;
  const { quantity } = req.body;

  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No data provided" });
    }

    const oldPurchaseOrderDetail = await prisma.purchase_order_details.findMany(
      {
        where: { purchase_order_id, product_id },
      },
    );
    if (!oldPurchaseOrderDetail) {
      return res
        .status(404)
        .json({ success: false, message: "Purchase order detail not found" });
    }

    const [checkPurchaseOrder, checkProduct] = await Promise.all([
      prisma.purchase_orders.findUnique({ where: { purchase_order_id } }),
      prisma.products.findUnique({ where: { product_id } }),
    ]);

    if (!checkPurchaseOrder)
      return res
        .status(404)
        .json({ success: false, message: "Purchase order not found" });
    if (!checkProduct)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });

    const total_price = checkProduct.sell_price * quantity;

    const updatePurchaseOrderDetail =
      await prisma.purchase_order_details.updateMany({
        where: { purchase_order_id, product_id },
        data: {
          quantity: quantity ?? oldPurchaseOrderDetail.quantity,
          total_price,
        },
      });

    return res
      .status(200)
      .json({ success: true, data: updatePurchaseOrderDetail });
  } catch (error) {
    if (error.isJoi) {
      return res.status(400).json({
        success: false,
        message: error.details.map((detail) => detail.message),
      });
    }

    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};
