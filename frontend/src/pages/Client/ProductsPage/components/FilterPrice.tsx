import Slider from "@mui/material/Slider";
import { useEffect, useState } from "react";

interface SearchPriceProps {
  setSearchPrice: React.Dispatch<React.SetStateAction<string[]>>;
  setUpdateData: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function FilterPrice({
  setSearchPrice,
  setUpdateData,
}: SearchPriceProps) {
  const minDistance = 500000;
  const [value, setValue] = useState<number[]>([0, 10000000]);

  useEffect(() => {
    setSearchPrice(value.map(String));
  }, [value, setSearchPrice]);

  const handleChange = (
    __: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    const newRange =
      activeThumb === 0
        ? [Math.min(newValue[0], value[1] - minDistance), value[1]]
        : [value[0], Math.max(newValue[1], value[0] + minDistance)];

    setValue(newRange);
    setUpdateData(true);
  };

  return (
    <div className="flex flex-col gap-2 py-3">
      <div className="uppercase text-2xl font-bold relative px-2 w-max z-10 after:w-full after:absolute after:h-1/4 after:bottom-1 after:left-0 after:-z-3 after:bg-primary/50">
        GIÁ
      </div>
      <div className="flex flex-row justify-between text-[15px] font-medium">
        <div className="flex flex-row gap-2 w-full justify-between">
          {value.map((price) => (
            <div className="flex flex-row gap-2">
              <div className="pl-1"> {Number(price).toLocaleString()}đ</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Slider
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          disableSwap
          min={0}
          max={10000000}
          step={100000}
          sx={{
            color: "rgb(255, 147, 160)",
            "& .MuiSlider-thumb": {
              backgroundColor: "#fff",
              border: "2px solid rgb(255, 147, 160)",
            },
            "& .MuiSlider-track": {
              backgroundColor: "#FF69B4",
            },
            "& .MuiSlider-rail": {
              backgroundColor: "#FFD1DC",
            },
          }}
        />
      </div>
    </div>
  );
}
