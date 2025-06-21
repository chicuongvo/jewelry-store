/* eslint-disable @typescript-eslint/no-explicit-any */
import { removeFromCart, updateCart } from "@/api/cart.api";
import { useCart } from "@/contexts/cartContext";
import type { cartDetails } from "@/types/CartDetails/cartDetails";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Minus, Plus, Tag, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

interface Props {
  cartDetails: cartDetails;
  toggleCartDetails?: (cartDetails: cartDetails) => void;
  isSelected?: boolean;
  showCheckbox?: boolean;
  checked?: boolean;
  setChosenCartDetails: any;
}

export default function CartDetailsCard({
  cartDetails,
  toggleCartDetails,
  isSelected = false,
  showCheckbox = false,
  checked = false,
  setChosenCartDetails,
}: Props) {
  const [quantity, setQuantity] = useState<number>(
    Number(cartDetails.quantity) || 1
  );

  const queryClient = useQueryClient();
  const { setCartChanged } = useCart();

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
      setCartChanged(true);
    },
    onError(error: any) {
      const message =
        error?.response?.data?.message ||
        `Có lỗi xảy ra khi cập nhật giỏ hàng.`;
      toast.error(message);
    },
  });

  const { mutate: deleteMutation, isPending: isDeleting } = useMutation({
    mutationFn: (product_id: string) => removeFromCart(product_id),
    onSuccess() {
      toast.success("Đã xoá sản phẩm khỏi giỏ hàng.");
      setCartChanged(true);
      setChosenCartDetails([]);

      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError(error: any) {
      const message =
        error?.response?.data?.message || "Xoá sản phẩm thất bại.";
      toast.error(message);
    },
  });

  let end_stock = 0;
  if (
    cartDetails.product &&
    cartDetails.product.inventory_report_details &&
    cartDetails.product.inventory_report_details.length > 0
  ) {
    end_stock = cartDetails.product.inventory_report_details[0]?.end_stock ?? 0;
  }

  if (end_stock < 0) {
    end_stock = 0;
  }

  const increaseQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateMutation({
      product_id: cartDetails.product_id ?? "",
      quantity: newQuantity,
    });
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      updateMutation({
        product_id: cartDetails.product_id ?? "",
        quantity: newQuantity,
      });
    }
  };

  console.log(cartDetails);
  return (
    <div
      className={`flex justify-between items-start rounded-md px-6 py-4 h-[180px] ${
        isSelected
          ? "border-2 border-primary shadow-md"
          : "border-2 border-zinc-200 shadow-sm"
      }`}
    >
      <div className="flex flex-row gap-3 w-full ">
        {showCheckbox && (
          <label className="flex items-start gap-2 cursor-pointer select-none mt-2">
            <input
              type="checkbox"
              checked={checked}
              onChange={() => toggleCartDetails?.(cartDetails)}
              className="peer hidden"
            />
            <div className="w-5 h-5 flex items-center justify-center border-2 border-primary rounded-sm peer-checked:bg-primary peer-checked:border-primary">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </label>
        )}

        <div className="w-[100px] h-[100px]">
          <img
            src={cartDetails.product?.image}
            alt={cartDetails.product?.name}
            className="w-[100px] h-[100px] object-cover rounded-md"
          />
        </div>

        <div className="flex flex-col justify-between gap-1 flex-1">
          <span className="w-max bg-pink-50 px-2 py-1.5 rounded-full flex items-center gap-1.5 text-[12px] font-medium text-primary border border-primary">
            <Tag size={12} className="text-primary" />
            {cartDetails.product?.type}
          </span>

          <div className="text-md font-bold line-clamp-1">
            {cartDetails.product?.name}
          </div>

          <div className="text-md text-emerald-600">
            {Number(cartDetails.product?.sell_price).toLocaleString()}₫
          </div>

          <div className="w-max flex flex-col items-start gap-2">
            <div className="flex items-center border border-gray-300">
              <button
                onClick={decreaseQuantity}
                className="p-2 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                disabled={quantity <= 1}
              >
                <Minus className="h-3 w-3" />
              </button>
              <span className="w-[30px] py-1 text-center font-semibold text-gray-900">
                {quantity}
              </span>
              <button
                onClick={increaseQuantity}
                className="p-2 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                disabled={quantity >= (end_stock ?? Infinity)}
              >
                <Plus className="h-3 w-3" />
              </button>
            </div>

            <div className="text-[12px] text-gray-500 mt-1">
              Còn lại:{" "}
              <span
                className={`font-semibold ${
                  (end_stock ?? 0) === 0
                    ? "text-red-500"
                    : (end_stock ?? 0) <= 5
                    ? "text-orange-500"
                    : "text-green-600"
                }`}
              >
                {end_stock ?? 0} sản phẩm
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end justify-between font-bold h-full">
        <Trash2
          className={`text-red-300 hover:text-red-500 transition-all ${
            isDeleting ? "cursor-not-allowed" : "cursor-pointer"
          }`}
          onClick={() => {
            if (cartDetails.product_id) {
              deleteMutation(cartDetails.product_id);
            } else {
              toast.error("Thiếu product_id!");
            }
          }}
        />

        <div>
          <span className="font-medium">Tổng: </span>
          {(quantity * (cartDetails.product?.sell_price ?? 0)).toLocaleString()}
          ₫
        </div>
      </div>
    </div>
  );
}
