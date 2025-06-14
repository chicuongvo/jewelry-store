export default function CartDetailsSkeleton() {
  return (
    <div className="flex flex-row justify-between rounded-xl shadow-sm border border-zinc-200 px-6 py-4 animate-pulse">
      <div className="flex flex-row gap-3">
        <div className="w-[100px] h-[100px] bg-zinc-200 rounded-lg" />

        <div className="flex flex-col justify-between gap-2 w-[200px]">
          <div className="h-5 w-24 bg-zinc-200 rounded-full" />
          <div className="h-6 w-40 bg-zinc-200 rounded-md" />
          <div className="h-5 w-28 bg-zinc-200 rounded-full" />
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-zinc-200 rounded" />
            <div className="h-6 w-10 bg-zinc-200 rounded" />
            <div className="h-8 w-8 bg-zinc-200 rounded" />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end justify-between font-bold">
        <div className="h-6 w-6 bg-zinc-200 rounded" />
        <div className="h-6 w-16 bg-zinc-200 rounded-md" />
      </div>
    </div>
  );
}
