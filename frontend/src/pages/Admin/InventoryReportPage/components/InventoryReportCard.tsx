import type { InventoryReport } from "@/types/InventoryReport/inventoryReport";
import { FileText, TrendingUp, TrendingDown } from "lucide-react";
import { useNavigate } from "react-router";
export default function InventoryReportCard({
  report,
}: {
  report: InventoryReport;
}) {
  const nav = useNavigate();

  const handleViewReport = (report: InventoryReport) => {
    nav(`${report.month}/${report.year}`);
  };

  const formatId = (id: string) => {
    return id.slice(0, 8);
  };
  return (
    <div
      key={report.report_id}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
            <FileText className="h-5 w-5 text-blue-600" />
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-bold text-gray-900">
              Báo cáo Tháng {report.month}/{report.year}
            </h3>
            <p className="text-sm text-gray-500">
              Mã báo cáo: {formatId(report.report_id)}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3 text-sm">
          <span className="text-gray-600">Số sản phẩm được theo dõi:</span>
          <span className="font-medium text-gray-900">
            {report.total_products}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 flex items-center">
            <TrendingUp className="h-3 w-3 mr-1 text-emerald-600" />
            Tổng số lượng mua vào:
          </span>
          <span className="font-medium text-emerald-600">
            {report.total_buy}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 flex items-center">
            <TrendingDown className="h-3 w-3 mr-1 text-red-600" />
            Tổng số lượng bán ra
          </span>
          <span className="font-medium text-red-600">{report.total_sell}</span>
        </div>
      </div>

      <div className="flex items-center space-x-2 mt-4 pt-4 border-t border-gray-100">
        <button
          onClick={() => handleViewReport(report)}
          className="flex-1 text-sm text-blue-600 hover:text-blue-700 font-medium cursor-pointer"
        >
          Xem chi tiết
        </button>
      </div>
    </div>
  );
}
