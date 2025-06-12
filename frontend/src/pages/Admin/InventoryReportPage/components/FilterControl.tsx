import { Select } from "antd";
import { Filter } from "lucide-react";
const { Option } = Select;

interface FilterControlProps {
  setMonth: (value: number | undefined) => void;
  setYear: (value: number | undefined) => void;
  setPage: (value: number) => void;
}

export default function FilterControl({
  setMonth,
  setYear,
  setPage,
}: FilterControlProps) {
  const handleMonthChange = (value: number) => {
    setMonth(value);
    setPage(1);
  };

  const handleYearChange = (value: number) => {
    setYear(value);
    setPage(1);
  };

  return (
    <div className="flex flex-wrap gap-4 shadow-sm bg-white px-3 py-4 rounded-[15px] justify-center items-center">
      <Filter className="text-gray-500" />
      <Select
        placeholder="Chọn tháng"
        allowClear
        style={{ width: 120 }}
        onChange={handleMonthChange}
      >
        {Array.from({ length: 12 }, (_, i) => (
          <Option key={i + 1} value={i + 1}>
            Tháng {i + 1}
          </Option>
        ))}
      </Select>
      <Select
        placeholder="Chọn năm"
        allowClear
        style={{ width: 120 }}
        onChange={handleYearChange}
      >
        {Array.from({ length: 10 }, (_, i) => {
          const y = new Date().getFullYear() - i;
          return (
            <Option key={y} value={y}>
              Năm {y}
            </Option>
          );
        })}
      </Select>
    </div>
  );
}
