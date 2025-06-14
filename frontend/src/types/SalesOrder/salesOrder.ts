import type { Product } from "../Product/product";

export type SalesOrderInput = {
  sales_order_id: string;
};

export type SalesOrderData = {
  client_id: string;
};

export type SalesOrderDetailData = {
  sales_order_id: string;
  product_id: string;
  quantity: number;
  total_price: number;
  product?: Product;
  created_at?: Date;
};

export type Client = {
  username: string;
  phone_number: string;
};

export type SalesOrderRes = {
  sales_order_id: string;
  client_id: string;
  created_at: string;
  client: Client;
  product: Product;
  sales_order_details: SalesOrderDetailData[];
};
