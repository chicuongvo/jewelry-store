import type { ServiceResponse } from "@/types/service/service";
import { Wrench } from "lucide-react";

export default function ServiceCard({
  service,
  isSelected,
  toggleService,
}: {
  service: ServiceResponse;
  isSelected: boolean;
  toggleService: (service: ServiceResponse) => void;
}) {
  return (
    <div
      key={service.service_id}
      className={`bg-white rounded-xl shadow-sm border ${
        isSelected ? "border-primary shadow-xl border-2" : "border-gray-200"
      } p-6 pb-3 transition-shadow duration-200`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
            <Wrench className="h-5 w-5 text-primary" />
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-semibold text-gray-900">
              {service.name}
            </h3>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Giá cơ bản</span>
          <div className="flex items-center">
            <span className="text-sm font-medium text-emerald-600">
              {Number(service.base_price).toLocaleString("vi-VN")}₫
            </span>
          </div>
        </div>

        <div className="border-t border-gray-100">
          <button
            onClick={() => toggleService(service)}
            className={`w-full text-sm px-3 py-4 font-medium cursor-pointer transition-all duration-300 rounded-sm ${
              isSelected
                ? "text-white bg-primary hover:opacity-90"
                : "text-primary hover:bg-zinc-100"
            }`}
          >
            {isSelected ? "Đã chọn" : "Chọn dịch vụ"}
          </button>
        </div>
      </div>
    </div>
  );
}
