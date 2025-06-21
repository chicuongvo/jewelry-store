export default function SkeletonServiceHistoryCard() {
  return (
    <div className="border border-card-border rounded-lg p-6 mb-6 bg-white shadow-sm animate-pulse">
      <div className="flex justify-between items-start mb-4">
        <div className="space-y-2">
          <div className="h-4 w-40 bg-gray-200 rounded" />
          <div className="h-3 w-28 bg-gray-200 rounded" />
        </div>
        <div className="h-5 w-20 bg-gray-200 rounded" />
      </div>

      <div className="space-y-4">
        {[...Array(2)].map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-3 rounded-md bg-gray-100"
          >
            <div className="flex-1 space-y-2">
              <div className="h-4 w-3/4 bg-gray-200 rounded" />
              <div className="flex gap-4">
                <div className="h-3 w-24 bg-gray-200 rounded" />
                <div className="h-3 w-20 bg-gray-200 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
