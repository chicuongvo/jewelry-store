import { Sparkles } from "lucide-react";
import ProductCard from "../../../../components/Client/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "@/api/product.api";
import type { Product } from "@/types/Product/product";
import ProductCardSkeleton from "@/components/Client/SkeletonProductCard";

const renderProducts = (products: Product[]) => {
  return products
    .slice(0, 4)
    .map((product) => (
      <ProductCard key={product.product_id} product={product} />
    ));
};

export default function FeaturedProducts() {
  const {
    data: products = [],
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () => getAllProducts(),
  });

  return (
    <div>
      <div className="bg-primary font-logo py-4 flex items-center justify-center font-medium text-white text-[20px] gap-3 md:text-[23px] lg:text-[25px]">
        <Sparkles />
        Sản phẩm nổi bật
        <Sparkles />
      </div>

      <div className="bg-white flex flex-col gap-10 px-10 md:px-15 py-8 md:grid md:grid-cols-2 lg:grid-cols-4">
        {isLoading || isFetching
          ? Array.from({ length: 4 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))
          : renderProducts(products)}
      </div>
    </div>
  );
}
