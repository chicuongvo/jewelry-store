import { axiosClient } from "../lib/axios";
import type {
  PurchaseOrderDetail,
  PurchaseOrderDetailCreateData,
  PurchaseOrderDetailUpdateData,
} from "../types/PurchaseOrder/purchaseOrder";

export const getAllPurchaseOrderDetails = async (): Promise<
  PurchaseOrderDetail[]
> => {
  const res = await axiosClient.get("/purchase-order-details");
  return res?.data.data;
};

export const getPurchaseOrderDetail = async (
  id: string,
  id2: string
): Promise<PurchaseOrderDetail> => {
  const res = await axiosClient.get(`/purchase-order-details/${id}/${id2}`);
  return res?.data.data;
};

export const createPurchaseOrderDetail = async (
  id: string,
  id2: string,
  data: PurchaseOrderDetailCreateData
): Promise<PurchaseOrderDetail> => {
  const res = await axiosClient.post(
    `/purchase-order-details/${id}/${id2}`,
    data
  );
  return res?.data.data;
};

export const updatePurchaseOrderDetail = async (
  id: string,
  id2: string,
  data: PurchaseOrderDetailUpdateData
): Promise<PurchaseOrderDetail> => {
  const res = await axiosClient.put(
    `/purchase-order-details/${id}/${id2}`,
    data
  );
  return res?.data.data;
};

export const deletePurchaseOrderDetail = async (
  id: string,
  id2: string
): Promise<PurchaseOrderDetail> => {
  const res = await axiosClient.delete(`/purchase-order-details/${id}/${id2}`);
  return res?.data.data;
};
