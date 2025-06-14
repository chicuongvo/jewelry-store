import type { Cart } from "@/types/Cart/cart";
import { axiosClient } from "../lib/axios";

export const getCartByUserId = async (user_id: string): Promise<Cart> => {
  const res = await axiosClient.get(`/carts/${user_id}`);
  return res?.data.data;
};

export const addToCart = async (
  product_id: string,
  user_id: string,
  quantity: number
): Promise<Cart> => {
  const res = await axiosClient.post(
    `/carts/${user_id}/add/${product_id}`,
    quantity
  );
  return res?.data.data;
};

export const removeFromCart = async (
  user_id: string,
  product_id: string
): Promise<Cart> => {
  const res = await axiosClient.post(`/carts/${user_id}/remove/${product_id}`);
  return res?.data.data;
};

export const updateCart = async (
  user_id: string,
  product_id: string,
  quantity: number
): Promise<Cart> => {
  const res = await axiosClient.post(
    `/carts/${user_id}/update/${product_id}`,
    quantity
  );
  return res?.data.data;
};
