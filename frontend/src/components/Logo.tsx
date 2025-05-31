import { Gem } from "lucide-react";
import { Link } from "react-router";

export default function Logo() {
  return (
    <Link
      to="/"
      className="flex flex-row items-center text-primary gap-1 w-fit"
    >
      <Gem />
      <span className="font-bold font-logo text-[20px]">JewelryStore</span>
    </Link>
  );
}
