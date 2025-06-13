/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import ProductCard from "../../../../components/Client/ProductCard";
import type { Product } from "@/types/Product/product";
import { getAllProducts } from "@/api/product.api";
import { useEffect, useState } from "react";
import { Pagination } from "antd";

interface Props {
  searchCategories: string[];
  searchPrice: string[];
  sortBy: string;
  sortOrder: "asc" | "desc";
  updateData: any;
}

export default function ProductList({
  searchCategories,
  searchPrice,
  sortBy,
  sortOrder,
  updateData,
}: Props) {
  const [page, setPage] = useState(1);

  const {
    data: products,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [
      "products",
      page,
      searchCategories,
      searchPrice,
      sortBy,
      sortOrder,
    ],
    queryFn: () =>
      getAllProducts({
        page: page.toString(),
        limit: "6",
        category: searchCategories.join(","),
        minPrice: searchPrice[0],
        maxPrice: searchPrice[1],
        sortBy: "sell_price",
        sortOrder,
      }),
  });

  const { data: totaProducts, refetch: refetchTotal } = useQuery({
    queryKey: ["totaProducts"],
    queryFn: () => getAllProducts(),
  });

  const renderProducts = (products: Product[]) => {
    return products.map((product) => (
      <ProductCard key={product.product_id} product={product} />
    ));
  };

  useEffect(() => {
    refetch();
    refetchTotal();
  }, [updateData, refetch, refetchTotal]);

  return (
    <div>
      {isLoading ? (
        <div>Đang tải sản phẩm...</div>
      ) : (
        <div className="px-2 lg:px-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-10">
          {renderProducts(products ?? [])}
          <Pagination
            align="center"
            current={page}
            total={totaProducts?.length || 0}
            pageSize={6}
            onChange={(current: any) => {
              setPage(current);
            }}
          />
        </div>
      )}
    </div>
  );
}
