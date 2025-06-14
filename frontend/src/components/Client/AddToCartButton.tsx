/* eslint-disable @typescript-eslint/no-explicit-any */
import { ShoppingBag } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { addToCart } from "@/api/cart.api";
import type { Product } from "@/types/Product/product";
import { useUser } from "@/contexts/userContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useCart } from "@/contexts/cartContext";

export default function AddToCartButton({
  product,
  quantity,
}: {
  product: Product;
  quantity: number;
}) {
  const { userProfile } = useUser();
  const { setCartChanged } = useCart();

  const mutation = useMutation({
    mutationFn: (productId: string) => addToCart(productId, quantity),
    onSuccess: () => {
      setCartChanged(true);
      toast.success("Sản phẩm đã được thêm vào giỏ hàng", { autoClose: 1500 });
    },
    onError: (error) => {
      const err = error as any;
      toast.error(
        err?.response?.data?.message ||
          `Có lỗi xảy ra khi thêm sản phẩm vào giỏ hảng.`
      );
      console.log(product);
    },
  });

  const nav = useNavigate();

  const handleAddToCart = () => {
    if (!userProfile?.user_id) {
      nav("/auth");
    }
    mutation.mutate(product.product_id);
  };

  return (
    <button
      className="flex w-full items-center disabled:cursor-not-allowed justify-center gap-2 bg-primary border border-primary text-white px-5 py-2.5 font-bold hover:text-white hover:bg-primary/80 hover:border hover:border-primary/80 transition-all duration-300 text:md cursor-pointer"
      onClick={handleAddToCart}
      disabled={mutation.isPending}
    >
      <ShoppingBag size={18} />
      {mutation.isPending ? "ĐANG THÊM..." : "THÊM VÀO GIỎ"}
    </button>
  );
}
