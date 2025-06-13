export default function InventoryReportSkeleton({ index }: { index: number }) {
  return (
    <div
      className="animate-pulse h-[250px] space-y-3 bg-white shadow rounded-lg p-4"
      key={index}
    >
      <div className="h-10 bg-gray-300 rounded w-3/4" />
      <div className="h-10 bg-gray-300 rounded w-1/2" />
      <div className="h-3 bg-gray-200 rounded w-full" />
      <div className="h-3 bg-gray-200 rounded w-5/6" />
    </div>
  );
}
