/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import FilterPrice from "./FilterPrice";
import SortBy from "./SortBy";

interface Price {
  label: string;
  min: string | undefined;
  max: string | undefined;
}

export default function SearchBar({
  setSearchPrice,
  setSortBy,
  setSortOrder,
  setUpdateData,
}: {
  setSearchPrice: any;
  setSortOrder: any;
  setUpdateData: any;
  setSortBy: any;
}) {
  return (
    <div className="hidden md:block font-primary">
      <div className="flex flex-col gap-3 border-t-2 border-zinc-300 py-4 ">
        <div className="border-b-2 border-zinc-300 ">
          <FilterPrice
            setSearchPrice={setSearchPrice}
            setUpdateData={setUpdateData}
          />
        </div>
        <SortBy
          setSortOrder={setSortOrder}
          setUpdateData={setUpdateData}
          setSortBy={setSortBy}
        />
      </div>
    </div>
  );
}
