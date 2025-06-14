import { getCartByUserId } from "@/api/cart.api";
import { useQuery } from "@tanstack/react-query";
import CartDetailsCard from "./components/CartDetailsCard";
import CartDetailsSkeleton from "./components/CartDetailsCardSkeleton";

export default function Cart() {
  const { data: cart, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: getCartByUserId,
  });
  return (
    <div className="py-10 px-5 md:px-20">
      <div className="text-4xl w-full text-center font-extrabold">GIỎ HÀNG</div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-x-10 py-10">
        <div className="grid grid-cols-1 gap-6">
          {isLoading
            ? Array.from({ length: 2 }).map((_, idx) => (
                <CartDetailsSkeleton key={idx} />
              ))
            : null}
          {cart?.cart_details.map((details) => (
            <CartDetailsCard cartDetails={details} />
          ))}
        </div>

        {/* <ChosenServiceCards
          services={chosenServices}
          totalPrice={totalPrice}
          setChosenServices={setChosenServices}
          totalPaidPrice={totalPaidPrice}
        /> */}
      </div>
    </div>
    // </div>
  );
}
