import {
  type ServiceCreate,
  type ServiceUpdate,
  type ServiceResponse,
} from "../types/service/service";
import { axiosClient } from "../lib/axios";

export const getAllServices = async (): Promise<ServiceResponse[]> => {
  const response = await axiosClient.get("/services");
  return response.data.data;
};

export const getServiceById = async (id: string): Promise<ServiceResponse> => {
  const response = await axiosClient.get(`/services/${id}`);
  return response.data.data;
};

export const createService = async (service: ServiceCreate) => {
  const response = await axiosClient.post("/services", service);
  return response.data.data;
};
export const updateService = async (id: string, service: ServiceUpdate) => {
  const response = await axiosClient.put(`/services/${id}`, service);
  return response.data.data;
};
export const deleteService = async (id: string) => {
  const response = await axiosClient.delete(`/services/${id}`);
  console.log(response);
  return response.data.data;
};
