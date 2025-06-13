// import { Link, useLocation } from "react-router-dom";
import { Link, useLocation } from "react-router";
import {
  BarChart3,
  Users,
  Package,
  ShoppingCart,
  Truck,
  ClipboardList,
  Home,
  Tag,
  FileText,
  ShoppingBag,
  Wrench,
} from "lucide-react";

const navigation = [
  { name: "Trang chủ", href: "/admin", icon: Home },
  { name: "Loại sản phẩm", href: "/admin/product-types", icon: Tag },
  { name: "Sản phẩm", href: "/admin/products", icon: Package },
  { name: "Dịch vụ", href: "/admin/services", icon: Wrench },
  { name: "Nhà cung cấp", href: "/admin/suppliers", icon: Truck },
  { name: "Khách hàng", href: "/admin/users", icon: Users },
  { name: "Phiếu bán hàng", href: "/admin/sales-orders", icon: ShoppingBag },
  {
    name: "Phiếu mua hàng",
    href: "/admin/purchase-orders",
    icon: ShoppingCart,
  },
  { name: "Phiếu dịch vụ", href: "/admin/service-orders", icon: ClipboardList },
  { name: "Báo cáo tồn kho", href: "/admin/inventory-reports", icon: FileText },
];

export default function Sidebar() {
  const location = useLocation();
  return (
    <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 h-min-screen">
      <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
        <div className="flex items-center">
          <BarChart3 className="h-8 w-8 text-blue-600" />
          <span className="ml-2 text-xl font-bold text-gray-900">AdminPro</span>
        </div>
      </div>

      <nav className="mt-8 px-4 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive =
            location.pathname === item.href ||
            (item.href !== "/admin" && location.pathname.startsWith(item.href));
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center px-4 py-3 text-sm font-semibold rounded-lg transition-colors duration-200 ${
                isActive
                  ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon
                className={`mr-3 h-5 w-5 ${
                  isActive ? "text-blue-600" : "text-gray-400"
                }`}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
