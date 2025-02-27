import {
  createProductValidator,
  updateProductValidator,
} from "../validation/productValidation.js";
import { prisma } from "../config/db.js";

export const getProducts = async (req, res) => {
  try {
    const products = await prisma.products.findMany();

    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log("Error get all products:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

export const getProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await prisma.products.findUnique({
      where: { id },
    });
    if (product) {
      res.status(200).json({ success: true, data: product });
    } else {
      res.status(404).json({ success: false, message: "No product was found" });
    }
  } catch (error) {
    console.log("Error get details product", error);
    console.log(id);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

export const createProduct = async (req, res) => {
  const data = req.body;

  try {
    await createProductValidator.validateAsync(req.body);

    const newProduct = await prisma.products.create({
      data: data,
    });

    return res.status(200).json({
      success: true,
      message: newProduct,
    });
  } catch (error) {
    if (error.isJoi) {
      return res.status(400).json({
        success: false,
        message: error.details.map((err) => err.message),
      });
    }
    console.log("Error creating product:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const checkProduct = await prisma.products.findUnique({
      where: { id },
    });

    if (checkProduct) {
      await prisma.products.delete({ where: { id } });
      return res
        .status(200)
        .json({ success: true, message: "Delete product successfully" });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "No product was found" });
    }
  } catch (error) {
    console.log("Error delete product", error);
    return res
      .status(400)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    await updateProductValidator.validateAsync(req.body);

    const updatedProduct = await prisma.products.update({
      where: { id },
      data: data,
    });

    console.log("update:", updatedProduct);

    if (updatedProduct) {
      return res.status(200).json({ success: true, data: updatedProduct });
    } else {
      return res
        .status(404)
        .json({ success: false, error: "No product was found" });
    }
  } catch (error) {
    if (error.isJoi) {
      return res.status(400).json({
        success: false,
        message: error.details.map((err) => err.message),
      });
    }
    console.log("Error update product:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};
