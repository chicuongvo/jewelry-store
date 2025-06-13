import { axiosClient, axiosClientFormData } from "../lib/axios";

import type {
  Product,
  ProductCreateData,
  ProductUpdateData,
} from "../types/Product/product";

export const getAllProducts = async (query?: string): Promise<Product[]> => {
  const res = await axiosClient.get(`/products?${query ?? ""}`);
  return res?.data.data;
};

export const getProduct = async (id: string): Promise<Product> => {
  const res = await axiosClient.get(`/products/${id}`);
  return res?.data.data;
};

export const createProduct = async (
  data: ProductCreateData
): Promise<Product> => {
  const res = await axiosClientFormData.post("/products", data);
  return res?.data.data;
};

export const updateProduct = async (
  id: string,
  data: any
): Promise<Product> => {
  const res = await axiosClientFormData.put(`/products/${id}`, data);
  return res?.data.data;
};

export const deleteProduct = async (id: string): Promise<Product> => {
  const res = await axiosClient.delete(`/products/${id}`);
  return res?.data.data;
};
