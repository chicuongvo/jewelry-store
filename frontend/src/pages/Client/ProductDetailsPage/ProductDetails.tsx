import { ToastContainer } from "react-toastify";
import ProductDetails from "./components/ProductDetails";
import { getAllProducts, getProduct } from "@/api/product.api";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import RelatedProducts from "./components/RelatedProducts";

export default function ProductDetailsPage() {
  const { id } = useParams();

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id as string),
    enabled: !!id,
  });

  const {
    data: relatedProducts,
    isLoading: isLoadingRelatedProducts,
    isFetching,
  } = useQuery({
    queryKey: ["products", product?.type],
    queryFn: () =>
      getAllProducts({
        category: product?.type,
      }),
  });
  return (
    <div className="flex flex-col gap-10 py-10">
      <ToastContainer />
      <ProductDetails product={product} isLoading={isLoading} />
      <div className="w-full">
        <RelatedProducts
          product={product}
          relatedProducts={relatedProducts}
          isLoading={isLoadingRelatedProducts}
          isFetching={isFetching}
        />
      </div>
    </div>
  );
}
