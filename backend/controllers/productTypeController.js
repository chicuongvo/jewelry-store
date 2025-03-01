import { prisma } from "../config/db.js";
import {
  createProductTypeValidator,
  updateProductTypeValidator,
} from "../validation/productTypeValidation.js";

export const getAllTypes = async (req, res) => {
  try {
    const types = await prisma.product_types.findMany();

    return res.status(200).json({ success: true, data: types });
  } catch (error) {
    console.log("Error get all types", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

export const getType = async (req, res) => {
  const { type_id } = req.params;

  try {
    const type = await prisma.product_types.findUnique({ where: { type_id } });

    if (!type) {
      return res
        .status(404)
        .json({ success: false, message: "Product type not found" });
    }

    return res.status(200).json({ success: true, data: type });
  } catch (error) {
    console.log("Error get type: ", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

export const createType = async (req, res) => {
  const data = req.body;
  try {
    await createProductTypeValidator.validateAsync(data);

    const newType = await prisma.product_types.create({ data });

    return res.status(200).json({ success: true, data: newType });
  } catch (error) {
    if (error.isJoi) {
      return res.status(400).json({
        success: false,
        message: error.details.map((err) => err.message),
      });
    }

    console.log("Error creating product type:", error);

    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

export const deleteType = async (req, res) => {
  const { type_id } = req.params;

  try {
    const checkType = await prisma.product_types.findUnique({
      where: { type_id },
    });

    if (!checkType) {
      return res
        .status(404)
        .json({ success: false, messages: "Product type not found" });
    }

    await prisma.product_types.delete({ where: { type_id } });

    return res
      .status(200)
      .json({ success: true, messages: "Delete product type successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, messages: "Internal Server Error" });
  }
};

export const updateType = async (req, res) => {
  const { type_id } = req.params;
  const data = req.body;

  try {
    if (!data || Object.keys(data).length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No updated data provided" });
    }

    await updateProductTypeValidator.validateAsync(data);

    const checkType = await prisma.product_types.findUnique({
      where: { type_id },
    });

    if (!checkType) {
      return res
        .status(404)
        .json({ success: false, message: "Product type not found" });
    }

    // Cập nhật bản ghi
    const updatedType = await prisma.product_types.update({
      where: { type_id },
      data: data,
    });

    return res.status(200).json({ success: true, data: updatedType });
  } catch (error) {
    if (error.details) {
      return res.status(400).json({
        success: false,
        message: error.details.map((err) => err.message),
      });
    }

    console.error("Error updating product type:", error);

    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};
