/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowDownNarrowWide, ArrowUpNarrowWide } from "lucide-react";
import { useState } from "react";

interface SortByProps {
  setSortOrder: (value: string) => void;
  setUpdateData: any;
}

export default function setSortOrder({
  setSortOrder,
  setUpdateData,
}: SortByProps) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [selected, setSelected] = useState("");

  const handleSortChange = (value: "asc" | "desc") => {
    if (value == selected) setSelected("");
    else {
      setSelected(value);
    }
    setSortOrder(value);

    setUpdateData(true);
  };

  return (
    <div className="flex flex-col gap-2 py-5">
      <div className="uppercase text-2xl font-bold relative px-2 w-max z-10 after:w-full after:absolute after:h-1/4 after:bottom-1 after:left-0 after:-z-3 after:bg-primary/50">
        SẮP XẾP THEO
      </div>

      <div className="flex flex-col gap-4 mt-2">
        <button
          onClick={() => handleSortChange("asc")}
          className={`px-3 py-2 rounded-md border ${
            selected === "asc"
              ? "bg-primary text-white border-primary"
              : "bg-white text-zinc-700 border-zinc-300"
          }`}
        >
          <div className="flex flex-row justify-center w-max gap-3 cursor-pointer">
            <ArrowUpNarrowWide />
            Giá thấp → cao
          </div>
        </button>
        <button
          onClick={() => handleSortChange("desc")}
          className={`px-3 py-2 rounded-md border ${
            selected === "desc"
              ? "bg-primary text-white border-primary"
              : "bg-white text-zinc-700 border-zinc-300"
          }`}
        >
          <div className="flex flex-row justify-center w-max gap-3 cursor-pointer">
            <ArrowDownNarrowWide />
            Giá cao → thấp
          </div>
        </button>
      </div>
    </div>
  );
}
