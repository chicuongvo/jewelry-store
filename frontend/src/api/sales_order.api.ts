import { axiosClient } from "../lib/axios";
import type {
  SalesOrderInput,
  // SalesOrderData,
  SalesOrderResponse,
  SalesOrderDetailResponse,
  CreateSalesOrderData,
} from "../types/SalesOrder/salesOrder";

export interface GetSalesOrdersParams {
  page?: number;
  limit?: number;
}
export const getAllSalesOrders = async (
  params: GetSalesOrdersParams = {}
): Promise<SalesOrderResponse> => {
  const res = await axiosClient.get("/sales-orders", { params });
  return res?.data;
};
export const getSalesOrderDetail = async ({
  sales_order_id,
  page,
  limit,
}: {
  sales_order_id: string;
  page?: number;
  limit?: number;
}): Promise<SalesOrderDetailResponse> => {
  const res = await axiosClient.get(`/sales-order-details/${sales_order_id}`, {
    params: { page, limit },
  });

  return res.data;
};
export const createSalesOrder = async (
  SalesOrderData: CreateSalesOrderData
) => {
  const response = await axiosClient.post("/sales-orders", SalesOrderData);
  return response?.data.data;
};

export const deleteSalesOrder = async (SalesOrderInput: SalesOrderInput) => {
  const response = await axiosClient.delete(
    `/sales-orders/${SalesOrderInput.sales_order_id}`
  );
  return response?.data.data;
};
