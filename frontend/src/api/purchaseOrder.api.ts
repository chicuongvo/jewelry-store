import { axiosClient } from "../lib/axios";
import type {
  PurchaseOrder,
  PurchaseOrderCreateData,
  PurchaseOrderUpdateData,
} from "../types/PurchaseOrder/purchaseOrder";

export const getAllPurchaseOrders = async (): Promise<PurchaseOrder[]> => {
  const res = await axiosClient.get("/purchase-orders");
  return res?.data.data;
};

export const getPurchaseOrder = async (
  orderId: string
): Promise<PurchaseOrder> => {
  const res = await axiosClient.get(`/purchase-orders/${orderId}`);
  return res?.data.data;
};

export const createPurchaseOrder = async (
  data: PurchaseOrderCreateData
): Promise<PurchaseOrder> => {
  const res = await axiosClient.post("/purchase-orders", data);
  return res?.data.data;
};

export const updatePurchaseOrder = async (
  orderId: string,
  data: PurchaseOrderUpdateData
): Promise<PurchaseOrder> => {
  const res = await axiosClient.put(`/purchase-orders/${orderId}`, data);
  return res?.data.data;
};

export const deletePurchaseOrder = async (
  orderId: string
): Promise<PurchaseOrder> => {
  const res = await axiosClient.delete(`/purchase-orders/${orderId}`);
  return res?.data.data;
};
