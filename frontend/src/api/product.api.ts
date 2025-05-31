import { axiosClient } from "../lib/axios";

interface Product {
  product_id: string;
  name: string;
  //...
}

export const getAllProducts = () => {
  return axiosClient.get("/products");
};
