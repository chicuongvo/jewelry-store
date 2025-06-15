import { axiosClient } from "../lib/axios";
import type { ServiceResponse } from "../types/service/service";
import type { UserProfile } from "../types/User/User";

export interface ServiceOrderDetailInput {
  service_order_id: string;
  service_id: string;
}

export interface ServiceOrderDetailData {
  service_order_id: string;
  service_id: string;
  quantity: number;
  extra_cost: number;
  calculated_price: number;
  total_price: number;
  paid: number;
  remaining: number;
}

export interface ServiceOrderDetailDataUpdate {
  paid: number;
  status?: string;
  extra_cost?: number;
}

export interface ServiceOrderDetailRes {
  service_order_id: string;
  service_id: string;
  extra_cost: number;
  calculated_price: number;
  quantity: number;
  total_price: number;
  paid: number;
  remaining: number;
  status: string;
  service: ServiceResponse;
  service_order: {
    service_order_id: string;
    client_id: string;
    total_price: number;
    total_paid: number;
    total_remaining: number;
    status: string;
    created_at: string;
    client: UserProfile;
  };
}

export const getServiceOrderDetail = async (
  ServiceOrderDetailInput: ServiceOrderDetailInput
): Promise<ServiceOrderDetailRes> => {
  const response = await axiosClient.get(
    `/service-order-details/${ServiceOrderDetailInput.service_order_id}/${ServiceOrderDetailInput.service_id}`
  );
  return response.data.data;
};

export const createServiceOrderDetail = async (
  ServiceOrderDetailData: ServiceOrderDetailData
) => {
  const response = await axiosClient.post(
    "/service-order-details",
    ServiceOrderDetailData
  );
  return response.data.data;
};

export const updateServiceOrderDetail = async (
  ServiceOrderDetailInput: ServiceOrderDetailInput,
  ServiceOrderDetailDataUpdate: ServiceOrderDetailDataUpdate
) => {
  const response = await axiosClient.put(
    `/service-order-details/${ServiceOrderDetailInput.service_order_id}/${ServiceOrderDetailInput.service_id}`,
    ServiceOrderDetailDataUpdate
  );
  return response.data.data;
};

export const deleteServiceOrderDetail = async (
  ServiceOrderDetailInput: ServiceOrderDetailInput
) => {
  const response = await axiosClient.delete(
    `/service-order-details/${ServiceOrderDetailInput.service_order_id}/${ServiceOrderDetailInput.service_id}`
  );
  return response.data.data;
};

export const getAllServiceOrderDetail = async (
  service_order_id: string
): Promise<ServiceOrderDetailRes[]> => {
  const response = await axiosClient.get(
    `/service-order-details/${service_order_id}`
  );
  return response.data.data;
};
