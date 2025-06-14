/* eslint-disable @typescript-eslint/no-explicit-any */
import { removeFromCart, updateCart } from "@/api/cart.api";
import { useCart } from "@/contexts/cartContext";
import type { cartDetails } from "@/types/CartDetails/cartDetails";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Minus, Plus, Tag, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

export default function CartDetailsCard({
  cartDetails,
  toggleCartDetails,
  isSelected,
}: {
  cartDetails: cartDetails;
  toggleCartDetails: any;
  isSelected: any;
}) {
  const [quantity, setQuantity] = useState<number>(
    Number(cartDetails.quantity) || 1
  );

  const queryClient = useQueryClient();
  const { mutate: updateMutation } = useMutation({
    mutationFn: ({
      product_id,
      quantity,
    }: {
      product_id: string;
      quantity: number;
    }) => updateCart(product_id, quantity),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError(error: any) {
      const message =
        error?.response?.data?.message ||
        `Có lỗi xảy ra khi cập nhật giỏ hàng.`;
      toast.error(message);
    },
  });

  const { setCartChanged } = useCart();

  const { mutate: deleteMutation, isPending: isDeleting } = useMutation({
    mutationFn: (product_id: string) => removeFromCart(product_id),
    onSuccess() {
      toast.success("Đã xoá sản phẩm khỏi giỏ hàng.");
      setCartChanged(true);
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError(error: any) {
      const message =
        error?.response?.data?.message || "Xoá sản phẩm thất bại.";
      toast.error(message);
    },
  });

  const increaseQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    if (cartDetails.product_id) {
      updateMutation({
        product_id: cartDetails.product_id,
        quantity: newQuantity,
      });
    } else {
      toast.error("Product ID is missing.");
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      if (cartDetails.product_id) {
        updateMutation({
          product_id: cartDetails.product_id,
          quantity: newQuantity,
        });
      } else {
        toast.error("Product ID is missing.");
      }
    }
  };

  return (
    <div
      className={`flex flex-row justify-between rounded-md  px-6 py-4 cursor-pointer h-[170px] ${
        isSelected
          ? "border border-red-200 shadow-md"
          : "shadow-sm border border-zinc-200"
      }`}
      onClick={() => toggleCartDetails(cartDetails)}
    >
      <div className="flex flex-row gap-3">
        <div className="w-[100px] h-[100px] aspect-square">
          <img
            src={cartDetails.product?.image}
            alt={cartDetails.product?.name}
            className="w-[100px] h-[100px]  object-cover"
          />
        </div>
        <div className="flex flex-col justify-between gap-1">
          <span className="w-max bg-pink-50 px-2 py-1.5 rounded-full flex items-center gap-1.5 text-[12px] font-medium text-primary border border-primary">
            <Tag size={12} className="text-primary" />
            {cartDetails.product?.type}
          </span>
          <div className="text-md font-bold">{cartDetails.product?.name}</div>
          <div className="text-md text-emerald-600 ">
            {Number(cartDetails.product?.sell_price).toLocaleString()}₫
          </div>
          <div className="w-max">
            <div className="flex items-center border border-gray-300 ">
              <button
                onClick={decreaseQuantity}
                className="p-2 disabled:opacity-50 cursor-pointer"
                disabled={quantity <= 1}
              >
                <Minus className="h-3 w-3" />
              </button>
              <span className="w-[30px]  py-1 font-semibold text-gray-900 text-center">
                {quantity}
              </span>
              <button
                onClick={increaseQuantity}
                className="p-2 disabled:opacity-50 cursor-pointer"
              >
                <Plus className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end justify-between content-end font-bold">
        <Trash2
          className={`text-red-300  hover:text-red-500 transition-all duration-400 ${
            isDeleting ? "cursor:not-allowed" : "cursor-pointer"
          }`}
          onClick={() => {
            if (cartDetails.product_id) {
              deleteMutation(cartDetails.product_id);
            } else {
              toast.error("Product ID is missing.");
            }
          }}
        />

        <div>
          <span className="font-medium ">Tổng: </span>
          {(quantity * (cartDetails.product?.sell_price ?? 0)).toLocaleString()}
          ₫
        </div>
      </div>
    </div>
  );
}
