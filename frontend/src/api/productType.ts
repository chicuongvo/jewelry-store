import { axiosClient } from "../lib/axios";
import type {
  ProductType,
  ProductTypeCreateData,
  ProductTypeUpdateData,
} from "../types/productType";

export const getAllProductTypes = async (): Promise<ProductType[]> => {
  const res = await axiosClient.get("/product-types");
  return res?.data.data;
};

export const getProductTypeById = async (
  id: string
): Promise<ProductType[]> => {
  const res = await axiosClient.get(`/product-types/${id}`);
  return res?.data.data;
};

export const createProductType = async (data: ProductTypeCreateData) => {
  const res = await axiosClient.post(`/product-types`, data);
  return res?.data.data;
};

export const updateProductType = async (
  id: string,
  data: ProductTypeUpdateData
) => {
  const res = await axiosClient.put(`/product-types/${id}`, data);
  return res?.data.data;
};

export const deleteProductType = async (id: string) => {
  const res = await axiosClient.delete(`/product-types/${id}`);
  return res?.data.data;
};
