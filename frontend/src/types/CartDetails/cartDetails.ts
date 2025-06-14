import type { Product } from "@/types/Product/product";

export interface cartDetails {
  cart_id?: string;
  product_id?: string;
  quantity?: BigInteger;
  total_price?: number;
  product?: Product;
}
