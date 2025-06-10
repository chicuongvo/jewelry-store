import { axiosClient } from "../lib/axios";

export interface ServiceOrderDetailInput {
  service_order_id: string;
  service_id: string;
}

export interface ServiceOrderDetailData {
  service_order_id: string;
  service_id: string;
  quantity: number;
}

export interface ServiceOrderDetailDataUpdate {
  quantity: number;
}

export interface ServiceOrderDetailRes {
  service_order_id: string;
  service_id: string;
  extra_price: number;
  calculated_price: number;
  quantity: number;
  total_price: number;
  paid: number;
  remaining: number;
  status: string;
}

export const getServiceOrderDetail = async (
  ServiceOrderDetailInput: ServiceOrderDetailInput,
): Promise<ServiceOrderDetailRes> => {
  const response = await axiosClient.get(
    `/service-order-details/${ServiceOrderDetailInput.service_order_id}/${ServiceOrderDetailInput.service_id}`,
  );
  return response.data;
};

export const createServiceOrderDetail = async (
  ServiceOrderDetailData: ServiceOrderDetailData,
) => {
  const response = await axiosClient.post(
    "/service-order-detail",
    ServiceOrderDetailData,
  );
  return response.data;
};

export const updateSalesOrderDetail = async (
  ServiceOrderDetailInput: ServiceOrderDetailInput,
  ServiceOrderDetailDataUpdate: ServiceOrderDetailDataUpdate,
) => {
  const response = await axiosClient.put(
    `/service-order-detail/${ServiceOrderDetailInput.service_order_id}/${ServiceOrderDetailInput.service_id}`,
    ServiceOrderDetailDataUpdate,
  );
  return response.data;
};

export const deleteSalesOrderDetail = async (
  ServiceOrderDetailInput: ServiceOrderDetailInput,
) => {
  const response = await axiosClient.delete(
    `/service-order-detail/${ServiceOrderDetailInput.service_order_id}/${ServiceOrderDetailInput.service_id}`,
  );
  return response.data;
};
