import type { ServiceResponse } from "../service/service";
import type { UserProfile } from "../User/User";
export type ServiceOrderCreate = {
  client_id: string;
  total_price: number;
  total_paid: number;
  total_remaining: number;
  status: string;
};

export type ServiceOrderUpdate = {
  client_id?: string;
  total_price?: number;
  total_paid?: number;
  total_remaining?: number;
  status?: string;
};

export type ServiceOrderDetail = {
  service_order_id: string;
  service_id: string;
  quantity: number;
  extra_cost: number;
  calculated_price: number;
  total_price: number;
  paid: number;
  remaining: number;
  status: string;
  service: ServiceResponse;
};

export type ServiceOrderResponse = {
  service_order_id: string;
  client_id: string;
  total_price: number;
  total_paid: number;
  total_remaining: number;
  status: string;
  created_at: string;
  client: UserProfile;
  service_order_details: ServiceOrderDetail[];
};
