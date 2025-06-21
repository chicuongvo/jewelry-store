import { getAllSalesOrderDetail } from "@/api/sales_order_detail.api";
import { useQuery } from "@tanstack/react-query";
import { formatCurrency } from "@/lib/utils";
import SkeletonHistoryCard from "./SkeletonHistoryCard";

function HistoryCard({
  orderId,
  createdAt,
}: {
  orderId: string;
  createdAt: Date;
}) {
  const { data: products, isLoading } = useQuery({
    queryKey: ["sales_orders", orderId],
    queryFn: () => getAllSalesOrderDetail(orderId),
  });
  const totalPrice = products?.reduce(
    (acc, { total_price }) => acc + Number(total_price),
    0
  );

  if (isLoading) return <SkeletonHistoryCard />;
  return (
    <div className="border border-card-border rounded-lg p-6 mb-6 bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-lg text-gray-800">
            Mã đơn hàng: <span className="text-primary">{orderId}</span>
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
            {totalPrice && formatCurrency(totalPrice)}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {products?.map(({ product, quantity, total_price }) => (
          <div
            key={product?.product_id}
            className="flex items-center gap-4 p-3 rounded-md bg-gray-50"
          >
            <img
              src={product?.image}
              alt={product?.name}
              className="w-24 h-24 object-cover rounded-md"
            />
            <div className="flex-1">
              <h4 className="font-medium text-gray-800">{product?.name}</h4>
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

export default HistoryCard;
