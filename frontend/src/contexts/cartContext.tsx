// import {
//   createContext,
//   useState,
//   useContext,
//   useEffect,
//   type ReactNode,
// } from "react";
// import type { Cart } from "@/types/Cart/cart";
// import { getCartByUserId } from "@/api/cart.api";

// interface CartContextType {
//   cartData: Cart | null;
//   setCartData: React.Dispatch<React.SetStateAction<Cart | null>>;
//   cartChanged: boolean;
//   setCartChanged: React.Dispatch<React.SetStateAction<boolean>>;
// }

// const CartContext = createContext<CartContextType | null>(null);

// // ✅ Hook đúng tên
// export const useCart = (): CartContextType => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error("useCart must be used within a CartProvider");
//   }
//   return context;
// };

// export const CartProvider = ({ children }: { children: ReactNode }) => {
//   const [cartData, setCartData] = useState<Cart | null>(null);
//   const [cartChanged, setCartChanged] = useState(false);

//   useEffect(() => {
//     const fetchCartData = async () => {
//       try {
//         const data = await getCartByUserId();
//         setCartData(data);
//       } catch (error) {
//         console.error("Error fetching cart data:", error);
//         setCartData(null);
//       } finally {
//         setCartChanged(false);
//       }
//     };

//     fetchCartData();
//   }, [cartChanged]);

//   return (
//     <CartContext.Provider
//       value={{
//         cartData,
//         setCartData,
//         cartChanged,
//         setCartChanged,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };
