import type { AddToCart, Cart } from "@/types/Cart/cart";
import { axiosClient } from "../lib/axios";

export const getCartByUserId = async (id: string): Promise<Cart> => {
  const res = await axiosClient.get(`/carts/${id}`);
  return res?.data.data;
};

export const addToCart = async (
  product_id: string,
  user_id: string,
  data: AddToCart
): Promise<Cart> => {
  const res = await axiosClient.post(
    `/carts/${user_id}/add/${product_id}`,
    data
  );
  return res?.data.data;
};

export const removeFromCart = async (
  cart_id: string,
  user_id: string,
  product_id: string
): Promise<Cart> => {
  const res = await axiosClient.post(
    `/carts/${user_id}/add/${product_id}`,
    cart_id
  );
  return res?.data.data;
};

export const updateCart = async (
  data: AddToCart,
  user_id: string,
  product_id: string
): Promise<Cart> => {
  const res = await axiosClient.post(
    `/carts/${user_id}/add/${product_id}`,
    data
  );
  return res?.data.data;
};
