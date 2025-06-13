/* eslint-disable @typescript-eslint/no-explicit-any */

import StatsCards from "./components/StatsCards";
import ChartSection from "./components/ChartSection";
import RecentActivity from "./components/RecentActivity";
import QuickAction from "./components/QuickAction";

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
      <ChartSection />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity />
        <QuickAction />
      </div>
    </div>
  );
}
