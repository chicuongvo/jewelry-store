import {
  type SupplierCreate,
  type SupplierResponse,
  type SupplierUpdate,
} from "../types/supplier/supplier";
import { axiosClient } from "../lib/axios";

export interface GetSupplierParams {
  page?: string;
  limit?: string;
}

export const getAllSuppliers = async (params: GetSupplierParams = {}) => {
  const res = await axiosClient.get("/suppliers", { params });
  return res?.data.data;
};

export const getSupplierById = async (
  id: string
): Promise<SupplierResponse> => {
  const response = await axiosClient.get(`/suppliers/${id}`);
  return response.data.data;
};
export const createSupplier = async (supplier: SupplierCreate) => {
  const response = await axiosClient.post("/suppliers", supplier);
  return response.data.data;
};
export const updateSupplier = async (id: string, supplier: SupplierUpdate) => {
  const response = await axiosClient.put(`/suppliers/${id}`, supplier);
  return response.data.data;
};
export const deleteSupplier = async (id: string) => {
  const response = await axiosClient.delete(`/suppliers/${id}`);
  return response.data.data;
};
