import { getInventoryReportByMonthAndYear } from "@/api/inventoryReport.api";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { Download, TrendingUp, TrendingDown } from "lucide-react";

export default function InventoryReportDetails() {
  const params = useParams();
  const month = parseInt(params.month ?? "0");
  const year = parseInt(params.year ?? "0");
  const nav = useNavigate();

  const { data: reportData, isLoading } = useQuery({
    queryKey: ["reports", month, year],
    queryFn: () => getInventoryReportByMonthAndYear(month, year),
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Báo Cáo Tháng {reportData?.month}/{reportData?.year}
            </h2>
            <p className="text-gray-600">
              Báo cáo chi tiết về số lượng tồn kho
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="flex items-center px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200">
              <Download className="h-4 w-4 mr-2" />
              Xuất PDF
            </button>
            <button
              onClick={() => nav("/admin/inventory-reports")}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              Quay lại
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tên sản phẩm
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tồn đầu
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Số lượng mua vào
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Số lượng bán ra
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tồn cuối
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thay đổi
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index} className="animate-pulse">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <td key={i} className="px-6 py-4">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      </td>
                    ))}
                  </tr>
                ))
              : reportData?.inventory_report_details.map((item) => {
                  const change = item.end_stock - item.begin_stock;
                  return (
                    <tr
                      key={item.product_id}
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {item.product.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {item.begin_stock}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-emerald-600 font-medium">
                          +{item.buy_quantity}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-red-600 font-medium">
                          -{item.sell_quantity}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 font-medium">
                          {item.end_stock}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div
                          className={`text-sm font-medium flex items-center ${
                            change > 0
                              ? "text-emerald-600"
                              : change < 0
                              ? "text-red-600"
                              : "text-gray-600"
                          }`}
                        >
                          {change > 0 ? (
                            <TrendingUp className="h-4 w-4 mr-1" />
                          ) : change < 0 ? (
                            <TrendingDown className="h-4 w-4 mr-1" />
                          ) : null}
                          {change > 0 ? "+" : ""}
                          {change}
                        </div>
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
