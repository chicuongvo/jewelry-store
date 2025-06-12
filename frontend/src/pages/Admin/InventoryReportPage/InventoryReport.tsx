/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  FileText,
  Plus,
  Calendar,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getAllInventoryReports } from "@/api/inventoryReport.api";

export default function InventoryReports() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const nav = useNavigate();

  const { data: reportData } = useQuery({
    queryKey: ["reports"],
    queryFn: getAllInventoryReports,
  });

  const handleViewReport = (report: any) => {
    nav(`${report.month}/${report.year}`);
  };

  const formatId = (id: string) => {
    return id.slice(0, 8);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Báo Cáo Tồn Kho</h1>
          <p className="text-gray-600">Theo dõi báo cáo tồn kho mỗi tháng</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <Plus className="h-4 w-4 mr-2" />
          Tạo báo cáo
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(reportData ?? []).map((report: any) => (
          <div
            key={report.id}
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
                <span className="text-gray-600">
                  Số sản phẩm được theo dõi:
                </span>
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
                <span className="font-medium text-red-600">
                  {report.total_sell}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2 mt-4 pt-4 border-t border-gray-100">
              <button
                onClick={() => handleViewReport(report)}
                className="flex-1 text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Xem chi tiết
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Report Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Create New Inventory Report
              </h2>

              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Report Month
                  </label>
                  <input
                    type="month"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    defaultValue="2024-07"
                  />
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 text-blue-600 mt-0.5 mr-2" />
                    <div className="text-sm text-blue-700">
                      <p className="font-medium">Note:</p>
                      <p>
                        The system will automatically calculate inventory
                        movements based on purchase and sales orders for the
                        selected month.
                      </p>
                    </div>
                  </div>
                </div>
              </form>

              <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                  Generate Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
