import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import ProductDetailsSkeleton from "./ProductDetailsSkeleton";
import { getProduct } from "@/api/product.api";
import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import AddToCartButton from "@/components/Client/AddToCartButton";

export default function ProductDetails() {
  const { id } = useParams();

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id as string),
    enabled: !!id,
  });
  const [quantity, setQuantity] = useState(1);
  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));
  const totalPrice = (Number(product?.sell_price ?? 0) * quantity).toFixed(2);

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

        <div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center border border-gray-300 ">
              <button
                onClick={decreaseQuantity}
                className="p-2 disabled:opacity-50 cursor-pointer"
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-[50px]  py-2 font-semibold text-gray-900 text-center">
                {quantity}
              </span>
              <button
                onClick={increaseQuantity}
                className="p-2 disabled:opacity-50 cursor-pointer"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <div className="text-md text-gray-800">
              <span className="font-bold">Tổng:</span>{" "}
              {Number(totalPrice).toLocaleString()}₫
            </div>
          </div>
        </div>

        <div className=" w-full grid grid-cols-2 gap-4 pb-6 border-b border-zinc-300 pt-3">
          <button className="flex w-full items-center justify-center gap-2 bg-white border-2 border-primary text-primary px-5 py-2.5  font-bold hover:text-white hover:bg-primary hover:border-2 hover:border-primary transition-all duration-300 text:md cursor-pointer ">
            MUA NGAY
          </button>
          {product && <AddToCartButton product={product} quantity={quantity} />}
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
