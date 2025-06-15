/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosClient, axiosClientFormData } from "../lib/axios";

import type {
  Product,
  ProductCreateData,
  ProductResponse,
} from "../types/Product/product";

export interface GetProductParams {
  name?: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  supplier?: string;
  sortBy?: string;
  sortOrder?: string;
  page?: string;
  limit?: string;
}

export const getAllProducts = async (
  params: GetProductParams = {}
): Promise<ProductResponse> => {
  const res = await axiosClient.get("/products", { params: params });
  return res?.data;
};

export const getAllProductQueries = async (
  query?: string
): Promise<Product[]> => {
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
