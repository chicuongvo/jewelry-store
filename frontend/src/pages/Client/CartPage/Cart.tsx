import { getCartByUserId } from "@/api/cart.api";
import { useQuery } from "@tanstack/react-query";
import CartDetailsCard from "./components/CartDetailsCard";
import CartDetailsSkeleton from "./components/CartDetailsCardSkeleton";
import { useState } from "react";
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

  return (
    <div className="py-10 px-5 md:px-20">
      <div className="text-4xl w-full text-center font-extrabold">GIỎ HÀNG</div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-x-10 py-10">
        <div className="flex flex-col gap-6 col-span-2">
          {isLoading
            ? Array.from({ length: 2 }).map((_, idx) => (
                <CartDetailsSkeleton key={idx} />
              ))
            : null}
          {cart?.cart_details.map((details) => {
            const isSelected = chosenCartDetails.includes(details);
            return (
              <CartDetailsCard
                cartDetails={details}
                isSelected={isSelected}
                toggleCartDetails={toggleCartDetails}
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
