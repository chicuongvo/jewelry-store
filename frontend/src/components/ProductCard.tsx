import { ShoppingBag, Tag } from "lucide-react";

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
    <div className="bg-white font-primary rounded-3xl shadow-lg overflow-hidden transition-all hover:shadow-xl border border-primary group">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-70 object-cover relative"
        />
        <div className="w-full flex items-center justify-center absolute bottom-4 ">
          <div className=" w-1/2 px-2 py-2 bg-black/70 text-white hover:bg-black text-center hidden group-hover:block transition-all duration-300 cursor-pointer">
            XEM NHANH
          </div>
        </div>
        <span className="absolute top-3 left-3 bg-pink-50 px-3 py-1.5 rounded-full flex items-center gap-1.5 text-sm font-medium text-primary border border-primary">
          <Tag size={14} className="text-primary" />
          {product.type}
        </span>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-2 font-primary">
          {product.name}
        </h3>

        <div className="flex items-center justify-between mt-4">
          <div className="flex flex-col">
            <span className="text-sm text-primary font-medium">Price</span>
            <span className="text-md font-bold text-gray-800 text-gray-700">
              {product.sell_price.split(".")[0]}
            </span>
          </div>

          <button
            className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-full hover:text-primary hover:bg-white hover:border hover:border-primary transition-all duration-300 font-medium shadow-md hover:shadow-lg active:scale-95"
            onClick={() => console.log(`Added ${name} to cart`)}
          >
            <ShoppingBag size={18} />
            Thêm
          </button>
        </div>
      </div>
    </div>
  );
}
