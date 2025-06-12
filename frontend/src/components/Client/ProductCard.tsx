import { ShoppingBag, Tag } from "lucide-react";
import { Link } from "react-router";

interface product {
  product_id: string;
  name: string;
  image: string;
  description: string;
  buy_price: string;
  sell_price: string;
  created_at: string;
  type: string;
  unit: string;
}

export default function ProductCard({ product }: { product: product }) {
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

      <div className="p-6">
        <h3 className="text-md font-semibold text-gray-700 mb-2 font-primary line-clamp-2 h-[55px]">
          {product.name}
        </h3>

        <div className="flex items-center justify-between mt-4">
          <div className="flex flex-col">
            <span className="text-sm text-primary font-medium">Price</span>
            <span className="text-sm font-bold text-gray-800 text-gray-700">
              {Number(product.sell_price).toLocaleString("vi-VN")}đ
            </span>
          </div>

          <button
            className="flex items-center gap-2 bg-primary border border-primary text-white px-5 py-2.5 rounded-2xl hover:text-primary hover:bg-white hover:border hover:border-primary transition-all duration-300 font-medium shadow-md text:md cursor-pointer "
            onClick={() => console.log(`Added ${product.name} to cart`)}
          >
            <ShoppingBag size={18} />
            Thêm
          </button>
        </div>
      </div>
    </div>
  );
}
