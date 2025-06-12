// components/skeletons/ChartSkeleton.tsx
export default function ChartSkeleton() {
  return (
    <div className="w-full h-[300px] space-y-4 animate-pulse">
      <div className="w-32 h-6 bg-gray-200 rounded-md" />
      <div className="w-full h-[260px] bg-gray-200 rounded-md" />
    </div>
  );
}
