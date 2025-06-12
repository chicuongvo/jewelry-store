import QuickActionButton from "@/pages/Admin/Dashboard/components/QuickActionButton";
import { Package, Users, ShoppingCart, Eye } from "lucide-react";
import { useEffect, useState } from "react";
import ChartSkeleton from "./ChartSkeleton";

export default function QuickAction() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Phím tắt</h2>
      {loading ? (
        <ChartSkeleton />
      ) : (
        <div className="grid grid-cols-2 gap-4">
          <QuickActionButton
            title="Sản phẩm mới"
            description="Tạo sản phẩm"
            icon={Package}
            color="blue"
            link="/admin/products"
          />
          <QuickActionButton
            title="Đơn hàng mới"
            description="Tạo đơn hàng mới"
            icon={ShoppingCart}
            color="emerald"
            link="/admin/sales-orders"
          />
          <QuickActionButton
            title="Người dùng mới"
            description="Tạo người dùng"
            icon={Users}
            color="amber"
            link="/admin/users"
          />
          <QuickActionButton
            title="Báo cáo"
            description="Xem báo cáo tồn kho"
            icon={Eye}
            color="rose"
            link="/admin/inventory-reports"
          />
        </div>
      )}
    </div>
  );
}
