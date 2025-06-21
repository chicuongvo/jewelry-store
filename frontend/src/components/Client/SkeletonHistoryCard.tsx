export default function SkeletonHistoryCard() {
  return (
    <div className="border border-card-border rounded-lg p-6 mb-6 bg-white shadow-sm animate-pulse">
      <div className="flex justify-between items-start mb-4">
        <div className="space-y-2">
          <div className="h-4 w-40 bg-gray-200 rounded"></div>
          <div className="h-3 w-32 bg-gray-200 rounded"></div>
        </div>
        <div className="h-5 w-20 bg-gray-200 rounded"></div>
      </div>

      <div className="space-y-4">
        {[...Array(2)].map((_, idx) => (
          <div
            key={idx}
            className="flex items-center gap-4 p-3 rounded-md bg-gray-50"
          >
            <div className="w-24 h-24 bg-gray-200 rounded-md"></div>
            <div className="flex-1 space-y-3">
              <div className="h-4 w-3/5 bg-gray-200 rounded"></div>
              <div className="h-3 w-1/2 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
