import type { Product } from "./Product/product";

export type ProductType = {
  type_id: string;
  name: string;
  profit_rate: number;
  products: Product[];
};

export type ProductTypeCreateData = {
  name: string;
  profit_rate: number;
};

export type ProductTypeUpdateData = {
  name?: string;
  profit_rate?: number;
};
