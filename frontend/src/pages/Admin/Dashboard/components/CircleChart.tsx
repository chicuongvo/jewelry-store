import { useQuery } from "@tanstack/react-query";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { getAllProductTypes } from "@/api/productType"; // đảm bảo đúng đường dẫn
import { useMemo } from "react";

const COLORS = [
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#EC4899",
];

export default function CircleChart() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["getAllProductTypes"],
    queryFn: getAllProductTypes,
  });

  const salesData = useMemo(() => {
    if (!data || !Array.isArray(data)) return [];

    return data.map((type, index) => ({
      name: type.name,
      value: type.products?.length || 0,
      color: COLORS[index % COLORS.length],
    }));
  }, [data]);

  if (isLoading) return <div>Đang tải dữ liệu...</div>;
  if (error) return <div>Đã xảy ra lỗi khi tải loại sản phẩm.</div>;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-bold text-gray-900 mb-6">
        Tỉ lệ các loại sản phẩm
      </h2>
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
    </div>
  );
}
