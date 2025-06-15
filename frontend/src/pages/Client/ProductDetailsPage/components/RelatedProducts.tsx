/* eslint-disable @typescript-eslint/no-explicit-any */

import ProductCard from "@/components/Client/ProductCard";
import ProductCardSkeleton from "@/components/Client/SkeletonProductCard";
import type { Product } from "@/types/Product/product";

export default function RelatedProducts({
  product,
  relatedProducts,
  isLoading,
  isFetching,
}: {
  product: any;
  relatedProducts: any;
  isLoading: any;
  isFetching: any;
}) {
  const renderProducts = (relatedProducts: Product[]) => {
    return relatedProducts
      .filter((p) => p.product_id !== product.product_id)
      .map((p) => <ProductCard key={p.product_id} product={p} />);
  };

  return (
    <div>
      <div className="text-3xl font-extrabold w-full text-center ">
        SẢN PHẨM CÙNG LOẠI
      </div>
      <div className="flex flex-row w-full overflow-x-scroll gap-5 px-4 py-5 justify-center items-center">
        {isLoading || isFetching ? (
          Array.from({ length: 4 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))
        ) : relatedProducts?.length === 0 ? (
          <div className="text-center col-span-3 text-gray-500 font-medium text-lg">
            Không có sản phẩm nào
          </div>
        ) : (
          renderProducts(relatedProducts ?? [])
        )}
      </div>
    </div>
  );
}
