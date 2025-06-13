export type SalesOrderInput = {
  sales_order_id: string;
}

export type SalesOrderData = {
  client_id: string;
}

export type SalesOrderDetailData = {
  product_id: string;
  quantity: number;
  total_price: number;
}

export type SalesOrderRes = {
  sales_order_id: string;
  client_id: string;
  sales_order_details: SalesOrderDetailData[];
}
