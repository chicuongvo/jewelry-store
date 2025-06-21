/* eslint-disable @typescript-eslint/no-explicit-any */

import { ToastContainer, toast } from "react-toastify";
import type { cartDetails } from "@/types/CartDetails/cartDetails";
import { useNavigate } from "react-router";
import { useUser } from "@/contexts/userContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSalesOrder } from "@/api/sales_order.api";
import { createSalesOrderDetail } from "@/api/sales_order_detail.api";
import { removeFromCart } from "@/api/cart.api";
import { useCart } from "@/contexts/cartContext";

interface Props {
  cartDetails: cartDetails[];
  totalPrice: number;
  setChosenCartDetails: (cartDetails: cartDetails[]) => void;
}

export default function ChosenCartDetails({
  cartDetails,
  totalPrice,
  setChosenCartDetails,
}: Props) {
  const { userProfile } = useUser();
  const nav = useNavigate();
  const queryClient = useQueryClient();
  const { setCartChanged } = useCart();

  const mutation = useMutation({
    mutationFn: async () => {
      if (!userProfile?.user_id) {
        nav("/auth");
        return;
      }

      const order = await createSalesOrder({
        client_id: userProfile.user_id,
      });

      const sales_order_id = order?.sales_order_id;
      if (!sales_order_id) throw new Error("Không thể lấy ID đơn hàng!");

      await Promise.all(
        cartDetails.map((details) => {
          if (
            !details.product_id ||
            !details.quantity ||
            !details.total_price
          ) {
            throw new Error(
              "Thiếu thông tin sản phẩm để tạo chi tiết đơn hàng!"
            );
          }
          return createSalesOrderDetail({
            sales_order_id,
            product_id: details.product_id,
            quantity: details.quantity,
            total_price: details.total_price,
          });
        })
      );

      await Promise.all(
        cartDetails.map((details) => {
          if (!details.product_id) return null;
          return removeFromCart(details.product_id);
        })
      );

      return order;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      setChosenCartDetails([]);
      setCartChanged(true);
      toast.success("🎉 Đặt hàng thành công!");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.error || "Đặt hàng thất bại.");
    },
  });

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 pb-4 transition-shadow duration-200 flex flex-col gap-4 ">
      <ToastContainer />
      <h2 className="w-full text-center font-extrabold text-2xl text-gray-800">
        HÓA ĐƠN
      </h2>

      {cartDetails.length === 0 ? (
        <div className="text-sm text-gray-500 text-center italic">
          Chưa có sản phẩm nào được chọn
        </div>
      ) : (
        <>
          <table className="table-auto w-full border-separate border-white border-spacing-y-2 text-md">
            <thead className="bg-primary text-white ">
              <tr>
                <th className="px-4 py-2 text-center border-r-2 border-white">
                  Tên sản phẩm
                </th>
                <th className="px-4 py-2 text-center border-r-2 border-white">
                  Số lượng
                </th>
                <th className="px-4 py-2 text-center">Giá tiền</th>
              </tr>
            </thead>
            <tbody>
              {cartDetails.map((details, index) => (
                <tr key={index} className="bg-white transition hover:shadow-md">
                  <td className="px-4 py-2 text-center text-gray-700 border border-primary">
                    {details.product?.name}
                  </td>
                  <td className="px-4 py-2 text-center text-gray-700 border border-primary">
                    {details.quantity}
                  </td>
                  <td className="px-4 py-2 text-center text-gray-700  border border-primary">
                    {details.total_price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between mt-4 pt-4 border-t text-base font-semibold text-gray-800">
            <div>Tổng cộng</div>
            <div className="text-primary">{totalPrice.toLocaleString()}₫</div>
          </div>

          <button
            onClick={() => mutation.mutate()}
            disabled={mutation.isPending || cartDetails.length === 0}
            className="cursor-pointer mt-3 w-full bg-white text-primary hover:text-white border-2 border-primary py-2 rounded-lg hover:bg-primary transition-all duration-200 font-semibold  disabled:bg-primary/50 disabled:text-white disabled:border disabled:border-primary/50 disabled:cursor-not-allowed"
          >
            {mutation.isPending ? "Đang xử lý..." : "Xác nhận"}
          </button>
        </>
      )}
    </div>
  );
}
