import { useUser } from "@/contexts/userContext";
import { HistoryIcon } from "lucide-react";
import HistoryCard from "../../components/Client/HistoryCard";

function History() {
  const { userProfile, isLoading } = useUser();

  const saleOrders = userProfile?.sales_orders;
  if (!saleOrders?.length && !isLoading) return <p>Không có đơn hàng nào</p>;
  return (
    <div className="py-6 max-w-[1000px] mx-auto min-h-dvh">
      <div className="flex justify-center items-center gap-2 px-6 py-4">
        <HistoryIcon className="inline text-primary" />
        <h2 className="uppercase text-2xl font-bold text-center">
          Lịch sử mua hàng
        </h2>
      </div>
      <ul className="px-10 mt-6">
        {saleOrders?.map((order) => (
          <li key={order.sales_order_id}>
            <HistoryCard
              createdAt={order.created_at ?? new Date(0)}
              orderId={order.sales_order_id}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default History;
