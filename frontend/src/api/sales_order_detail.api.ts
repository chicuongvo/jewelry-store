import { axiosClient } from "../lib/axios";

export interface SalesOrderDetailInput {
  product_id: string;
  sales_order_id: string;
}

export interface SalesOrderDetailData {
  product_id: string;
  sales_order_id: string;
  quantity: number;
  total_price: number;
}

export interface SalesOrderRes {
  sales_order_id: string;
  product_id: string;
  quantity: number;
  total_price: number;
}

export const getSalesOrderDetail = async (
  SalesOrderDetailInput: SalesOrderDetailInput,
): Promise<SalesOrderRes> => {
  const response = await axiosClient.get(
    `/sales-order-detail/${SalesOrderDetailInput.sales_order_id}/${SalesOrderDetailInput.product_id}`,
  );
  return response.data;
};

export const createSalesOrderDetail = async (
  SalesOrderDetailData: SalesOrderDetailData,
) => {
  const response = await axiosClient.post(
    "/sales-order-detail",
    SalesOrderDetailData,
  );
  return response.data;
};

export const updateSalesOrderDetail = async (
  SalesOrderDetailInput: SalesOrderDetailInput,
  SalesOrderDetailData: SalesOrderDetailData,
) => {
  const response = await axiosClient.put(
    `/sales-order-detail/${SalesOrderDetailInput.sales_order_id}/${SalesOrderDetailInput.product_id}`,
    SalesOrderDetailData,
  );
  return response.data;
};

export const deleteSalesOrderDetail = async (
  SalesOrderDetailInput: SalesOrderDetailInput,
) => {
  const response = await axiosClient.delete(
    `/sales-order-detail/${SalesOrderDetailInput.sales_order_id}/${SalesOrderDetailInput.product_id}`,
  );
  return response.data;
};
