/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createProductType,
  deleteProductType,
  getAllProductTypes,
  updateProductType,
} from "@/api/productType";

export default function useProductTypes(queryString?: string) {
  const queryClient = useQueryClient();
  const getAllProductTypesQuery = useQuery({
    queryKey: ["productTypes"],
    queryFn: () => {
      return getAllProductTypes();
    },
  });
  const getFilteredProductTypesQuery = useQuery({
    queryKey: ["productTypes", queryString],
    queryFn: ({ queryKey }) => {
      const [] = queryKey;
      return getAllProductTypes(queryString);
    },
  });
  const deleteProductTypeMutation = useMutation({
    mutationFn: (id: string) => {
      return deleteProductType(id);
    },
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ["productTypes"] });
    },
  });
  const updateProductTypeMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => {
      return updateProductType(id, data);
    },
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ["productTypes"] });
    },
  });
  const createProductTypeMutation = useMutation({
    mutationFn: (data: any) => {
      return createProductType(data);
    },
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ["productTypes"] });
    },
  });
  return {
    getAllProductTypesQuery,
    getFilteredProductTypesQuery,
    deleteProductTypeMutation,
    updateProductTypeMutation,
    createProductTypeMutation,
  };
}
