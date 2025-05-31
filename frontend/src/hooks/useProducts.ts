import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../api/product.api";

export default function useProducts() {
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });
  return { data, isLoading };
}
