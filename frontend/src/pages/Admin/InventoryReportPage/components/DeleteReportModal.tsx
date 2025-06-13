import { deleteInventoryReport } from "@/api/inventoryReport.api";
import { useNotification } from "@/contexts/notificationContext";
import type { InventoryReport } from "@/types/InventoryReport/inventoryReport";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Dispatch, SetStateAction } from "react";

export default function DeleteReportModal({
  reportData,
  onClose,
  setUpdateData,
}: {
  reportData: InventoryReport;
  onClose: () => void;
  setUpdateData: Dispatch<SetStateAction<boolean>>;
}) {
  const queryClient = useQueryClient();
  const { addNotification } = useNotification();
  const { mutate, isPending } = useMutation({
    mutationFn: (report_id: string) => deleteInventoryReport(report_id),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["suppliers"],
      });
      addNotification(
        `Báo cáo tháng ${reportData.month}/${reportData.year} vừa được xóa.`
      );
      setUpdateData(true);
      onClose();
    },
  });

  const handleSubmit = () => {
    mutate(reportData.report_id);
  };
  return (
    <div className="fixed inset-0 bg-gray-600/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Bạn chắc chắn muốn xóa báo cáo tháng{" "}
            <b>
              {reportData.month}/{reportData.year}
            </b>
            ?
          </h2>

          <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Hủy
            </button>
            <button
              onClick={handleSubmit}
              disabled={isPending}
              className="cursor-pointer disabled:cursor-not-allowed px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 disabled:bg-gray-600"
            >
              {isPending ? "Đang xóa..." : "Xóa"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
