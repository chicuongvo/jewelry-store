import type { Product } from "@/types/Product/product";
import { Tag } from "lucide-react";
import { Link } from "react-router";
import AddToCartButton from "./AddToCartButton";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white font-primary overflow-hidden transition-all  group transition-all duration-500">
      <div className="relative">
        <div className="w-full h-70 overflow-hidden bg-zinc-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-70 object-cover relative hover:scale-[1.3] transition-all duration-1300"
          />
        </div>
        <div className="w-full flex items-center justify-center absolute bottom-4 ">
          <Link
            to={`/product/${product.product_id}`}
            className=" w-1/2 px-2 py-2 bg-black/70 text-white hover:bg-black text-center hidden group-hover:block transition-all duration-300 cursor-pointer"
          >
            XEM NHANH
          </Link>
        </div>
        <span className="absolute top-3 left-3 bg-pink-50 px-3 py-1.5 rounded-full flex items-center gap-1.5 text-sm font-medium text-primary border border-primary">
          <Tag size={14} className="text-primary" />
          {product.type}
        </span>
      </div>

      <div className="py-6 flex flex-col gap-4">
        <h3 className="text-md font-semibold text-gray-700 font-primary line-clamp-2 h-[55px]">
          {product.name}
        </h3>

        <div className="flex items-center justify-between ">
          <div className="flex flex-row justify-between w-full">
            <span className="text-md text-primary font-medium">Price</span>
            <span className="text-md font-bold text-emerald-600">
              {Number(product.sell_price).toLocaleString("vi-VN")}₫
            </span>
          </div>
        </div>
        <AddToCartButton product={product} quantity={1} />
      </div>
    </div>
  );
}
