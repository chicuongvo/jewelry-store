import { prisma } from "../config/db.js";

export const createCart = async (req, res) => {
  const user_id = req.params.userId;
  const { product_id, quantity, total_price } = req.body;
  try {
    let existedCart = await prisma.carts.findUnique({
      where: {
        user_id,
      },
    });
    console.log("Existed cart:", existedCart);
    if (!existedCart) {
      console.log("Creating new cart for user:", user_id);
      existedCart = await prisma.carts.create({
        data: {
          user_id,
          total_price: 0,
          total_quantity: 0,
        },
      });
    }
    let existedCartdetail = await prisma.cart_details.findUnique({
      where: {
        cart_id_product_id: {
          cart_id: existedCart.cart_id,
          product_id,
        },
      },
    });
    if (!existedCartdetail) {
      await prisma.cart_details.create({
        data: {
          cart_id: existedCart.cart_id,
          product_id,
          quantity: quantity || 1,
          total_price: total_price || 0,
        },
      });
      return res.status(200).json({ message: "Cart created successfully" });
    } else {
      throw new Error("Product already exists in the cart");
    }
  } catch (error) {
    console.error(error.toString());
    res.status(500).json({ error: "Failed to create cart" });
  }
};

export const getCartByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await prisma.carts.findUnique({
      where: { user_id: userId },
    });
    const cartDetails = await prisma.cart_details.findMany({
      where: { cart_id: cart.cart_id },
      include: {
        product: true,
      },
    });
    return res.status(200).json({
      data: cartDetails,
    });
  } catch (error) {
    console.log(error.toString());
    res.status(500).json({ error: "Failed to retrieve cart" });
  }
};

export const deleteCart = async (req, res) => {
  console.log("Deleting cart...");
  try {
    const { userId, productId } = req.params;

    const cart = await prisma.carts.findUnique({
      where: { user_id: userId },
    });

    await prisma.cart_details.deleteMany({
      where: { cart_id: cart.cart_id, product_id: productId },
    });
    return res.status(200).json({ message: "Cart deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete cart" });
  }
};

export const updateCart = async (req, res) => {
  try {
    const { cartId } = req.params;
    const { quantity, total_price } = req.body;
    await prisma.cart_details.updateMany({
      where: { cart_id: cartId },
      data: {
        quantity,
        total_price,
      },
    });
    res.status(200).json({ message: "Cart updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update cart" });
  }
};
