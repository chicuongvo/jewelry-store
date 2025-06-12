import { axiosClient } from "../lib/axios";
import type {
  InventoryReport,
  InventoryReportDetail,
  InventoryReportCreateData,
  InventoryReportUpdateData,
  InventoryReportDetailUpdateData,
  InventoryReportDetailCreateData,
} from "../types/InventoryReport/inventoryReport";

export interface GetReportsParams {
  month?: number;
  year?: number;
  page?: number;
  limit?: number;
}

export const getAllInventoryReports = async (
  params: GetReportsParams = {}
): Promise<InventoryReport[]> => {
  const res = await axiosClient.get("/inventory-reports", {
    params,
  });
  console.log(res.data.data, " ", res.data.data.length);
  return res?.data.data;
};

export const getInventoryReportById = async (
  id: string
): Promise<InventoryReport> => {
  const res = await axiosClient.get(`/inventory-reports/${id}`);
  return res?.data.data;
};

export const getInventoryReportByMonthAndYear = async (
  month: number,
  year: number
): Promise<InventoryReport> => {
  const res = await axiosClient.get(
    `/inventory-reports/month/${month}/year/${year}`
  );
  return res?.data.data;
};

export const createInventoryReport = async (
  data: InventoryReportCreateData
) => {
  const res = await axiosClient.post("/inventory-reports", data);
  return res?.data.data;
};

export const updateInventoryReport = async (
  id: string,
  data: InventoryReportUpdateData
) => {
  const res = await axiosClient.put(`/inventory-reports/${id}`, data);
  return res?.data.data;
};

export const deleteInventoryReport = async (id: string) => {
  const res = await axiosClient.delete(`/inventory-reports/${id}`);
  return res?.data.data;
};

export const getAllInventoryReportDetails = async (
  reportId: string,
  productId: string
): Promise<InventoryReportDetail[]> => {
  const res = await axiosClient.get(
    `/inventory-reports-details/${reportId}/${productId}`
  );
  return res?.data.data;
};

export const getInventoryReportDetailById = async (
  reportId: string,
  productId: string
): Promise<InventoryReportDetail> => {
  const res = await axiosClient.get(
    `/inventory-reports-details/${reportId}/${productId}`
  );
  return res?.data.data;
};

export const createInventoryReportDetail = async (
  reportId: string,
  productId: string,
  data: InventoryReportDetailCreateData
): Promise<InventoryReportDetail> => {
  const res = await axiosClient.post(
    `/inventory-reports-details/${reportId}/${productId}`,
    data
  );
  return res?.data.data;
};

export const updateInventoryReportDetail = async (
  reportId: string,
  productId: string,
  data: InventoryReportDetailUpdateData
) => {
  const res = await axiosClient.put(
    `/inventory-reports-details/${reportId}/${productId}`,
    data
  );
  return res?.data.data;
};

export const deleteInventoryReportDetail = async (
  reportId: string,
  productId: string
) => {
  const res = await axiosClient.delete(
    `/inventory-reports-details/${reportId}/${productId}`
  );
  return res?.data.data;
};
