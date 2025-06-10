import { axiosClient } from "../lib/axios";

export interface SalesOrderInput {
  sales_order_id: string;
}

export interface SalesOrderData {
  client_id: string;
}

export interface SalesOrderDetailData {
  product_id: string;
  quantity: number;
  total_price: number;
}

export interface SalesOrderRes {
  sales_order_id: string;
  client_id: string;
  sales_order_details: SalesOrderDetailData[];
}

export const getAllSalesOrder = async (): Promise<SalesOrderRes[]> => {
  const response = await axiosClient.get("/sales-order");
  return response.data;
};

export const getSalesOrder = async (
  SalesOrderInput: SalesOrderInput,
): Promise<SalesOrderRes> => {
  const response = await axiosClient.get(
    `/sales-order/${SalesOrderInput.sales_order_id}`,
  );
  return response.data;
};

export const createSalesOrder = async (SalesOrderData: SalesOrderData) => {
  const response = await axiosClient.post("/sales-order", SalesOrderData);
  return response.data;
};

export const deleteSalesOrder = async (SalesOrderInput: SalesOrderInput) => {
  const response = await axiosClient.delete(
    `/sales-order/${SalesOrderInput.sales_order_id}`,
  );
  return response.data;
};
