/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Package, Users, ShoppingCart, Eye } from "lucide-react";
import StatsCards from "./components/StatsCards";

const revenueData = [
  { month: "Jan", revenue: 45000, profit: 12000 },
  { month: "Feb", revenue: 52000, profit: 15000 },
  { month: "Mar", revenue: 48000, profit: 13500 },
  { month: "Apr", revenue: 61000, profit: 18000 },
  { month: "May", revenue: 55000, profit: 16500 },
  { month: "Jun", revenue: 67000, profit: 20000 },
];

const salesData = [
  { name: "Electronics", value: 400, color: "#3B82F6" },
  { name: "Clothing", value: 300, color: "#10B981" },
  { name: "Home & Garden", value: 200, color: "#F59E0B" },
  { name: "Sports", value: 100, color: "#EF4444" },
];

const recentActivity = [
  {
    id: 1,
    type: "order",
    message: "New purchase order #PO-2024-001 created",
    time: "2 minutes ago",
  },
  {
    id: 2,
    type: "user",
    message: "New user John Doe registered",
    time: "15 minutes ago",
  },
  {
    id: 3,
    type: "product",
    message: 'Product "Wireless Headphones" stock updated',
    time: "1 hour ago",
  },
  {
    id: 4,
    type: "order",
    message: "Sales order #SO-2024-045 completed",
    time: "2 hours ago",
  },
];

interface QuickActionButtonProps {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
}

function QuickActionButton({
  title,
  description,
  icon: Icon,
  color,
}: QuickActionButtonProps) {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600 group-hover:bg-blue-100",
    emerald: "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100",
    amber: "bg-amber-50 text-amber-600 group-hover:bg-amber-100",
    rose: "bg-rose-50 text-rose-600 group-hover:bg-rose-100",
  };

  return (
    <button className="group p-4 text-left rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all duration-200">
      <div
        className={`w-10 h-10 rounded-lg ${
          colorClasses[color as keyof typeof colorClasses]
        } flex items-center justify-center mb-3`}
      >
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="font-medium text-gray-900 group-hover:text-gray-700">
        {title}
      </h3>
      <p className="text-sm text-gray-500 mt-1">{description}</p>
    </button>
  );
}

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Trang chủ</h1>
          <p className="text-gray-600">
            Xin chào! Hãy quản lý doanh nghiệp của bạn ở đây.{" "}
          </p>
        </div>
      </div>

      <StatsCards />

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Revenue & Profit
            </h2>
            <select className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Last 6 months</option>
              <option>Last year</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Bar dataKey="revenue" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="profit" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Sales by Category */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Sales by Category
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
      </div>

      {/* Recent Activity and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium">
            View all activity
          </button>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <QuickActionButton
              title="Add Product"
              description="Create new product"
              icon={Package}
              color="blue"
            />
            <QuickActionButton
              title="New Order"
              description="Create purchase order"
              icon={ShoppingCart}
              color="emerald"
            />
            <QuickActionButton
              title="Add User"
              description="Register new user"
              icon={Users}
              color="amber"
            />
            <QuickActionButton
              title="View Reports"
              description="Check inventory"
              icon={Eye}
              color="rose"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
