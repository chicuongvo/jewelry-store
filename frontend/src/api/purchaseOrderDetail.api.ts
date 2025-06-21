import { axiosClient } from "../lib/axios";
import type {
  PurchaseOrderDetail,
  PurchaseOrderDetailCreateData,
  PurchaseOrderDetailUpdateData,
} from "../types/PurchaseOrder/purchaseOrder";

export const getAllPurchaseOrderDetails = async (
  id: string
): Promise<PurchaseOrderDetail[]> => {
  const res = await axiosClient.get(`/purchase-order-details/${id}`);
  return res?.data.data;
};

export const getPurchaseOrderDetail = async (
  data: PurchaseOrderDetail
): Promise<PurchaseOrderDetail> => {
  const res = await axiosClient.get(
    `/purchase-order-details/${data.purchase_order_id}/${data.product_id}`
  );
  return res?.data.data;
};

export const createPurchaseOrderDetail = async (
  data: PurchaseOrderDetailCreateData
): Promise<PurchaseOrderDetail> => {
  const res = await axiosClient.post("/purchase-order-details/", data);
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
  data: PurchaseOrderDetail
): Promise<PurchaseOrderDetail> => {
  const res = await axiosClient.delete(
    `/purchase-order-details/${data.purchase_order_id}/${data.product_id}`
  );
  return res?.data.data;
};
