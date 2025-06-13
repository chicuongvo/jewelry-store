import type { SupplierCreate, SupplierResponse } from "../supplier/supplier";
export type Product = {
  product_id: string;
  name: string;
  image: string;
  description: string;
  buy_price: number;
  sell_price: number;
  created_at: string;
  supplier_id: string;
  type: string;
  unit: string;
  supplier?: SupplierResponse;
};

export type ProductCreateData = {
  name: string;
  image: File;
  description: string;
  buy_price: number;
  supplier_id: string;
  type: string;
  unit: string;
};

export type ProductUpdateData = {
  name?: string;
  image?: string;
  description?: string;
  buy_price?: number;
  supplier_id?: string;
  type?: string;
  unit?: string;
};
