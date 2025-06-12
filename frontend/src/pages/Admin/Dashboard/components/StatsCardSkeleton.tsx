export default function StatsCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-pulse space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-4 w-24 bg-gray-200 rounded"></div>
          <div className="h-6 w-32 bg-gray-300 rounded"></div>
          <div className="flex items-center space-x-2">
            <div className="h-4 w-4 bg-gray-300 rounded-full" />
            <div className="h-4 w-12 bg-gray-300 rounded" />
          </div>
        </div>
        <div className="p-3 rounded-lg bg-gray-200">
          <div className="h-6 w-6 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );
}
