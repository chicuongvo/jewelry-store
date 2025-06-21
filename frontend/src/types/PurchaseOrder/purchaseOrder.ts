export type Supplier = {
  supplier_id: string;
  name: string;
  address: string;
  phone_number: string;
};

export type PurchaseOrder = {
  purchase_order_id: string;
  created_at: string;
  supplier_id: string;
  supplier: Supplier;
  purchase_order_details: PurchaseOrderDetail[];
};

export type PurchaseOrderCreateData = {
  supplier_id: string;
  purchase_order_details: PurchaseOrderDetailCreateData[];
};

export type PurchaseOrderUpdateData = {
  supplier_id?: string;
  purchase_order_details?: PurchaseOrderDetailUpdateData[];
};

export type Product = {
  name: string;
  product_id: string;
};

export type PurchaseOrderDetail = {
  purchase_order_id: string;
  product_id: string;
  quantity: number;
  product: Product;
  total_price: number;
};

export type PurchaseOrderDetailCreateData = {
  purchase_order_id: string;
  product_id: string;
  quantity: number;
};

export type PurchaseOrderDetailUpdateData = {
  purchase_order_id: string;
  product_id: string;
  quantity: number;
};

export type PurchaseOrderResponse = {
  data: PurchaseOrder[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export type PurchaseOrderDetailsResposne = {
  data: PurchaseOrderDetail[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};
