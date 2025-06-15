import type { InventoryReportDetail } from "../InventoryReport/inventoryReport";
import type { SupplierResponse } from "../supplier/supplier";
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
  inventory_report_details?: InventoryReportDetail[];
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

export type ProductResponse = {
  data: Product[];
  pagination: {
    total: number;
    page: number | null;
    limit: number | null;
    totalPages: number;
  };
};
