export default function ServiceCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 pb-3 animate-pulse">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gray-200 rounded-lg" />
          <div className="ml-3 space-y-2">
            <div className="h-4 w-32 bg-gray-200 rounded" />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="h-3 w-20 bg-gray-200 rounded" />
          <div className="h-3 w-16 bg-gray-200 rounded" />
        </div>

        <div className="border-t border-gray-100 mt-4">
          <div className="w-full h-10 bg-gray-200 mt-3 rounded" />
        </div>
      </div>
    </div>
  );
}
