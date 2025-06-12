/* eslint-disable @typescript-eslint/no-explicit-any */
import { createInventoryReport } from "@/api/inventoryReport.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Modal } from "antd";
import { Calendar } from "lucide-react";
import { useState } from "react";

export default function CreateReportModal({
  setShowCreateModal,
}: {
  setShowCreateModal: any;
}) {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 7));

  const [modal, contextHolder] = Modal.useModal();

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: async (dateString: string) => {
      const [year, month] = dateString.split("-");
      return createInventoryReport({
        month: parseInt(month),
        year: parseInt(year),
      });
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["inventory-reports"] });
      modal.success({
        content: `Báo cáo ${date} đã được tạo.`,
      });
      setTimeout(() => {
        setShowCreateModal(false);
        window.location.reload();
      }, 1000);
    },
    onError(error: any) {
      const message =
        error?.response?.data?.message || "Có lỗi xảy ra khi tạo báo cáo.";
      modal.error({
        content: message,
      });
    },
  });

  return (
    <div className="fixed inset-0  bg-opacity-50 z-50 flex items-center justify-center p-4">
      {contextHolder}
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
        <div className="p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Tạo báo cáo mới
          </h2>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tháng
              </label>
              <input
                type="month"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                defaultValue={new Date().toISOString().slice(0, 7)}
                onChange={(e) => {
                  const newDate = e.currentTarget.value;
                  setDate(newDate);
                }}
              />
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-start">
                <Calendar className="h-5 w-5 text-blue-600 mt-0.5 mr-2" />
                <div className="text-sm text-blue-700">
                  <p className="font-medium">Lưu ý:</p>
                  <p>
                    Hệ thống sẽ tự động ghi nhận những thay đổi về số lượng tồn
                    kho dựa trên các hoạt động nhập hàng và bán hàng theo từng
                    tháng.
                  </p>
                </div>
              </div>
            </div>
          </form>

          <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
            <button
              onClick={() => setShowCreateModal(false)}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
            >
              Hủy
            </button>
            <button
              onClick={() => mutate(date)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 cursor-pointer disabled:bg-zinc-500"
              disabled={isPending}
            >
              {isPending ? "Đang xử lý..." : "Tạo báo cáo"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
