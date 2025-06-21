/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { getAllProductTypes } from "@/api/productType";
import { useMemo } from "react";
import ChartSkeleton from "./ChartSkeleton";

const COLORS = [
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#EC4899",
];

export default function CircleChart() {
  const { data, isLoading } = useQuery({
    queryKey: ["getAllProductTypes"],
    queryFn: () => getAllProductTypes(),
  });

  const salesData = useMemo(() => {
    if (!data || !Array.isArray(data)) return [];

    return data.map((type, index) => ({
      name: type.name,
      value: type.products?.length || 0,
      color: COLORS[index % COLORS.length],
    }));
  }, [data]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-bold text-gray-900 mb-6">
        Tỉ lệ các loại sản phẩm
      </h2>

      {isLoading ? (
        <ChartSkeleton />
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={salesData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey="value"
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
            >
              {salesData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
