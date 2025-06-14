/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ServiceResponse } from "@/types/service/service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUser } from "@/contexts/userContext";
import { createServiceOrder } from "@/api/serviceOrder.api";
import { createServiceOrderDetail } from "@/api/service_order_detail.api";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";

interface Props {
  services: ServiceResponse[];
  totalPrice: number;
  totalPaidPrice: number;
  setChosenServices: (services: ServiceResponse[]) => void;
}

export default function ChosenServiceCards({
  services,
  totalPrice,
  totalPaidPrice,
  setChosenServices,
}: Props) {
  const { userProfile } = useUser();
  const nav = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      if (!userProfile?.user_id) {
        nav("/auth");
        return;
      }

      const order = await createServiceOrder({
        client_id: userProfile.user_id,
      });

      const service_order_id = order?.service_order_id;
      if (!service_order_id) throw new Error("Không thể lấy ID đơn hàng!");

      await Promise.all(
        services.map((service) =>
          createServiceOrderDetail({
            service_order_id,
            service_id: service.service_id,
            quantity: 1,
            calculated_price: service.base_price,
            total_price: service.base_price,
            paid: service.base_price / 2,
            remaining: service.base_price / 2,
            status: "NOT_DELIVERED",
          })
        )
      );

      return order;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      setChosenServices([]);
      toast.success("🎉 Đặt dịch vụ thành công!");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.error || "Đặt dịch vụ thất bại.");
    },
  });

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 pb-4 transition-shadow duration-200 flex flex-col gap-4 ">
      <ToastContainer />
      <h2 className="w-full text-center font-extrabold text-2xl text-gray-800">
        DỊCH VỤ ĐÃ CHỌN
      </h2>

      {services.length === 0 ? (
        <div className="text-sm text-gray-500 text-center italic">
          Chưa có dịch vụ nào được chọn
        </div>
      ) : (
        <>
          <table className="table-auto w-full border-separate border-white border-spacing-y-2 text-md">
            <thead className="bg-primary text-white ">
              <tr>
                <th className="px-4 py-2 text-center border-r-2 border-white">
                  Tên dịch vụ
                </th>
                <th className="px-4 py-2 text-center border-r-2 border-white">
                  Giá tiền
                </th>
                <th className="px-4 py-2 text-center">Trả trước</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service, index) => (
                <tr
                  key={service.service_id || index}
                  className="bg-white transition hover:shadow-md"
                >
                  <td className="px-4 py-2 text-center text-gray-700 border border-primary">
                    {service.name}
                  </td>
                  <td className="px-4 py-2 text-center text-gray-700 border border-primary">
                    {Number(service.base_price).toLocaleString()}₫
                  </td>
                  <td className="px-4 py-2 text-center text-gray-700  border border-primary">
                    {(Number(service.base_price) / 2).toLocaleString()}₫
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between mt-4 pt-4 border-t text-base font-semibold text-gray-800">
            <div>Tổng cộng</div>
            <div className="text-primary">{totalPrice.toLocaleString()}₫</div>
          </div>

          <div className="flex justify-between text-base font-semibold text-gray-800">
            <div>Tổng tiền trả trước</div>
            <div className="text-primary">
              {totalPaidPrice.toLocaleString()}₫
            </div>
          </div>

          <button
            onClick={() => mutation.mutate()}
            disabled={mutation.isPending}
            className="cursor-pointer mt-3 w-full bg-white text-primary hover:text-white border-2 border-primary py-2 rounded-lg hover:bg-primary transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {mutation.isPending ? "Đang xử lý..." : "Xác nhận"}
          </button>
        </>
      )}
    </div>
  );
}
