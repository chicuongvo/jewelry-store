export default function DashboardSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-6 w-40 bg-gray-200 rounded-md" />
      <div className="h-4 w-64 bg-gray-200 rounded-md mb-6" />
      <div className="h-32 bg-gray-200 rounded-md" /> {/* StatsCards */}
      <div className="h-[300px] bg-gray-200 rounded-md" /> {/* Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-40 bg-gray-200 rounded-md" />
        <div className="h-40 bg-gray-200 rounded-md" />
      </div>
    </div>
  );
}
