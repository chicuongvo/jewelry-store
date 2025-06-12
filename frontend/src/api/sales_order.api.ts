import { axiosClient } from "../lib/axios";
import type {
  SalesOrderInput,
  SalesOrderData,
  SalesOrderRes,
} from "../types/SalesOrder/salesOrder";

export const getAllSalesOrder = async (): Promise<SalesOrderRes[]> => {
  const response = await axiosClient.get("/sales-orders");
  return response?.data.data;
};

export const getSalesOrder = async (
  SalesOrderInput: SalesOrderInput
): Promise<SalesOrderRes> => {
  const response = await axiosClient.get(
    `/sales-orders/${SalesOrderInput.sales_order_id}`
  );
  return response?.data.data;
};

export const createSalesOrder = async (SalesOrderData: SalesOrderData) => {
  const response = await axiosClient.post("/sales-orders", SalesOrderData);
  return response?.data.data;
};

export const deleteSalesOrder = async (SalesOrderInput: SalesOrderInput) => {
  const response = await axiosClient.delete(
    `/sales-orders/${SalesOrderInput.sales_order_id}`
  );
  return response?.data.data;
};
