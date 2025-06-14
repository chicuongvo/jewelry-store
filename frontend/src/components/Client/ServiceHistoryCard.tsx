import type { ServiceResponse } from "@/types/service/service";
import { formatCurrency } from "@/lib/utils";

function ServiceHistoryCard({
  orderId,
  createdAt,
  details,
  total_price,
}: {
  orderId: string;
  createdAt: string;
  total_price: number;
  details: {
    total_price: number;
    service: ServiceResponse;
    quantity: number;
  }[];
}) {
  return (
    <div className="border border-card-border rounded-lg p-6 mb-6 bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-lg text-gray-800">
            Mã đơn dịch vụ: <span className="text-primary">{orderId}</span>
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            {new Date(createdAt).toLocaleString("vn-VN", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-primary">
            {formatCurrency(total_price)}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {details?.map(({ service, quantity, total_price }) => (
          <div
            key={service.service_id}
            className="flex items-center justify-between p-3 rounded-md bg-gray-50"
          >
            <div className="flex-1">
              <h4 className="font-medium text-gray-800">{service.name}</h4>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                <span>Số lượng: {quantity}</span>
                <span className="font-medium text-primary">
                  {formatCurrency(total_price)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ServiceHistoryCard;
