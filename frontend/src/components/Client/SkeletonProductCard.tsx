export default function ProductCardSkeleton() {
  return (
    <div className="bg-white font-primary overflow-hidden animate-pulse">
      <div className="relative">
        <div className="w-full h-70 bg-zinc-200 roun" />
        <div className="absolute bottom-4 w-full flex items-center justify-center">
          <div className="w-1/2 h-9 bg-zinc-300 " />
        </div>
        <div className="absolute top-3 left-3 bg-zinc-300 px-3 py-1.5 rounded-full w-[90px] h-[28px]" />
      </div>

      <div className="py-6 flex flex-col gap-4">
        <div className="h-[55px] bg-zinc-300 " />

        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <div className="w-12 h-4 bg-zinc-300 " />
            <div className="w-24 h-5 bg-zinc-300 " />
          </div>
        </div>

        <div className="w-full h-10 bg-zinc-300 " />
      </div>
    </div>
  );
}
