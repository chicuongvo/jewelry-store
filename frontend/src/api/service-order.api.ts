import { axiosClient } from "../lib/axios";
import { type ServiceOrder } from "../types/ServiceOrder/ServiceOrder";
export const getAllServiceOrders = () => {
  return axiosClient.get("/service-orders");
};

export const getServiceOrderById = (id: string) => {
  return axiosClient.get(`/service-orders/${id}`);
};
export const createServiceOrder = (serviceOrder: ServiceOrder) => {
  return axiosClient.post("/service-orders", serviceOrder);
};

export const updateServiceOrder = (id: string, serviceOrder: ServiceOrder) => {
  return axiosClient.put(`/service-orders/${id}`, serviceOrder);
};
export const deleteServiceOrder = (id: string) => {
  return axiosClient.delete(`/service-orders/${id}`);
};
