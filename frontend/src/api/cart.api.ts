import type { Cart } from "@/types/Cart/cart";
import { axiosClient } from "../lib/axios";

export const getCartByUserId = async (): Promise<Cart> => {
  const res = await axiosClient.get(`/carts/`);
  return res?.data.data;
};

export const addToCart = async (
  product_id: string,
  quantity: number
): Promise<Cart> => {
  const res = await axiosClient.post(`/carts/add/${product_id}`, {
    quantity: quantity,
  });
  return res?.data.data;
};

export const removeFromCart = async (product_id: string): Promise<Cart> => {
  const res = await axiosClient.post(`/carts/remove/${product_id}`);
  return res?.data.data;
};

export const updateCart = async (
  product_id: string,
  quantity: number
): Promise<Cart> => {
  const res = await axiosClient.put(`/carts/update/${product_id}`, {
    quantity: quantity,
  });
  return res?.data.data;
};
