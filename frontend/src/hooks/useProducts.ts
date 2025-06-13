import { getAllProducts } from "../api/product.api";
import { getAllSuppliers } from "@/api/supplier.api";
import { getAllProductTypes } from "@/api/productType";
import {
  deleteProduct,
  updateProduct,
  createProduct,
} from "../api/product.api";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
export default function useProducts() {
  const queryClient = useQueryClient();
  const getAllProductQuery = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });
  const getAllSuppliersQuery = useQuery({
    queryKey: ["suppliers"],
    queryFn: getAllSuppliers,
  });
  const getAllProductTypesQuery = useQuery({
    queryKey: ["productTypes"],
    queryFn: getAllProductTypes,
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
    deleteProductMutation,
    updateProductMutation,
    createProductMutation,
  };
}
