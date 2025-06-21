import { axiosClient } from "../lib/axios";
import {
  type ServiceOrderCreate,
  type ServiceOrderUpdate,
  type ServiceOrderResponse,
} from "../types/ServiceOrder/ServiceOrder";
export const getAllServiceOrders = async (): Promise<
  ServiceOrderResponse[]
> => {
  const response = await axiosClient.get("/service-orders");
  return response.data.data;
};

export const getServiceOrderById = async (
  id: string
): Promise<ServiceOrderResponse[]> => {
  const response = await axiosClient.get(`/service-orders/${id}`);
  return response.data.data;
};
export const createServiceOrder = async (serviceOrder: ServiceOrderCreate) => {
  console.log(serviceOrder);
  const response = await axiosClient.post("/service-orders", serviceOrder);
  return response.data.data;
};

export const updateServiceOrder = async (
  id: string,
  serviceOrder: ServiceOrderUpdate
) => {
  const response = await axiosClient.put(`/service-orders/${id}`, serviceOrder);
  return response.data.data;
};
export const deleteServiceOrder = async (id: string) => {
  const response = await axiosClient.delete(`/service-orders/${id}`);
  return response.data.data;
};
