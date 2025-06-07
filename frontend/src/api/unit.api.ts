import { axiosClient } from "../lib/axios";

export const getAllUnits = async () => {
  return axiosClient.get("/units");
};

export const getUnit = async (unit_id: string) => {
  return axiosClient.get(`/units/${unit_id}`);
};

export const createUnit = async (unit_name: string) => {
  return axiosClient.post("/units", unit_name);
};

export const updateUnit = async (unit_id: string, new_name: string) => {
  return axiosClient.put(`/units/${unit_id}`, new_name);
};

export const deleteUnit = async (id: string) => {
  return axiosClient.delete(`/units/${id}`);
};
