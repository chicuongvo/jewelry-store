import { Gem } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex flex-row items-center text-primary gap-1 w-fit">
      <Gem />
      <span className="font-bold font-logo text-[20px]">JewelryStore</span>
    </div>
  );
}
