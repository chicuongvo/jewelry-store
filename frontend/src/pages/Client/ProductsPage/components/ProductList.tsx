/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import ProductCard from "@/components/Client/ProductCard";
import ProductCardSkeleton from "@/components/Client/SkeletonProductCard";
import type { Product } from "@/types/Product/product";
import { getAllProducts } from "@/api/product.api";
import { useEffect, useState } from "react";
import { ConfigProvider, Pagination } from "antd";

interface Props {
  searchCategories: string[];
  searchPrice: string[];
  sortBy: string;
  sortOrder: "asc" | "desc";
  updateData: any;
  setUpdateData: any;
}

export default function ProductList({
  searchCategories,
  searchPrice,
  sortBy,
  sortOrder,
  updateData,
  setUpdateData,
}: Props) {
  const [page, setPage] = useState(1);
  const pageSize = 6;

  const {
    data: products,
    isLoading,
    isFetching,
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
        limit: pageSize.toString(),
        category: searchCategories.join(","),
        minPrice: searchPrice[0],
        maxPrice: searchPrice[1],
        sortBy,
        sortOrder,
      }),
  });

  const { data: totalProducts, refetch: refetchTotal } = useQuery({
    queryKey: ["totalProducts", searchCategories, searchPrice],
    queryFn: () =>
      getAllProducts({
        category: searchCategories.join(","),
        minPrice: searchPrice[0],
        maxPrice: searchPrice[1],
        sortBy,
        sortOrder,
      }),
  });

  const renderProducts = (products: Product[]) => {
    return products.map((product) => (
      <ProductCard key={product.product_id} product={product} />
    ));
  };

  useEffect(() => {
    setPage(1);
    refetch();
    refetchTotal();
    setUpdateData(false);
  }, [updateData, refetch, refetchTotal, setUpdateData]);

  return (
    <div className="w-full">
      <div className="px-2 lg:px-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-10 min-h-[300px]">
        {isLoading || isFetching ? (
          Array.from({ length: pageSize }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))
        ) : products?.length === 0 ? (
          <div className="text-center col-span-3 text-gray-500 font-medium text-lg">
            Không có sản phẩm nào
          </div>
        ) : (
          renderProducts(products ?? [])
        )}
      </div>
      {totalProducts && totalProducts.length > pageSize && (
        <div className="flex justify-center mt-8">
          {" "}
          <ConfigProvider
            theme={{
              components: {
                Pagination: {
                  itemActiveBg: "rgb(255, 147, 160)",
                  colorBorder: "rgb(255, 147, 160)",
                  colorPrimary: "white",
                  colorPrimaryHover: "white",
                  colorPrimaryBorder: "rgb(255, 147, 160)",
                  colorText: "rgb(255, 147, 160)",
                  controlOutline: "rgb(255, 147, 160)",
                  itemSize: 36,
                  borderRadius: 8,
                  fontSize: 18,
                },
              },
            }}
          >
            <Pagination
              className="custom-pagination"
              current={page}
              total={totalProducts.length}
              pageSize={pageSize}
              onChange={(current: number) => {
                setPage(current);
                window.scrollTo({ top: 380, behavior: "smooth" });
              }}
              showSizeChanger={false}
            />{" "}
          </ConfigProvider>
        </div>
      )}
    </div>
  );
}
