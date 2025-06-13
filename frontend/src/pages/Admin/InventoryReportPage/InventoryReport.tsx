/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getAllInventoryReports } from "@/api/inventoryReport.api";
import InventoryReportCard from "@/pages/Admin/InventoryReportPage/components/InventoryReportCard";
import CreateReportModal from "./components/ReportModal";
import { Pagination } from "antd";
import InventoryReportSkeleton from "./components/Skeleton";
import FilterControl from "./components/FilterControl";

export default function InventoryReports() {
  const [showModal, setShowModal] = useState(false);

  const [page, setPage] = useState(1);
  const [month, setMonth] = useState<number | undefined>(undefined);
  const [year, setYear] = useState<number | undefined>(undefined);

  const params = {
    page,
    limit: 6,
    ...(month && { month }),
    ...(year && { year }),
  };

  const {
    data: reportData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["inventoryReports", params],
    queryFn: () => getAllInventoryReports(params),
  });

  const { data: totalReportData, refetch: refetchTotal } = useQuery({
    queryKey: ["totalReports", month, year],
    queryFn: () => getAllInventoryReports({ month, year }),
  });

  const [updateData, setUpdateData] = useState(false);

  useEffect(() => {
    refetch();
    refetchTotal();
  }, [updateData, refetch, refetchTotal]);

  return (
    <div className="space-y-6 h-full">
      <div className="flex items-center justify-between">
        <div className="flex flex-row gap-4 justify-center items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Báo Cáo Tồn Kho
            </h1>
            <p className="text-gray-600">Theo dõi báo cáo tồn kho mỗi tháng</p>
          </div>
          <FilterControl
            setMonth={setMonth}
            setYear={setYear}
            setPage={setPage}
          />
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex cursor-pointer items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <Plus className="h-4 w-4 mr-2" />
          Tạo báo cáo
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <InventoryReportSkeleton key={index} index={index} />
            ))
          : reportData?.map((report: any) => (
              <InventoryReportCard
                key={report.id}
                report={report}
                setUpdateData={setUpdateData}
              />
            ))}
      </div>

      <Pagination
        align="center"
        current={page}
        total={totalReportData?.length || 0}
        pageSize={6}
        onChange={(current) => {
          setPage(current);
        }}
      />

      {showModal && (
        <CreateReportModal
          onClose={() => setShowModal(false)}
          setUpdateData={setUpdateData}
        />
      )}
    </div>
  );
}
