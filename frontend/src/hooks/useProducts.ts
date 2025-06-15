/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllProductQueries } from "../api/product.api";
import { getAllSuppliers } from "@/api/supplier.api";
import { getAllProductTypes } from "@/api/productType";
import {
  deleteProduct,
  updateProduct,
  createProduct,
} from "../api/product.api";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import type { Product } from "@/types/Product/product";
export default function useProducts(query?: string) {
  const queryClient = useQueryClient();
  const getAllProductQuery = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: () => {
      return getAllProductQueries("");
    },
  });
  const getFilteredProductsQuery = useQuery<
    Product[],
    Error,
    Product[],
    [string, string?]
  >({
    queryKey: ["products", query],
    queryFn: ({ queryKey }) => {
      const [, query] = queryKey;
      return getAllProductQueries(query);
    },
  });

  const getAllSuppliersQuery = useQuery({
    queryKey: ["suppliers"],
    queryFn: () => getAllSuppliers(), // không truyền gì, sẽ lấy page 1, limit 6
  });

  const getAllProductTypesQuery = useQuery({
    queryKey: ["productTypes"],
    queryFn: () => {
      return getAllProductTypes();
    },
  });
  const deleteProductMutation = useMutation({
    mutationFn: (id: string) => {
      return deleteProduct(id);
    },
  });
  const updateProductMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => {
      return updateProduct(id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
  const createProductMutation = useMutation({
    mutationFn: (data: any) => {
      return createProduct(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
  return {
    getAllProductQuery,
    getAllSuppliersQuery,
    getAllProductTypesQuery,
    getFilteredProductsQuery,
    deleteProductMutation,
    updateProductMutation,
    createProductMutation,
  };
}
