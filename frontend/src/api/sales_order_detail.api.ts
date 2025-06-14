import { axiosClient } from "../lib/axios";

import type { SalesOrderDetailData } from "../types/SalesOrder/salesOrder.ts";

export const getAllSalesOrderDetail = async (
  id: string,
): Promise<SalesOrderDetailData[]> => {
  const response = await axiosClient.get(`/sales-order-details/${id}`);
  return response.data.data;
};

export const getSalesOrderDetail = async (
  SalesOrderDetailInput: SalesOrderDetailData,
): Promise<SalesOrderDetailData> => {
  const response = await axiosClient.get(
    `/sales-order-details/${SalesOrderDetailInput.sales_order_id}/${SalesOrderDetailInput.product_id}`,
  );
  return response.data.data;
};

export const createSalesOrderDetail = async (
  SalesOrderDetailData: SalesOrderDetailData,
) => {
  const response = await axiosClient.post(
    "/sales-order-details",
    SalesOrderDetailData,
  );
  return response.data.data;
};

export const updateSalesOrderDetail = async (
  SalesOrderDetailData: SalesOrderDetailData,
) => {
  const response = await axiosClient.put(
    `/sales-order-details/${SalesOrderDetailData.sales_order_id}/${SalesOrderDetailData.product_id}`,
    SalesOrderDetailData,
  );
  return response.data.data;
};

export const deleteSalesOrderDetail = async (
  SalesOrderDetailInput: SalesOrderDetailData,
) => {
  const response = await axiosClient.delete(
    `/sales-order-details/${SalesOrderDetailInput.sales_order_id}/${SalesOrderDetailInput.product_id}`,
  );
  return response.data.data;
};
