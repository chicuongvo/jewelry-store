import type { cartDetails } from "../CartDetails/cartDetails";

export interface Cart {
  cart_id?: string;
  user_id?: string;
  total_quantity: number;
  total_price: number;
  cart_details: cartDetails[];
}

export interface AddToCart {
  quantity: number;
  cart_id: string;
}
