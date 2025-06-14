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
  name: String;
};

export type PurchaseOrderDetail = {
  purchase_order_id: string;
  product_id: string;
  quantity: number;
  product: Product;
  total_price: number;
};

export type PurchaseOrderDetailCreateData = {
  product_id: string;
  quantity: number;
  total_price: number;
};

export type PurchaseOrderDetailUpdateData = {
  quantity?: number;
  total_price?: number;
};
