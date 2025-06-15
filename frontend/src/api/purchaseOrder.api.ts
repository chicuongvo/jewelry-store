import { axiosClient } from "../lib/axios";
import type {
  PurchaseOrder,
  PurchaseOrderCreateData,
  PurchaseOrderDetailsResposne,
  PurchaseOrderResponse,
  PurchaseOrderUpdateData,
} from "../types/PurchaseOrder/purchaseOrder";

export interface GetPurchaseOrdersParams {
  page?: number;
  limit?: number;
}

export const getAllPurchaseOrders = async (
  params: GetPurchaseOrdersParams = {}
): Promise<PurchaseOrderResponse> => {
  const res = await axiosClient.get("/purchase-orders", { params });
  return res?.data;
};

export const getPurchaseOrderDetail = async ({
  purchase_order_id,
  page,
  limit,
}: {
  purchase_order_id: string;
  page?: number;
  limit?: number;
}): Promise<PurchaseOrderDetailsResposne> => {
  const res = await axiosClient.get(
    `/purchase-order-details/${purchase_order_id}`,
    {
      params: { page, limit },
    }
  );

  return res.data;
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
