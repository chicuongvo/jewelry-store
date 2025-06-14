import { getCartByUserId } from "@/api/cart.api";
import { useQuery } from "@tanstack/react-query";
import CartDetailsCard from "./components/CartDetailsCard";
import CartDetailsSkeleton from "./components/CartDetailsCardSkeleton";
import { useMemo, useState } from "react";
import type { cartDetails } from "@/types/CartDetails/cartDetails";
import ChosenCartDetails from "./components/ChosenCartDetails";

export default function Cart() {
  const { data: cart, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: getCartByUserId,
  });

  const [chosenCartDetails, setChosenCartDetails] = useState<cartDetails[]>([]);

  const toggleCartDetails = (cartDetails: cartDetails) => {
    setChosenCartDetails((prev) => {
      const isSelected = prev.some(
        (c) => c.product_id === cartDetails.product_id
      );
      if (isSelected) {
        return prev.filter((c) => c.product_id !== cartDetails.product_id);
      } else {
        return [...prev, cartDetails];
      }
    });
  };

  const totalPrice = chosenCartDetails.reduce(
    (sum, cartDetails) => sum + (Number(cartDetails.total_price) || 0),
    0
  );

  const isAllSelected = useMemo(() => {
    return (
      (cart?.cart_details?.length ?? 0) > 0 &&
      chosenCartDetails.length === (cart?.cart_details?.length ?? 0)
    );
  }, [cart, chosenCartDetails]);

  const handleCheckAll = () => {
    if (isAllSelected) {
      setChosenCartDetails([]);
    } else {
      setChosenCartDetails(cart?.cart_details || []);
    }
  };

  return (
    <div className="py-10 px-5 md:px-20">
      <div className="text-4xl w-full text-center font-extrabold">GIỎ HÀNG</div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-x-10 py-10">
        <div className="flex flex-col gap-6 col-span-2">
          <label className="flex items-center gap-3 cursor-pointer select-none w-full shadow-sm border-2 border-zinc-200 rounded-md py-4 px-4 text-lg font-bold text-primary transition-all duration-200 hover:bg-pink-50">
            <input
              type="checkbox"
              checked={isAllSelected}
              onChange={handleCheckAll}
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
            Chọn tất cả
          </label>

          {isLoading
            ? Array.from({ length: 2 }).map((_, idx) => (
                <CartDetailsSkeleton key={idx} />
              ))
            : null}
          {cart?.cart_details.map((details) => {
            return (
              <CartDetailsCard
                cartDetails={details}
                toggleCartDetails={toggleCartDetails}
                isSelected={chosenCartDetails.includes(details)}
                showCheckbox={true}
                checked={chosenCartDetails.includes(details)}
                setChosenCartDetails={setChosenCartDetails}
              />
            );
          })}
        </div>

        <ChosenCartDetails
          cartDetails={chosenCartDetails}
          totalPrice={totalPrice}
          setChosenCartDetails={setChosenCartDetails}
        />
      </div>
    </div>
    // </div>
  );
}
