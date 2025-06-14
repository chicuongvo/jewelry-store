import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import ProductDetailsSkeleton from "./ProductDetailsSkeleton";
import { getProduct } from "@/api/product.api";
import { useState } from "react";

export default function ProductDetails() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id as string),
    enabled: !!id,
  });

  if (isLoading) return <ProductDetailsSkeleton />;

  return (
    <div className="font-primary flex flex-col md:flex-row px-4 md:px-30 pt-10 gap-20 ">
      <div className="md:w-1/2 h-[300px] md:h-[500px] overflow-hidden bg-zinc-100">
        <img
          src={product?.image}
          alt={product?.name}
          className="w-full h-full object-cover hover:scale-[1.3] transition-all duration-2000"
        />
      </div>

      <div className="flex flex-col gap-4 md:w-1/2">
        <div className="text-2xl font-bold">{product?.name}</div>

        <div className="text-xl font-semibold text-rose-600">
          {Number(product?.sell_price).toLocaleString("vi-VN")}₫
        </div>

        <div className="flex items-center gap-4">
          <span className="font-medium">Số lượng:</span>
          <div className="flex items-center border border-zinc-300 rounded overflow-hidden">
            <button
              className="px-3 py-1 bg-zinc-100 hover:bg-zinc-200 cursor-pointer"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            >
              -
            </button>
            <span className="h-full w-[40px] text-center">{quantity}</span>
            <button
              className="px-3 py-1 bg-zinc-100 hover:bg-zinc-200 cursor-pointer"
              onClick={() => setQuantity((q) => q + 1)}
            >
              +
            </button>
          </div>
        </div>

        <div className="flex gap-4 pb-6 border-b border-zinc-300">
          <button className="bg-primary text-white hover:bg-primary/50 hover:border-2 hover:border-primary/50 cursor-pointer transition-all duration-300 border-2 border-primary px-6 py-3 text-sm font-semibold rounded">
            MUA NGAY
          </button>
          <button className="bg-white text-primary hover:bg-zinc-100 transition-all border-2 border-primary px-6 py-3 text-sm font-semibold rounded  transition-all duration-300  cursor-pointer                                                                                    ">
            THÊM VÀO GIỎ
          </button>
        </div>

        <div className="pt-4 flex flex-col gap-3">
          <div className="text-xl font-bold">CHI TIẾT SẢN PHẨM</div>
          <p className="text-md text-justify text-zinc-700">
            {product?.description}
          </p>
          <div className="text-md">
            <span className="font-bold text-md">Phân loại: </span>
            {product?.type}
          </div>
        </div>
      </div>
    </div>
  );
}
