import type { Product } from "@/types/Product/product";
import { ShoppingBag } from "lucide-react";

export default function AddToCartButton({ product }: { product: Product }) {
  return (
    <button
      className="flex w-full items-center justify-center gap-2 bg-primary border border-primary text-white px-5 py-2.5  font-bold hover:text-white hover:bg-primary/80 hover:border hover:border-primary/80 transition-all duration-300 text:md cursor-pointer "
      onClick={() => console.log(`Added ${product.name} to cart`)}
    >
      <ShoppingBag size={18} />
      THÊM VÀO GIỎ
    </button>
  );
}
