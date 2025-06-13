/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import { getInventoryReportByMonthAndYear } from "@/api/inventoryReport.api";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import ChartSkeleton from "./ChartSkeleton";

const MONTHS_TO_DISPLAY = [1, 2, 3, 4, 5, 6];

export default function InventoryChart() {
  const year = 2025;

  const { data, isLoading } = useQuery({
    queryKey: ["inventoryReportMultiple", year],
    queryFn: async () => {
      const reports = await Promise.all(
        MONTHS_TO_DISPLAY.map((month) =>
          getInventoryReportByMonthAndYear(month, year).then((res) => ({
            ...res,
            month,
          }))
        )
      );
      return reports;
    },
  });

  const chartData = data
    ? data.map((item) => ({
        label: `Tháng ${item.month}`,
        total_begin_stock: item.total_begin_stock ?? 0,
        total_end_stock: item.total_end_stock ?? 0,
      }))
    : [];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-bold text-gray-900 mb-4">
        Báo cáo tồn kho (6 tháng đầu năm)
      </h2>

      {isLoading ? (
        <ChartSkeleton />
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="label" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
            />
            <Bar
              dataKey="total_begin_stock"
              fill="#FBBF24"
              radius={[4, 4, 0, 0]}
              name="Hàng tồn đầu kỳ"
            />
            <Bar
              dataKey="total_end_stock"
              fill="#3B82F6"
              radius={[4, 4, 0, 0]}
              name="Hàng tồn cuối kỳ"
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
