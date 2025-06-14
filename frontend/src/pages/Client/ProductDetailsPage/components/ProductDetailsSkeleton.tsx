import { Skeleton } from "antd";

export default function ProductDetailsSkeleton() {
  return (
    <div className="font-primary md:flex md:flex-row md:px-30 md:pt-10 md:gap-10">
      <div className="md:w-1/2 overflow-hidden">
        <Skeleton.Image style={{ width: "1000px", height: 500 }} active />
      </div>

      <div className="px-4 flex flex-col gap-4 w-full md:w-1/2">
        <Skeleton active title={false} paragraph={{ rows: 1, width: "60%" }} />

        <Skeleton.Input active style={{ width: 300 }} />

        <div className="flex flex-row gap-4 pb-7">
          <Skeleton.Button active style={{ width: 120, height: 40 }} />
          <Skeleton.Button active style={{ width: 140, height: 40 }} />
        </div>

        <div className="py-3 flex flex-col gap-3">
          <Skeleton.Input active style={{ width: 120 }} />
          <Skeleton active paragraph={{ rows: 3 }} />
          <Skeleton.Input active style={{ width: 180 }} />
        </div>
      </div>
    </div>
  );
}
