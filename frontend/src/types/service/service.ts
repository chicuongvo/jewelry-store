import type { UserProfile } from "../User/User";

export type ServiceCreate = {
  name: string;
  base_price: number;
};

export type ServiceOrderDetail = {
  service_order_id: string;
  service_id: string;
  quantity: number;
  extra_price: number;
  calculated_price: number;
  total_price: number;
  paid: number;
  remaining: number;
  status: string;
  is_deleted: boolean;
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
};

export type ServiceResponse = {
  service_id: string;
  name: string;
  base_price: number;
  is_deleted: boolean;
  service_order_details: ServiceOrderDetail[];
};

export type ServiceUpdate = {
  name?: string;
  base_price?: number;
  is_deleted?: boolean;
};
