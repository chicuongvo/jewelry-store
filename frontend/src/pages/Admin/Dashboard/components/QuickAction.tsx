import QuickActionButton from "@/components/Admin/QuickActionButton";
import { Package, Users, ShoppingCart, Eye } from "lucide-react";

export default function QuickAction() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">
        Quick Actions
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <QuickActionButton
          title="Sản phẩm mới"
          description="Tạo sản phẩm"
          icon={Package}
          color="blue"
        />
        <QuickActionButton
          title="Đơn hàng mới"
          description="Tạo đơn hàng mới"
          icon={ShoppingCart}
          color="emerald"
        />
        <QuickActionButton
          title="Người dùng mới"
          description="Tạo người dùng"
          icon={Users}
          color="amber"
        />
        <QuickActionButton
          title="Báo cáo"
          description="Xem báo cáo tồn kho"
          icon={Eye}
          color="rose"
        />
      </div>
    </div>
  );
}
