/* eslint-disable @typescript-eslint/no-explicit-any */
import RevenueChart from "./RevenueChart";
import CircleChart from "./CircleChart";

export default function ChartSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <RevenueChart />
      <CircleChart />
    </div>
  );
}
