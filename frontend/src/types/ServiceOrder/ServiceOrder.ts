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

export type ServiceOrderResponse = {
  service_order_id: string;
  client_id: string;
  total_price: number;
  total_paid: number;
  total_remaining: number;
  status: string;
  created_at: string;
};
