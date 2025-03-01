import {
  createProductValidator,
  updateProductValidator,
} from "../validation/productValidation.js";
import { prisma } from "../config/db.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await prisma.products.findMany();

    return res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log("Error get all products:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

export const getProduct = async (req, res) => {
  const { product_id } = req.params;

  try {
    const product = await prisma.products.findUnique({
      where: { product_id },
    });

    if (product) {
      return res.status(200).json({ success: true, data: product });
    }

    return res
      .status(404)
      .json({ success: false, message: "No product was found" });
  } catch (error) {
    console.log("Error get details product", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

export const createProduct = async (req, res) => {
  const { name, image, description, buy_price, type, unit, supplier_id } =
    req.body;

  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No data provided" });
    }

    await createProductValidator.validateAsync(req.body);

    const [checkType, checkUnit, checkSupplier] = await Promise.all([
      prisma.product_types.findUnique({ where: { name: type } }),
      prisma.units.findUnique({ where: { name: unit } }),
      prisma.suppliers.findUnique({ where: { supplier_id } }),
    ]);

    if (!checkType)
      return res
        .status(404)
        .json({ success: false, message: "Product type was not valid" });
    if (!checkUnit)
      return res
        .status(404)
        .json({ success: false, message: "Unit was not valid" });
    if (!checkSupplier)
      return res
        .status(404)
        .json({ success: false, message: "Supplier was not valid" });

    const sell_price = (1 + checkType.profit_rate) * buy_price;

    const newProduct = await prisma.products.create({
      data: {
        name,
        image,
        description,
        buy_price,
        type,
        unit,
        sell_price,
        supplier_id,
      },
    });

    return res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("Error creating product:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

export const deleteProduct = async (req, res) => {
  const { product_id } = req.params;
  try {
    const checkProduct = await prisma.products.findUnique({
      where: { product_id },
    });

    if (checkProduct) {
      await prisma.products.delete({ where: { product_id } });
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
  const { product_id } = req.params;
  const { name, image, description, buy_price, type, unit, supplier_id } =
    req.body;

  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No data provided" });
    }

    await updateProductValidator.validateAsync(req.body);

    const oldProduct = await prisma.products.findUnique({
      where: { product_id },
    });
    if (!oldProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    const [checkType, checkUnit, checkSupplier] = await Promise.all([
      type ? prisma.product_types.findUnique({ where: { name: type } }) : null,
      unit ? prisma.units.findUnique({ where: { name: unit } }) : null,
      supplier_id
        ? prisma.suppliers.findUnique({ where: { supplier_id } })
        : null,
    ]);

    if (type && !checkType)
      return res
        .status(404)
        .json({ success: false, message: "Product type was not valid" });
    if (unit && !checkUnit)
      return res
        .status(404)
        .json({ success: false, message: "Unit was not valid" });
    if (supplier_id && !checkSupplier)
      return res
        .status(404)
        .json({ success: false, message: "Supplier was not valid" });

    const profit_rate = checkType?.profit_rate ?? oldProduct.profit_rate;
    const new_buy_price = buy_price ?? oldProduct.buy_price;
    const sell_price = (1 + profit_rate) * new_buy_price;

    const updatedProduct = await prisma.products.update({
      where: { product_id },
      data: {
        name: name ?? oldProduct.name,
        image: image ?? oldProduct.image,
        description: description ?? oldProduct.description,
        buy_price: new_buy_price,
        type: type ?? oldProduct.type,
        unit: unit ?? oldProduct.unit,
        sell_price,
        supplier_id: supplier_id ?? oldProduct.supplier_id,
      },
    });

    return res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    console.error("Error updating product:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};
